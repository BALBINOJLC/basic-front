import { Action, createReducer, on } from '@ngrx/store';
import { UIState } from './ui.interface';
import * as actions from '@store';

const initialUI = {
  isLoading : false,
  message   : null,
  error     : null,
};

const initialState: UIState = {
  isLoading : false,
  message   : null,
  error     : null,
  platform  : null,
  paginator : {
    limit: 200,
    offset: 0,
  },
};

const _uiReducer = createReducer(
  initialState,

  on(actions.isLoading,           (state)                     : UIState => ({ ...state, isLoading: true                                          })),
  on(actions.stopLoading,         (state)                     : UIState => ({ ...state, isLoading: false                                         })),
  on(actions.showError,           (state, { error })          : UIState => ({ ...state, error                                                    })),
  on(actions.uIClean,             (state)                     : UIState => ({ ...state, ...initialUI                                             })),
  on(actions.setPlatForm,         (state, { platform })       : UIState => ({ ...state, platform                                                 })),
  on(actions.showMessage,         (state, { message, status }): UIState => ({ ...state, message:    { message, status }                          })),
  on(actions.PaginatorNewLimit,   (state, { limit })          : UIState => ({ ...state, paginator:  { ...state.paginator, limit } })),
  on(actions.PaginatorLoad,       (state, { paginator })      : UIState => ({ ...state, paginator                                                })),
  on(actions.PaginatorPageChange, (state, { page })           : UIState => ({ ...state, paginator: { ...state.paginator, offset: page }   })),
);

export const uiReducer = (state: UIState, action: Action): UIState => _uiReducer(state, action);
