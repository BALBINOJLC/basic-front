/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './store.action';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersRepositoryImpl } from '@users';
import { userRouteUser } from '../config';

@Injectable()
export class UsersEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserSearch),
      mergeMap(({ params, query }) => this._userRepository.searchUsers(params, query).pipe(map((data) => actions.UserLoads({ data }))))
    )
  );

  gets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserGets),
      mergeMap(({ params }) =>
        this._userRepository.getUsers(params).pipe(
          map((data) => {
            return actions.UserLoads({ data });
          })
        )
      )
    )
  );

  getsScroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserGetScroll),
      mergeMap(({ params }) =>
        this._userRepository.getUsers(params).pipe(
          map((data) => {
            return actions.UserLoadScroll({ data });
          })
        )
      )
    )
  );

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserGet),
      mergeMap(({ query }) =>
        this._userRepository.getUser({ fields: query.fields, filter: query.filter }).pipe(map((item) => actions.UserLoad({ item })))
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserUpdate),
      mergeMap(({ id, item }) =>
        this._userRepository.updateUser(id, item).pipe(
          map(() => {
            this._router.navigate([userRouteUser]);
            return actions.UserClean();
          })
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserAdd),
      mergeMap(({ item }) =>
        this._userRepository.addUser(item).pipe(
          map(() => {
            this._router.navigate([userRouteUser]);
            return actions.UserClean();
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserDelete),
      mergeMap(({ id }) =>
        this._userRepository.deleteUser(id).pipe(
          map(() => {
            return actions.UserClean();
          })
        )
      )
    )
  );

  deleteGallery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserDeleteGallery),
      mergeMap(({ id }) =>
        this._userRepository.deleteUserGallery(id).pipe(
          map(() => {
            return actions.UserGalleryClean();
          })
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserPromoDelete),
      mergeMap(({ user_promo, user_simple }) =>
        this._userRepository.deleteUserPromo(user_promo, user_simple).pipe(
          map(() => {
            return actions.UserGalleryClean();
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _userRepository: UsersRepositoryImpl,
    private _router: Router
  ) {}
}
