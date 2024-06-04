import { Store } from '@ngrx/store';
import * as actions from '@template';
import { Observable } from 'rxjs';
import {
  IQueryTemplate,
  IQueryTemplates,
  ITemplate,
  ITemplateState,
  ITemplateUpdate,
  selectTemplate,
  selectTemplateMaxSize,
  selectTemplateSelected,
  selectTemplates,
} from '@template';

export class TemplateStoreService {
  constructor(private store: Store) {}

  see(): Observable<ITemplateState> {
    return this.store.select(selectTemplate);
  }

  seeMaxSize(): Observable<number> {
    return this.store.select(selectTemplateMaxSize);
  }

  seeTemplate(): Observable<ITemplate> {
    return this.store.select(selectTemplateSelected);
  }

  seeTemplates(): Observable<ITemplate[]> {
    return this.store.select(selectTemplates);
  }

  addtemplate(template: ITemplate): void {
    this.store.dispatch(actions.TemplateAdd({ item: template }));
  }

  gettemplate(query: IQueryTemplate): void {
    this.store.dispatch(actions.TemplateGet({ query }));
  }

  getTemplates(params: IQueryTemplates): void {
    this.store.dispatch(actions.TemplateGets({ params }));
  }

  getScroll(params: IQueryTemplates): void {
    this.store.dispatch(actions.TemplateGetScroll({ params }));
  }

  searchTemplates(params: IQueryTemplates, query: string): void {
    this.store.dispatch(actions.TemplateSearch({ params, query }));
  }

  updateTemplate(id: string, item: ITemplateUpdate): void {
    this.store.dispatch(actions.TemplateUpdate({ id, item }));
  }

  deleteTemplate(id: string): void {
    this.store.dispatch(actions.TemplateDelete({ id }));
  }

  cleanTemplate(): void {
    this.store.dispatch(actions.TemplateClean());
  }

  cleansTemplates(): void {
    this.store.dispatch(actions.TemplateCleans());
  }
}
