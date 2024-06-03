import { Store } from '@ngrx/store';
import * as actions from '@users';
import { Observable } from 'rxjs';
import {
  TFrom,
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

  seeUsers(): Observable<IUser[]> {
    return this.store.select(selectUsers);
  }

  adduser(user: IUser, from: TFrom): void {
    this.store.dispatch(actions.UserAdd({ item: user, from }));
  }

  getuser(query: IQueryUser): void {
    this.store.dispatch(actions.UserGet({ query }));
  }

  getUsers(params: IQueryUsers, uType: TFrom): void {
    this.store.dispatch(actions.UserGets({ params, uType }));
  }

  searchUsers(params: IQueryUsers, query: string): void {
    this.store.dispatch(actions.UserSearch({ params, query }));
  }

  updateUser(id: string, item: IUserUpdate): void {
    this.store.dispatch(actions.UserUpdate({ id, item }));
  }

  deleteUser(id: string, from: TFrom): void {
    this.store.dispatch(actions.UserDelete({ id, from }));
  }

  cleanUser(): void {
    this.store.dispatch(actions.UserClean());
  }

  cleansUsers(): void {
    this.store.dispatch(actions.UserCleans());
  }
}
