import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IBaseState } from './store.reducer';
import { baseKeyStore } from '../config';

// Selector para obtener el estado 'base' completo
export const selectBase = createFeatureSelector<IBaseState>(baseKeyStore as string);

// Selector para obtener un listado de usuarios
export const selectBases = createSelector(selectBase, (state: IBaseState) => state.items);

// Selector para obtener específicamente el usuario seleccionado
export const selectBaseSelected = createSelector(selectBase, (state: IBaseState) => state.selected);

// Selector para obtener el tamaño máximo de usuarios
export const selectBaseMaxSize = createSelector(selectBase, (state: IBaseState) => state.total_count);
