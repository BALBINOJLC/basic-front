/* eslint-disable arrow-parens */
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as actions from './store.action';
import { map, mergeMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TemplatesRepositoryImpl } from '@template';
import { templateRouteBase } from '../config';

@Injectable()
export class TemplatesEffects {
  search$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateSearch),
      mergeMap(({ params, query }) =>
        this._templateRepository.searchTemplates(params, query).pipe(map((data) => actions.TemplateLoads({ data })))
      )
    )
  );

  gets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateGets),
      mergeMap(({ params }) =>
        this._templateRepository.getTemplates(params).pipe(
          map((data) => {
            return actions.TemplateLoads({ data });
          })
        )
      )
    )
  );

  getsScroll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateGetScroll),
      mergeMap(({ params }) =>
        this._templateRepository.getTemplates(params).pipe(
          map((data) => {
            return actions.TemplateLoadScroll({ data });
          })
        )
      )
    )
  );

  get$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateGet),
      mergeMap(({ query }) =>
        this._templateRepository
          .getTemplate({ fields: query.fields, filter: query.filter })
          .pipe(map((item) => actions.TemplateLoad({ item })))
      )
    )
  );

  update$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateUpdate),
      mergeMap(({ id, item }) =>
        this._templateRepository.updateTemplate(id, item).pipe(map((data) => actions.TemplateLoad({ item: data })))
      )
    )
  );

  add$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateAdd),
      mergeMap(({ item }) =>
        this._templateRepository.addTemplate(item).pipe(
          map(() => {
            this._router.navigate([templateRouteBase]);
            return actions.TemplateClean();
          })
        )
      )
    )
  );

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.TemplateDelete),
      mergeMap(({ id }) =>
        this._templateRepository.deleteTemplate(id).pipe(
          map(() => {
            return actions.TemplateClean();
          })
        )
      )
    )
  );

  constructor(private actions$: Actions, private _templateRepository: TemplatesRepositoryImpl, private _router: Router) {}
}
