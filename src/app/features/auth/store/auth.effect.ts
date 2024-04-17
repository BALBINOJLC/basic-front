import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from '@core';
import * as authActions from './auth.action';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthService
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthSignIn),
      mergeMap(({ user }) => this._authService.signIn(user).pipe(map((data) => authActions.AuthLoadUser({ data }))))
    );
  });

  changePassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthChangePassword),
      mergeMap(({ user }) =>
        this._authService.changePassword(user.currentPassword, user.newPassword).pipe(map(() => authActions.AuthNoActions()))
      )
    );
  });

  forgotPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthForgotPassword),
      mergeMap(({ email }) => this._authService.forgotPassword(email).pipe(map(() => authActions.AuthClean())))
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthResetPassword),
      mergeMap(({ password, token }) => this._authService.resetPassword(token, password).pipe(map(() => authActions.AuthClean())))
    );
  });

  registerEffects$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthSignUp),
      mergeMap(({ user, invited, sendEmail }) =>
        this._authService.signUp(user, invited, sendEmail).pipe(map(() => authActions.AuthClean()))
      )
    );
  });

  registerSocialNetwork$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthSignUpSocialNetwork),
      mergeMap(({ user, invited, sendEmail }) =>
        this._authService.signUp(user, invited, sendEmail).pipe(map(() => authActions.AuthSignIn({ user })))
      )
    );
  });

  activateAccount$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthActivateAccount),
      mergeMap(({ token }) => this._authService.activateAccount(token).pipe(map((data) => authActions.AuthLoadUser({ data }))))
    );
  });

  getUserLogged$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authActions.AuthGetUserLogged),
      mergeMap(() => this._authService.getLogged().pipe(map(() => authActions.AuthNoActions())))
    );
  });
}
