/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props } from '@ngrx/store';
import { actions } from '../config';
import { IQueryNewsLetter, IQueryNewsLetters, IRespApiNewsLetters, INewsLetterFilter, INewsLetterEntity } from '../interface';

export const NewsLetterGets = createAction(`[${actions}] GETS`, props<{ params: IQueryNewsLetters }>());
export const NewsLetterSearch = createAction(`[${actions}] SEARCH`, props<{ params: IQueryNewsLetters; query: string }>());
export const NewsLetterLoads = createAction(`[${actions}] LOADS`, props<{ data: IRespApiNewsLetters }>());
export const NewsLetterGet = createAction(`[${actions}] GET`, props<{ query: IQueryNewsLetter }>());
export const NewsLetterDelete = createAction(`[${actions}] DELETE`, props<{ id: string }>());
export const NewsLetterUpdate = createAction(`[${actions}] UPDATE`, props<{ filter: INewsLetterFilter; item: INewsLetterEntity }>());
export const NewsLetterAdd = createAction(`[${actions}] ADD`, props<{ item: INewsLetterEntity }>());
export const NewsLetterLoad = createAction(`[${actions}] LOAD`, props<{ item: INewsLetterEntity }>());
export const NewsLetterClean = createAction(`[${actions}] CLEAN`);
export const NewsLetterCleans = createAction(`[${actions}] CLEANS`);
