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

  seeBases(): Observable<IBase[]> {
    return this.store.select(selectBases);
  }

  addbase(base: IBase): void {
    this.store.dispatch(actions.BaseAdd({ item: base }));
  }

  getbase(query: IQueryBase): void {
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

  cleanBase(): void {
    this.store.dispatch(actions.BaseClean());
  }

  cleansBases(): void {
    this.store.dispatch(actions.BaseCleans());
  }
}
