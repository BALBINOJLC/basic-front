import { IAuthSignIn, IAuthSignUp, ILoadUser } from '@auth';
import { createAction, props } from '@ngrx/store';
import { IUser, IUserUpdate } from '@users';
import { actions } from '../config';

export const AuthSignUp               = createAction(`[${actions}] SIGNUP`,           props<{ user: IAuthSignUp; invited: boolean; sendEmail: boolean }>());
export const AuthSignUpSocialNetwork  = createAction(`[${actions}] SIGNUPSN`,         props<{ user: IAuthSignUp; invited: boolean; sendEmail: boolean }>());
export const AuthSignIn               = createAction(`[${actions}] SIGNIN`,           props<{ user: IAuthSignIn }>());
export const AuthChangePassword       = createAction(`[${actions}] CHANGE PASSWORD`,  props<{ user: IUserUpdate}>());
export const AuthForgotPassword       = createAction(`[${actions}] FORGOT PASSWORD`,  props<{ email: string }>());
export const AuthResetPassword        = createAction(`[${actions}] RESET PASSWORD`,   props<{ password: string; token: string }>());
export const AuthActivateAccount      = createAction(`[${actions}] ACTIVATE ACCOUNT`, props<{ token: string }>());
export const AuthLoadUser             = createAction(`[${actions}] LOADUSER`,         props<{ data: ILoadUser }>());
export const AuthSetDataUser          = createAction(`[${actions}] SET DATA USER`,    props<{ user: IUser }>());
export const AuthClean                = createAction(`[${actions}] CLEAN`);
export const AuthGetUserLogged        = createAction(`[${actions}] GET USER LOGGED`);
export const AuthNoActions            = createAction(`[${actions}] NO ACTIONS`);
