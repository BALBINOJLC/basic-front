/* eslint-disable @typescript-eslint/naming-convention */
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './store.action';
import { IBase, initialBase } from '@base';

export interface IBaseState {
  items: IBase[];
  page: number;
  per_page: number;
  total_count: number;
  selected: IBase | null;
}

export interface IBaseAppState {
  base: IBaseState;
}

const initialState: IBaseState = {
  page: 0,
  per_page: 0,
  total_count: 0,
  selected: initialBase,
  items: [],
};

const _reducer = createReducer(
  initialState,
  on(actions.BaseLoads, (state, { data }) => ({
    ...state,
    items: [...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  })),
  on(actions.BaseLoad, (state, { item }) => ({ ...state, selected: item })),
  on(actions.BaseClean, (state) => ({ ...state, selected: null })),
  on(actions.BaseCleans, () => initialState),
  on(actions.BaseLoadScroll, (state, { data }) => ({
    ...state,
    items: [...state.items, ...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  }))
);

export const basesReducer = (state: IBaseState, action: Action): IBaseState =>
  _reducer(state, action);
