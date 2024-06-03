import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, switchMap, tap } from 'rxjs';
import * as actions from '@auth';
import * as crypto from 'crypto-js';
import { environment } from 'environments/environment';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { IAuthSignIn, IAuthSignUp, ILoadUser, IResponseMessage, ISingInSuccess, ISingUpSucces } from '@auth';
import { IUser } from '@users';
import { AuthUtils } from '@core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  secret = environment.seed;

  public idUserActive: string = '';
  urlApi = environment.urlApi;

  private _authenticated: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private store: Store,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.loadUser();
  }

  get accessToken(): string | undefined {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('token') ?? undefined;
    }
    return undefined;
  }

  set accessToken(token: string) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get signInForm(): any {
    return this.checkRemember();
  }

  signIn(user: IAuthSignIn): Observable<ILoadUser> {
    const url = `${this.urlApi}/auth/login`;
    console.log(user);

    const httpOptions = {
      headers: new HttpHeaders({
        'no-token': 'no-token',
        'Content-Type': 'application/json',
        Authorization: this.generateAuthHeader(user),
      }),
    };

    return this.httpClient.post<ISingInSuccess>(url, null, httpOptions).pipe(
      tap((resp) => this.handleSignInSuccess(resp)),
      switchMap((resp) => of({ ...resp, token: resp.access_token }))
    );
  }

  changePassword(currentPassword: string, newPassword: string): Observable<IResponseMessage> {
    const url = `${this.urlApi}/auth/change-password`;
    return this.httpClient.post<IResponseMessage>(url, { currentPassword, newPassword });
  }

  getLogged(): Observable<ILoadUser> {
    const url = `${this.urlApi}/auth/user`;
    return this.httpClient.get<ILoadUser>(url);
  }

  signOut(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
      this.store.dispatch(actions.AuthClean());
      //this.auth.signOut();
      this.router.navigate(['/auth/sign-in']);
    }
  }

  signUp(user: IAuthSignUp): Observable<ISingUpSucces> {
    const url = `${this.urlApi}/auth/register`;
    return this.httpClient.post<ISingUpSucces>(url, user, { headers: { 'no-token': 'no-token' } }).pipe(
      tap((resp) => this.handleSignUpResponse(resp)),
      switchMap((resp) => of(resp))
    );
  }

  activateAccount(token: string): Observable<ILoadUser> {
    const url = `${this.urlApi}/auth/activate-account?token=${token}`;
    return this.httpClient.get<ISingInSuccess>(url, { headers: { 'activate-account': 'activate-account' } }).pipe(
      tap((resp) => this.saveStorage(resp.access_token, resp.user)),
      switchMap((resp) => of({ ...resp, token: resp.access_token }))
    );
  }

  forgotPassword(email: string): Observable<IResponseMessage> {
    const url = `${this.urlApi}/auth/link/password`;
    return this.httpClient.post<IResponseMessage>(url, { email }, { headers: { 'no-token': 'no-token' } });
  }

  resetPassword(token: string, password: string): Observable<ISingInSuccess> {
    const url = `${this.urlApi}/auth/reset-password?token=${token}`;
    return this.httpClient.post<ISingInSuccess>(url, { password }, { headers: { 'no-token': 'no-token' } });
  }

  checkAuthUser(): Observable<boolean> {
    return this.isAccessTokenValid().pipe(
      tap((isValid) => {
        console.log(isValid);
        this._authenticated = isValid;
      }),

      catchError(() => of(false))
    );
  }

  private isAccessTokenValid(): Observable<boolean> {
    if (!this.accessToken) {
      return of(false);
    }

    return of(!AuthUtils.isTokenExpired(this.accessToken));
  }

  saveStorage(token: string, user: IUser): void {
    if (isPlatformBrowser(this.platformId)) {
      const userEncrypted = this.encryptData(JSON.stringify(user));
      localStorage.setItem('token', token);
      localStorage.setItem('user', userEncrypted);
      this.loadUser();
    }
  }

  private loadUser(): void {
    if (isPlatformBrowser(this.platformId) && localStorage.getItem('token') && localStorage.getItem('user')) {
      const decryptedUser = this.decryptData(localStorage.getItem('user')!);
      const user = JSON.parse(decryptedUser);
      this.idUserActive = user.id;
      this.store.dispatch(actions.AuthLoadUser({ data: { user, token: localStorage.getItem('token')! } }));
    }
  }

  private checkRemember(): { email: string; password?: string; rememberMe: boolean } | undefined {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('email');
      const password = localStorage.getItem('password');
      if (email && password) {
        return {
          email: this.decryptData(email),
          password: this.decryptData(password),
          rememberMe: true,
        };
      }
      return { email: '', rememberMe: false };
    }
    return undefined;
  }

  private encryptData(data: string): string {
    return crypto.AES.encrypt(data, this.secret).toString();
  }

  private decryptData(data: string): string {
    const bytes = crypto.AES.decrypt(data, this.secret);
    return bytes.toString(crypto.enc.Utf8);
  }

  private generateAuthHeader(user: IAuthSignIn): string {
    const { email, password, network, socialToken } = user;
    return `Basic ${btoa(network && socialToken ? `${email}:${password}:${network}:${socialToken}` : `${email}:${password}`)}`;
  }

  private handleSignInSuccess(resp: ISingInSuccess): void {
    this.saveStorage(resp.access_token, resp.user);
  }

  private handleSignUpResponse(resp: ISingUpSucces): ISingUpSucces {
    if (resp.access_token) {
      this.saveStorage(resp.access_token, resp.user);
      if (isPlatformBrowser(this.platformId)) {
        this.router.navigate(['/admin/dashboard']);
      }
      return resp;
    } else {
      this.router.navigate(['/auth/confirmation-required']);
      return resp;
    }
  }
}
