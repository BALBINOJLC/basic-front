/* eslint-disable @typescript-eslint/naming-convention */
import { Store } from '@ngrx/store';
import * as actions from '@bases';
import { Observable } from 'rxjs';
import {
  IQueryBase,
  IQueryBases,
  IBase,
  IBaseState,
  IBaseUpdate,
  selectBase,
  selectBaseMaxSize,
  selectBaseSelected,
  selectBases,
} from '@bases';

export class BaseStoreService {
  constructor(private store: Store) {}

  see(): Observable<IBaseState> {
    return this.store.select(selectBase);
  }

  seeMaxSize(): Observable<number> {
    return this.store.select(selectBaseMaxSize);
  }

  seeBase(): Observable<IBase> {
    return this.store.select(selectBaseSelected);
  }
  seeBaseLoadFile(base: IBase): void {
    this.store.dispatch(actions.BaseLoad({ item: base }));
  }

  seeBases(): Observable<IBase[]> {
    return this.store.select(selectBases);
  }

  addBase(base: IBase): void {
    this.store.dispatch(actions.BaseAdd({ item: base }));
  }

  getBase(query: IQueryBase): void {
    this.store.dispatch(actions.BaseGet({ query }));
  }

  getBases(params: IQueryBases): void {
    this.store.dispatch(actions.BaseGets({ params }));
  }

  getScroll(params: IQueryBases): void {
    this.store.dispatch(actions.BaseGetScroll({ params }));
  }

  searchBases(params: IQueryBases, query: string): void {
    this.store.dispatch(actions.BaseSearch({ params, query }));
  }

  updateBase(id: string, item: IBaseUpdate): void {
    this.store.dispatch(actions.BaseUpdate({ id, item }));
  }

  deleteBase(id: string): void {
    this.store.dispatch(actions.BaseDelete({ id }));
  }

  deleteBaseGallery(id_file: string): Observable<string> {
    return new Observable((observer) => {
      this.store.dispatch(actions.BaseDeleteGallery({ id: id_file }));
      observer.next(id_file);
      observer.complete();
    });
  }

  deleteBasePromo(base_promo: string, base_simple: string): void {
    this.store.dispatch(actions.BasePromoDelete({ base_promo, base_simple }));
  }

  cleanBase(): void {
    this.store.dispatch(actions.BaseClean());
  }

  cleansBases(): void {
    this.store.dispatch(actions.BaseCleans());
  }
}
