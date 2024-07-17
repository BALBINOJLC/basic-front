import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@core';
import {
  IResponseUserDeleted,
  IResponseUserUpdated,
  IResposeGetUsers,
  IUser,
  IQueryUser,
  IQueryUsers,
  UsersDataSource,
  IUserUpdate,
} from '@users';
import { environment } from 'environments/environment';
import { Observable, of, switchMap, tap } from 'rxjs';
import { apiRestRoutes } from './routes';
import { setQueryParams } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class UsersApiRestDataSource implements UsersDataSource {
  #urlApi = environment.urlApi;
  #authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getUsers(params: IQueryUsers): Observable<IResposeGetUsers> {
    const { limit, offset, sort } = params;
    let query = null;
    if (params.filter) {
      query = setQueryParams(params.filter);
    }

    let url = `${this.#urlApi}/${apiRestRoutes.gets}/${limit}/${offset}/${JSON.stringify(sort)}`;

    if (query) {
      url = `${url}?${query}`;
    }
    return this.http.get<IResposeGetUsers>(url, { params: query }).pipe(
      switchMap((resp) => {
        const userIsActive = resp.data.some((item) => item.id === this.#authService.idUserActive);
        return of(userIsActive ? { ...resp } : resp);
      })
    );
  }

  searchUsers(params: IQueryUsers, regexp: string): Observable<IResposeGetUsers> {
    const { limit, offset, sort, filter } = params;

    let query = null;
    if (filter) {
      query = setQueryParams(filter);
    }

    let url = `${this.#urlApi}/${apiRestRoutes.search}/${limit}/${offset}/${JSON.stringify(sort)}/${regexp}`;

    if (query) {
      url = `${url}?${query}`;
    }

    return this.http.get<IResposeGetUsers>(url);
  }

  getUser({ fields, filter }: IQueryUser): Observable<IUser> {
    let query = null;

    if (filter) {
      query = setQueryParams(filter);
    }

    let url = `${this.#urlApi}/${apiRestRoutes.get}`;

    if (fields) {
      url = `${url}/${fields}`;
    }
    if (filter) {
      url = `${url}?${query}`;
    }

    return this.http.get<IUser>(url);
  }
  addUser(data: IUser): Observable<IUser> {
    const url = `${this.#urlApi}/${apiRestRoutes.add}`;
    return this.http.post<IUser>(url, data);
  }
  updateUser(id: string, data: IUserUpdate): Observable<IUser> {
    const url = `${this.#urlApi}/${apiRestRoutes.put}/${id}`;
    return this.http.patch<IResponseUserUpdated>(url, data).pipe(switchMap((resp) => of(resp.data)));
  }

  updateProfile(id: string, data: IUserUpdate): Observable<IUser> {
    const url = `${this.#urlApi}/${apiRestRoutes.put}/${id}/profile`;

    return this.http.patch<IResponseUserUpdated>(url, data).pipe(
      tap((resp) => {
        console.log('resp', resp);

        const user = resp.data;
        const token = resp.access_token;
        this.#authService.saveStorage(token, user);
      }),
      switchMap((resp) => of(resp.data))
    );
  }
  deleteUser(id: string): Observable<IResponseUserDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.delete}/${id}`;
    return this.http.delete<IResponseUserDeleted>(url);
  }
}
