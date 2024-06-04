/* eslint-disable @typescript-eslint/naming-convention */
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './store.action';
import { IUser, initialUser } from '@users';

export interface IUserState {
  items: IUser[];
  page: number;
  per_page: number;
  total_count: number;
  selected: IUser | null;
}

export interface IUserAppState {
  users: IUserState;
}

const initialState: IUserState = {
  page: 0,
  per_page: 0,
  total_count: 0,
  selected: initialUser,
  items: [],
};

const _reducer = createReducer(
  initialState,
  on(actions.UserLoads, (state, { data }) => ({
    ...state,
    items: [...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  })),
  on(actions.UserLoad, (state, { item }) => ({ ...state, selected: item })),
  on(actions.UserClean, (state) => ({ ...state, selected: null })),
  on(actions.UserCleans, () => initialState),
  on(actions.UserLoadScroll, (state, { data }) => ({
    ...state,
    items: [...state.items, ...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  }))
);

export const usersReducer = (state: IUserState, action: Action): IUserState =>
  _reducer(state, action);
