import { Observable } from 'rxjs';
import { IResponseUserDeleted, IResposeGetUsers, IUser, IQueryUser, IQueryUsers, UsersRepository, IUserUpdate } from '../../domain';
import { UsersApiRestDataSource } from '../datasources';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private dataSource: UsersApiRestDataSource) {
    this.dataSource = dataSource;
  }
  getUsers(params: IQueryUsers): Observable<IResposeGetUsers> {
    return this.dataSource.getUsers(params);
  }

  searchUsers(params: IQueryUsers, regexp: string): Observable<IResposeGetUsers> {
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
  updateUser(id: string, data: IUserUpdate): Observable<IUser> {
    return this.dataSource.updateUser(id, data);
  }
}
