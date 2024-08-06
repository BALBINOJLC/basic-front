/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subscription, asapScheduler, catchError, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthToken } from '@auth';
import * as actions from '@store';
import { AuthService, IHttpError } from '@core';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  token: string = '';

  tokenSubscription: Subscription;

  authService = inject(AuthService);

  constructor(private store: Store) {
    this.tokenSubscription = this.store.select(selectAuthToken).subscribe((token) => {
      this.token = token ?? '';
    });
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    asapScheduler.schedule(() => this.store.dispatch(actions.isLoading()));

    const handleRequest = (request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> =>
      next.handle(request).pipe(
        map((event) => this.alertsInterceptor(event as HttpResponse<any>)), // Updated type assertion
        catchError((error) => this.errorInterceptor(error))
      );

    if (req.headers.get('no-token')) {
      return handleRequest(req);
    } else {
      const headers = new HttpHeaders().append('Authorization', 'Bearer ' + this.token);
      const reqClone = req.clone({ headers });
      return handleRequest(reqClone);
    }
  }

  alertsInterceptor(event: HttpResponse<any>): HttpResponse<any> {
    if (event instanceof HttpResponse) {
      const { status, body } = event;
      const message = body?.message;

      if (message) {
        this.store.dispatch(actions.showMessage({ message, status }));
      }
      asapScheduler.schedule(() => this.store.dispatch(actions.stopLoading()));
    }

    return event;
  }

  errorInterceptor(error: IHttpError): Observable<any> {
    console.log('errorInterceptor', error);

    // validate code error
    if (error.status === 401) {
      this.authService.signOut();
    }

    const dataError = {
      error: error.error,
      status: error.status,
    };

    if (dataError.error) {
      this.store.dispatch(actions.showError({ error: dataError }));
    }
    asapScheduler.schedule(() => this.store.dispatch(actions.stopLoading()));
    return of(error);
  }

  ngOnDestroy(): void {
    this.tokenSubscription.unsubscribe();
  }
}
