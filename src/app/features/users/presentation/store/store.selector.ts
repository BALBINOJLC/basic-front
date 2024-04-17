import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IUserState } from './store.reducer';
import { userKeyStore } from '../config';

// Selector para obtener el estado 'user' completo
export const selectUser = createFeatureSelector<IUserState>(userKeyStore);

// Selector para obtener un listado de usuarios
export const selectUsers = createSelector(selectUser, (state: IUserState) => state.items);

// Selector para obtener específicamente el usuario seleccionado
export const selectUserSelected = createSelector(selectUser, (state: IUserState) => state.selected);

// Selector para obtener el tamaño máximo de usuarios
export const selectUserMaxSize = createSelector(selectUser, (state: IUserState) => state.total_count);
