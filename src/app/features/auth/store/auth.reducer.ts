import { Action, createReducer, on } from '@ngrx/store';
import { IUser } from '@users';

import * as actions from './auth.action';

export interface IAuthState {
  token: string | null;
  userOrg: IUser | null;
}

export interface IAuthAppState {
  user: IAuthState;
}

export const initialState: IAuthState = {
  token: null,
  userOrg: null,
};

const _authReducer = createReducer(
  initialState,

  on(actions.AuthLoadUser, (state, { data: { token, user } }): { token: string; userOrg: IUser } => ({
    ...state,
    token: token,
    userOrg: user,
  })),
  on(actions.AuthSetDataUser, (state, { user }): { userOrg: IUser; token: string | null } => ({ ...state, userOrg: user })),
  on(actions.AuthClean, (state): { token: null; userOrg: null } => ({ ...state, token: null, userOrg: null }))
);

export const authReducer = (state: IAuthState, action: Action): IAuthState => _authReducer(state, action);
