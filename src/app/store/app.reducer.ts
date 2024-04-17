/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionReducerMap } from '@ngrx/store';
import * as reducers from '@store';

import { IUserAppState, usersReducer } from '@users';
import { authReducer } from 'app/features/auth/store/auth.reducer';

export interface IAppState extends IUserAppState {
  ui: reducers.UIState;
}

export const appReducers: ActionReducerMap<any> = {
  ui: reducers.uiReducer,
  user: authReducer,
  users: usersReducer,
};
