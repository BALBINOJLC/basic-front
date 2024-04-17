/* eslint-disable arrow-parens */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './store.action';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { NewsLettersService } from '../newsLetter.service';

@Injectable()
export class NewsLettersEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterSearch),
      mergeMap(({ params, query }) => this._newsLetterService.search(params, query).pipe(map((data) => actions.NewsLetterLoads({ data }))))
    )
  );

  gets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterGets),
      mergeMap(({ params }) => this._newsLetterService.gets(params).pipe(map((data) => actions.NewsLetterLoads({ data }))))
    )
  );

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterGet),
      mergeMap(({ query }) =>
        this._newsLetterService.get({ fields: query.fields, filter: query.filter }).pipe(map((item) => actions.NewsLetterLoad({ item })))
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterUpdate),
      mergeMap(({ filter, item }) =>
        this._newsLetterService.update(filter, item).pipe(map((data) => actions.NewsLetterLoad({ item: data })))
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterAdd),
      mergeMap(({ item }) =>
        this._newsLetterService.add(item).pipe(
          map(() => {
            return actions.NewsLetterClean();
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.NewsLetterDelete),
      mergeMap(({ id }) =>
        this._newsLetterService.delete(id).pipe(
          map(() => {
            return actions.NewsLetterClean();
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private _newsLetterService: NewsLettersService
  ) {}
}
