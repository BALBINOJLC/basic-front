import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UIState } from './ui.interface';

// Assuming your UI state is part of a feature module named 'UI'
export const UI_FEATURE_KEY = 'ui';

// Selector for the entire feature module
export const selectUiFeature = createFeatureSelector<UIState>(UI_FEATURE_KEY);

// Selector for specific properties within the feature state
export const selectUiState = createSelector(selectUiFeature, (state: UIState) => state);

// Selector for the 'platform' property within the feature state
export const selectPlatform = createSelector(selectUiFeature, (state: UIState) => state.platform);
