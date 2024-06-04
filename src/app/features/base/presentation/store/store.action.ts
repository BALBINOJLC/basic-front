/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props } from '@ngrx/store';
import { baseActions } from '../config';
import { IResposeGetBases, IBase, IQueryBase, IQueryBases, IBaseUpdate } from '@bases';


export const BaseGets       = createAction(`[${baseActions}] GETS BASES`,   props<{ params: IQueryBases; }>());
export const BaseSearch     = createAction(`[${baseActions}] SEARCH`,           props<{ params: IQueryBases; query: string }>());
export const BaseLoads      = createAction(`[${baseActions}] LOADS BASES`,  props<{ data: IResposeGetBases }>());
export const BaseGetScroll  = createAction(`[${baseActions}] GETS SCROLL`,      props<{ params: IQueryBases; }>());
export const BaseLoadScroll = createAction(`[${baseActions}] LOADS SCROLL`,     props<{ data: IResposeGetBases }>());
export const BaseGet        = createAction(`[${baseActions}] GET`,              props<{ query: IQueryBase }>());
export const BaseDelete     = createAction(`[${baseActions}] DELETE`,           props<{ id: string; }>());
export const BaseUpdate     = createAction(`[${baseActions}] UPDATE`,           props<{ id: string; item: IBaseUpdate }>());
export const BaseAdd        = createAction(`[${baseActions}] ADD`,              props<{ item: IBase; }>());
export const BaseLoad       = createAction(`[${baseActions}] LOAD`,             props<{ item: IBase }>());
export const BaseClean      = createAction(`[${baseActions}] CLEAN`);
export const BaseCleans     = createAction(`[${baseActions}] CLEANS`);
