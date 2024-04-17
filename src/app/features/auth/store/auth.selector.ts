import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IAuthState } from './auth.reducer';

// Selector para obtener el estado 'user' completo
export const selectAuth = createFeatureSelector<IAuthState>('user');

// Selector para obtener específicamente el token del estado 'user'
export const selectAuthToken = createSelector(selectAuth, (user: IAuthState) => user?.token);

// Selector para obtener específicamente el usuario del estado 'user'
export const selectAuthUser = createSelector(selectAuth, (user: IAuthState) => user?.userOrg);
