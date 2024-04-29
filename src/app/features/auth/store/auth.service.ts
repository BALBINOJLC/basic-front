import { IAuthSignUpOptions, IAuthState, IAuthSignIn, selectAuth, selectAuthUser, selectAuthToken } from '@auth';
import { Store } from '@ngrx/store';
import * as actions from '@auth';
import { Observable } from 'rxjs';
import { IUser } from '@users';

export class AuthStoreService {
  constructor(private store: Store) {}

  see(): Observable<IAuthState> {
    return this.store.select(selectAuth);
  }

  seeUser(): Observable<IUser> {
    return this.store.select(selectAuthUser);
  }

  seeToken(): Observable<string> {
    return this.store.select(selectAuthToken);
  }

  authSignUp(options: IAuthSignUpOptions): void {
    const { user, invited = false, sendEmail = true } = options;
    return this.store.dispatch(actions.AuthSignUp({ user, invited, sendEmail }));
  }

  authSignIn(user: IAuthSignIn): void {
    return this.store.dispatch(actions.AuthSignIn({ user }));
  }

  authForgotPassword(email: string): void {
    return this.store.dispatch(actions.AuthForgotPassword({ email }));
  }
}
