import { Observable } from 'rxjs';
import { IResponseUserDeleted, IResposeGetUsers, IUser, IQueryUser, IQueryUsers, IUserUpdate } from '../interfaces';

export abstract class UsersDataSource {
  abstract getUsers(params: IQueryUsers): Observable<IResposeGetUsers>;

  abstract searchUsers(params: IQueryUsers, regexp: string): Observable<IResposeGetUsers>;

  abstract getUser(params: IQueryUser): Observable<IUser>;

  abstract addUser(data: IUser): Observable<IUser>;

  abstract updateUser(id: string, data: IUserUpdate): Observable<IUser>;

  abstract deleteUser(id: string): Observable<IResponseUserDeleted>;
}
