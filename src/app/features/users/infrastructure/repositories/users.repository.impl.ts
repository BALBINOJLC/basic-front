/* eslint-disable @typescript-eslint/naming-convention */
import { Observable } from 'rxjs';
import { IResponseUserDeleted, IResponseGetUsers, IUser, IQueryUser, IQueryUsers, UsersRepository, IUserUpdate } from '../../domain';
import { UsersApiRestDataSource } from '../datasources';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private dataSource: UsersApiRestDataSource) {
    this.dataSource = dataSource;
  }
  getUsers(params: IQueryUsers): Observable<IResponseGetUsers> {
    return this.dataSource.getUsers(params);
  }

  searchUsers(params: IQueryUsers, regexp: string): Observable<IResponseGetUsers> {
    return this.dataSource.searchUsers(params, regexp);
  }
  getUser(params: IQueryUser): Observable<IUser> {
    return this.dataSource.getUser(params);
  }
  addUser(data: IUser): Observable<IUser> {
    return this.dataSource.addUser(data);
  }
  deleteUser(id: string): Observable<IResponseUserDeleted> {
    return this.dataSource.deleteUser(id);
  }

  deleteUserGallery(id_file: string): Observable<IResponseUserDeleted> {
    return this.dataSource.deleteGalleryUser(id_file);
  }

  deleteUserPromo(user_promo: string, user_simple: string): Observable<IResponseUserDeleted> {
    return this.dataSource.deleteUserPromo(user_promo, user_simple);
  }
  updateUser(id: string, data: IUserUpdate): Observable<IUser> {
    return this.dataSource.updateUser(id, data);
  }
}
