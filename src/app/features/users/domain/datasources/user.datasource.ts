import { Observable } from 'rxjs';
import { IResponseUserDeleted, IResponseGetUsers, IUser, IQueryUser, IQueryUsers, IUserUpdate } from '../interfaces';

export abstract class UsersDataSource {
  abstract getUsers(params: IQueryUsers): Observable<IResponseGetUsers>;

  abstract searchUsers(params: IQueryUsers, regexp: string): Observable<IResponseGetUsers>;

  abstract getUser(params: IQueryUser): Observable<IUser>;

  abstract addUser(data: IUser): Observable<IUser>;

  abstract updateUser(id: string, data: IUserUpdate): Observable<IUser>;

  abstract deleteUser(id: string): Observable<IResponseUserDeleted>;
}
