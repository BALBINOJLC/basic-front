import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IUserState } from './store.reducer';
import { userKeyStore } from '../config';

export const selectUser = createFeatureSelector<IUserState>(userKeyStore as string);

export const selectUsers = createSelector(selectUser, (state: IUserState) => state.items);

export const selectUserSelected = createSelector(selectUser, (state: IUserState) => state.selected);

export const selectUserMaxSize = createSelector(selectUser, (state: IUserState) => state.total_count);
