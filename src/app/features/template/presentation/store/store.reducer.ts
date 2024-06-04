/* eslint-disable @typescript-eslint/naming-convention */
import { Action, createReducer, on } from '@ngrx/store';
import * as actions from './store.action';
import { ITemplate, initialTemplate } from '@templates';

export interface ITemplateState {
  items: ITemplate[];
  page: number;
  per_page: number;
  total_count: number;
  selected: ITemplate | null;
}

export interface ITemplateAppState {
  template: ITemplateState;
}

const initialState: ITemplateState = {
  page: 0,
  per_page: 0,
  total_count: 0,
  selected: initialTemplate,
  items: [],
};

const _reducer = createReducer(
  initialState,
  on(actions.TemplateLoads, (state, { data }) => ({
    ...state,
    items: [...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  })),
  on(actions.TemplateLoad, (state, { item }) => ({ ...state, selected: item })),
  on(actions.TemplateClean, (state) => ({ ...state, selected: null })),
  on(actions.TemplateCleans, () => initialState),
  on(actions.TemplateLoadScroll, (state, { data }) => ({
    ...state,
    items: [...state.items, ...data.data],
    per_page: data.per_page,
    page: data.page,
    total_count: data.total_count,
  }))
);

export const templatesReducer = (state: ITemplateState, action: Action): ITemplateState =>
  _reducer(state, action);
