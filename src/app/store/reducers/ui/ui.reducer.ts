import { Action, createReducer, on } from '@ngrx/store';
import { UIState } from './ui.interface';
import * as actions from '@store';

const initialState: UIState = {
  isLoading: false,
  message: null,
  error: null,
  platform: null,
};

const _uiReducer = createReducer(
  initialState,

  on(actions.isLoading, (state): UIState => ({ ...state, isLoading: true })),
  on(
    actions.stopLoading,
    (state): UIState => ({
      ...state,
      isLoading: false,
    })
  ),
  on(
    actions.showError,
    (state, { error }): UIState => ({
      ...state,
      error,
    })
  ),
  on(
    actions.uIClean,
    (state): UIState => ({
      ...state,
      isLoading: false,
      message: null,
      error: null,
    })
  ),

  on(
    actions.setPlatForm,
    (state, { platform }): UIState => ({
      ...state,
      platform,
    })
  ),

  on(
    actions.showMessage,
    (state, { message, status }): UIState => ({
      ...state,
      message: {
        message,
        status,
      },
    })
  )
);

export const uiReducer = (state: UIState, action: Action) => _uiReducer(state, action);
