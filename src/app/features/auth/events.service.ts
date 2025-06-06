import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPasswordForm, ISignInForm, ISignUpForm } from './auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthEventsService {
  private authSignInEvent = new BehaviorSubject<ISignInForm>({ email: '', password: { password: '' }, rememberme: '' });
  private authSignUpEvent = new BehaviorSubject<ISignUpForm>({
    email: '',
    last_name: '',
    first_name: '',
    dni: '',
    password: { password: '', passwordConfirm: '' },
    passwordConfirm: '',
    policy: false,
    organization: '',
  });
  private authForgotPasswordEvent = new BehaviorSubject<{ email: string }>({ email: '' });
  private authResetPasswordEvent = new BehaviorSubject<{ password: IPasswordForm; token: string }>({
    password: {
      password: '',
      passwordConfirm: '',
    },
    token: '',
  });

  // Observable que los componentes pueden suscribirse
  signInEvent$ = this.authSignInEvent.asObservable();
  signUpEvent$ = this.authSignUpEvent.asObservable();
  forgotPasswordEvent$ = this.authForgotPasswordEvent.asObservable();
  resetPasswordEvent$ = this.authResetPasswordEvent.asObservable();

  constructor() {}

  // Método para emitir eventos
  emitSignInEvent(event: ISignInForm): void {
    this.authSignInEvent.next(event);
  }

  emitSignUpEvent(event: ISignUpForm): void {
    this.authSignUpEvent.next(event);
  }

  emitForgotPasswordEvent(event: { email: string }): void {
    this.authForgotPasswordEvent.next(event);
  }

  emitResetPasswordEvent(event: { password: IPasswordForm; token: string }): void {
    this.authResetPasswordEvent.next(event);
  }
}
