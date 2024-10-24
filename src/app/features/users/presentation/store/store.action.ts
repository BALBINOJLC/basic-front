/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props } from '@ngrx/store';
import { userActions } from '../config';
import { IResponseGetUsers, IUser, IQueryUser, IQueryUsers, IUserUpdate } from '@users';


export const UserGets             = createAction(`[${userActions}] GETS USERS`, props<{ params: IQueryUsers; }>());
export const UserSearch           = createAction(`[${userActions}] SEARCH`, props<{ params: IQueryUsers; query: string }>());
export const UserLoads            = createAction(`[${userActions}] LOADS USERS`, props<{ data: IResponseGetUsers }>());
export const UserGetScroll        = createAction(`[${userActions}] GETS SCROLL`, props<{ params: IQueryUsers; }>());
export const UserLoadScroll       = createAction(`[${userActions}] LOADS SCROLL`, props<{ data: IResponseGetUsers }>());
export const UserGet              = createAction(`[${userActions}] GET`, props<{ query: IQueryUser }>());
export const UserDelete           = createAction(`[${userActions}] DELETE`, props<{ id: string; }>());
export const UserDeleteGallery    = createAction(`[${userActions}] DELETE-GALLERY`, props<{ id: string; }>());
export const UserGalleryClean     = createAction(`[${userActions}] CLEAN-GALLERY`);
export const UserPromoDelete      = createAction(`[${userActions}] DELETE-USER_PROMO`, props<{ user_promo: string; user_simple:string }>());
export const UserPromoClean       = createAction(`[${userActions}] CLEAN-USER-PROMO`);
export const UserUpdate           = createAction(`[${userActions}] UPDATE`, props<{ id: string; item: IUserUpdate }>());
export const UserAdd              = createAction(`[${userActions}] ADD`, props<{ item: IUser; }>());
export const UserLoad             = createAction(`[${userActions}] LOAD`, props<{ item: IUser }>());
export const UserClean            = createAction(`[${userActions}] CLEAN`);
export const UserCleans           = createAction(`[${userActions}] CLEANS`);
