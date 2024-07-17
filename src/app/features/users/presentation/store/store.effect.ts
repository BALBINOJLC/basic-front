/* eslint-disable arrow-parens */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './store.action';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsersRepositoryImpl } from '@users';
import { userRouteBase } from '../config';

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
      mergeMap(({ params, uType }) =>
        this._userRepository.getUsers(params).pipe(
          map((data) => {
            if (uType === 'user') {
              return actions.UserLoads({ data });
            }
          })
        )
      )
    )
  );

  getsScroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserGetScroll),
      mergeMap(({ params, uType }) =>
        this._userRepository.getUsers(params).pipe(
          map((data) => {
            if (uType === 'user') {
              return actions.UserLoadScroll({ data });
            }
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
      mergeMap(({ id, item }) => this._userRepository.updateUser(id, item).pipe(map((data) => actions.UserLoad({ item: data }))))
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserProfile),
      mergeMap(({ id, item }) => this._userRepository.updateProfile(id, item).pipe(map((data) => actions.UserLoad({ item: data }))))
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserAdd),
      mergeMap(({ item, from }) =>
        this._userRepository.addUser(item).pipe(
          map(() => {
            if (from === 'user') {
              this._router.navigate([userRouteBase]);
            }

            return actions.UserClean();
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.UserDelete),
      mergeMap(({ id, from }) =>
        this._userRepository.deleteUser(id).pipe(
          map(() => {
            if (from === 'user') {
              this._router.navigate([userRouteBase]);
            }
            return actions.UserClean();
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
