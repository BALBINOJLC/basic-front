import { createAction, props } from '@ngrx/store';
import { IHttpError } from '@core';
import { IPaginator, PlatformEnum } from '@store';

export const isLoading              = createAction('[UI] IsLoading');
export const stopLoading            = createAction('[UI] StopLoading');
export const uIClean                = createAction('[UI] CLEAN');
export const showError              = createAction('[UI] SHOW ERROR',           props<{ error    : IHttpError                }>());
export const setPlatForm            = createAction('[UI] SET PLATFORM',         props<{ platform : PlatformEnum              }>());
export const showMessage            = createAction('[UI] SHOW MESSAGE',         props<{ message  : string; status: number    }>());
export const cleanSearch            = createAction('[SEARCH] CLEAN');
export const PaginatorNewLimit      = createAction('[PAGINATOR] NEW LIMIT',     props<{ limit    : number                     }>());
export const PaginatorPageChange    = createAction('[PAGINATOR] PAGE CHANGED',  props<{ page     : number                     }>());
export const PaginatorLoad          = createAction('[PAGINATOR] LOAD',          props<{ paginator: IPaginator                 }>());
