/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props } from '@ngrx/store';
import { userActions } from '../config';
import { TFrom, IResposeGetUsers, IUser, IQueryUser, IQueryUsers, IUserUpdate } from '@users';


export const UserGets       = createAction(`[${userActions}] GETS USERS`,   props<{ params: IQueryUsers; uType: TFrom }>());
export const UserSearch     = createAction(`[${userActions}] SEARCH`,       props<{ params: IQueryUsers; query: string }>());
export const UserLoads      = createAction(`[${userActions}] LOADS USERS`,  props<{ data: IResposeGetUsers }>());
export const UserGetScroll  = createAction(`[${userActions}] GETS SCROLL`,  props<{ params: IQueryUsers; uType: TFrom }>());
export const UserLoadScroll = createAction(`[${userActions}] LOADS SCROLL`, props<{ data: IResposeGetUsers }>());
export const UserGet        = createAction(`[${userActions}] GET`,          props<{ query: IQueryUser }>());
export const UserDelete     = createAction(`[${userActions}] DELETE`,       props<{ id: string; from: TFrom }>());
export const UserUpdate     = createAction(`[${userActions}] UPDATE`,       props<{ id: string; item: IUserUpdate }>());
export const UserAdd        = createAction(`[${userActions}] ADD`,          props<{ item: IUser; from: TFrom }>());
export const UserLoad       = createAction(`[${userActions}] LOAD`,         props<{ item: IUser }>());
export const UserClean      = createAction(`[${userActions}] CLEAN`);
export const UserCleans     = createAction(`[${userActions}] CLEANS`);
