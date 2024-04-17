import { createAction, props } from '@ngrx/store';
import { IHttpError } from '@core';
import { PlatformEnum } from '@store';

export const isLoading = createAction('[UI] IsLoading');
export const stopLoading = createAction('[UI] StopLoading');

export const uIClean = createAction('[UI] CLEAN');

export const showError = createAction('[UI] SHOW ERROR', props<{ error: IHttpError }>());
export const setPlatForm = createAction('[UI] SET PLATFORM', props<{ platform: PlatformEnum }>());

export const showMessage = createAction('[UI] SHOW MESSAGE', props<{ message: string; status: number }>());
export const cleanSearch = createAction('[SEARCH] CLEAN');
