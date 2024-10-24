/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './store.action';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BasesRepositoryImpl } from '@bases';
import { baseRouteBase } from '../config';

@Injectable()
export class BasesEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseSearch),
      mergeMap(({ params, query }) => this._baseRepository.searchBases(params, query).pipe(map((data) => actions.BaseLoads({ data }))))
    )
  );

  gets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseGets),
      mergeMap(({ params }) =>
        this._baseRepository.getBases(params).pipe(
          map((data) => {
            return actions.BaseLoads({ data });
          })
        )
      )
    )
  );

  getsScroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseGetScroll),
      mergeMap(({ params }) =>
        this._baseRepository.getBases(params).pipe(
          map((data) => {
            return actions.BaseLoadScroll({ data });
          })
        )
      )
    )
  );

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseGet),
      mergeMap(({ query }) =>
        this._baseRepository.getBase({ fields: query.fields, filter: query.filter }).pipe(map((item) => actions.BaseLoad({ item })))
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseUpdate),
      mergeMap(({ id, item }) =>
        this._baseRepository.updateBase(id, item).pipe(
          map(() => {
            this._router.navigate([baseRouteBase]);
            return actions.BaseClean();
          })
        )
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseAdd),
      mergeMap(({ item }) =>
        this._baseRepository.addBase(item).pipe(
          map(() => {
            this._router.navigate([baseRouteBase]);
            return actions.BaseClean();
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseDelete),
      mergeMap(({ id }) =>
        this._baseRepository.deleteBase(id).pipe(
          map(() => {
            return actions.BaseClean();
          })
        )
      )
    )
  );

  deleteGallery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BaseDeleteGallery),
      mergeMap(({ id }) =>
        this._baseRepository.deleteBaseGallery(id).pipe(
          map(() => {
            return actions.BaseGalleryClean();
          })
        )
      )
    )
  );

  deleteBase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.BasePromoDelete),
      mergeMap(({ base_promo, base_simple }) =>
        this._baseRepository.deleteBasePromo(base_promo, base_simple).pipe(
          map(() => {
            return actions.BaseGalleryClean();
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _baseRepository: BasesRepositoryImpl,
    private _router: Router
  ) {}
}
