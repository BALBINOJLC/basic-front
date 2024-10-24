/* eslint-disable @typescript-eslint/naming-convention */
import { Store } from '@ngrx/store';
import * as actions from '@users';
import { Observable } from 'rxjs';
import {
  IQueryUser,
  IQueryUsers,
  IUser,
  IUserState,
  IUserUpdate,
  selectUser,
  selectUserMaxSize,
  selectUserSelected,
  selectUsers,
} from '@users';

export class UserStoreService {
  constructor(private store: Store) {}

  see(): Observable<IUserState> {
    return this.store.select(selectUser);
  }

  seeMaxSize(): Observable<number> {
    return this.store.select(selectUserMaxSize);
  }

  seeUser(): Observable<IUser> {
    return this.store.select(selectUserSelected);
  }
  seeUserLoadFile(user: IUser): void {
    this.store.dispatch(actions.UserLoad({ item: user }));
  }

  seeUsers(): Observable<IUser[]> {
    return this.store.select(selectUsers);
  }

  addUser(user: IUser): void {
    this.store.dispatch(actions.UserAdd({ item: user }));
  }

  getUser(query: IQueryUser): void {
    this.store.dispatch(actions.UserGet({ query }));
  }

  getUsers(params: IQueryUsers): void {
    this.store.dispatch(actions.UserGets({ params }));
  }

  getScroll(params: IQueryUsers): void {
    this.store.dispatch(actions.UserGetScroll({ params }));
  }

  searchUsers(params: IQueryUsers, query: string): void {
    this.store.dispatch(actions.UserSearch({ params, query }));
  }

  updateUser(id: string, item: IUserUpdate): void {
    this.store.dispatch(actions.UserUpdate({ id, item }));
  }

  deleteUser(id: string): void {
    this.store.dispatch(actions.UserDelete({ id }));
  }

  deleteUserGallery(id_file: string): Observable<string> {
    return new Observable((observer) => {
      this.store.dispatch(actions.UserDeleteGallery({ id: id_file }));
      observer.next(id_file);
      observer.complete();
    });
  }

  deleteUserPromo(user_promo: string, user_simple: string): void {
    this.store.dispatch(actions.UserPromoDelete({ user_promo, user_simple }));
  }

  cleanUser(): void {
    this.store.dispatch(actions.UserClean());
  }

  cleansUsers(): void {
    this.store.dispatch(actions.UserCleans());
  }
}
