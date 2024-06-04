import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITemplateState } from './store.reducer';
import { templateKeyStore } from '../config';

// Selector para obtener el estado 'template' completo
export const selectTemplate = createFeatureSelector<ITemplateState>(templateKeyStore as string);

// Selector para obtener un listado de usuarios
export const selectTemplates = createSelector(selectTemplate, (state: ITemplateState) => state.items);

// Selector para obtener específicamente el usuario seleccionado
export const selectTemplateSelected = createSelector(selectTemplate, (state: ITemplateState) => state.selected);

// Selector para obtener el tamaño máximo de usuarios
export const selectTemplateMaxSize = createSelector(selectTemplate, (state: ITemplateState) => state.total_count);
