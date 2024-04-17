/* eslint-disable @typescript-eslint/naming-convention */
import { Action, createReducer, on } from '@ngrx/store';
import { INewsLetterEntity } from '../interface';
import * as actions from './store.action';

export interface NewsLetterState {
  items: INewsLetterEntity[];
  page: number;
  per_page: number;
  total_count: number;
  selected: INewsLetterEntity | null;
}

export interface NewsLetterAppState {
  newsLetter: NewsLetterState;
}

const initialState: NewsLetterState = {
  page: 0,
  per_page: 0,
  total_count: 0,
  selected: null,
  items: [],
};

const _reducer = createReducer(
  initialState,
  on(actions.NewsLetterLoads, (state, { data }) => ({
    ...state,
    items: [...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  })),
  on(actions.NewsLetterLoad, (state, { item }) => ({ ...state, selected: item })),
  on(actions.NewsLetterClean, (state) => ({ ...state, selected: null })),
  on(actions.NewsLetterCleans, () => initialState)
);

export const newsLetterReducer = (state: NewsLetterState, action: Action): NewsLetterState => _reducer(state, action);
