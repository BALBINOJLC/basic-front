import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IBaseState } from './store.reducer';
import { baseKeyStore } from '../config';

export const selectBase = createFeatureSelector<IBaseState>(baseKeyStore as string);

export const selectBases = createSelector(selectBase, (state: IBaseState) => state.items);

export const selectBaseSelected = createSelector(selectBase, (state: IBaseState) => state.selected);

export const selectBaseMaxSize = createSelector(selectBase, (state: IBaseState) => state.total_count);
