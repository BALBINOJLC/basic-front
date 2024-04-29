import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IUIAppState, UIState } from '../reducers';

export const uiKeyStore: keyof IUIAppState = 'ui';
// Selector para obtener el estado 'user' completo
export const selectUI = createFeatureSelector<UIState>(uiKeyStore);

// Selector para obtener el paginator
export const selectUIPaginator = createSelector(selectUI, (state: UIState) => state.paginator);
