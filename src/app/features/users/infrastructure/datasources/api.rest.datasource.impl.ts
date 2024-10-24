/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@core';
import {
  IResponseUserDeleted,
  IResponseUserUpdated,
  IResponseGetUsers,
  IUser,
  IQueryUser,
  IQueryUsers,
  UsersDataSource,
  IUserUpdate,
} from '@users';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { apiRestRoutes } from './routes';
import { setQueryParams } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class UsersApiRestDataSource implements UsersDataSource {
  #urlApi = environment.urlApi;
  #authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getUsers(params: IQueryUsers): Observable<IResponseGetUsers> {
    const { limit, offset, fields, sort } = params;
    let query = null;
    if (params.filter) {
      query = setQueryParams(params.filter);
    }

    let url = `${this.#urlApi}/${apiRestRoutes.gets}/${limit}/${offset}/${JSON.stringify(sort)}`;
    if (fields) {
      url = `${url}/${fields}`;
    }
    if (query) {
      url = `${url}?${query}`;
    }
    return this.http.get<IResponseGetUsers>(url, { params: query });
  }

  searchUsers(params: IQueryUsers, regexp: string): Observable<IResponseGetUsers> {
    const { limit, offset, fields, sort, filter } = params;

    let query = null;
    if (filter) {
      query = setQueryParams(filter);
    }

    let url = `${this.#urlApi}/${apiRestRoutes.search}/${limit}/${offset}/${JSON.stringify(sort)}/${regexp}`;

    if (fields) {
      url = `${url}/${fields}`;
    }
    if (query) {
      url = `${url}?${query}`;
    }
    return this.http.get<IResponseGetUsers>(url);
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
    return this.http.patch<IResponseUserUpdated>(url, data).pipe(
      switchMap((response) => {
        return of(response.data);
      })
    );
  }

  deleteUser(id: string): Observable<IResponseUserDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.delete}/${id}`;
    return this.http.delete<IResponseUserDeleted>(url);
  }

  deleteGalleryUser(id: string): Observable<IResponseUserDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.galleryDelete}/${id}`;
    return this.http.delete<IResponseUserDeleted>(url);
  }

  deleteUserPromo(user_promo: string, user_simple: string): Observable<IResponseUserDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.userPromoDelete}/${user_promo}/${user_simple}`;
    return this.http.delete<IResponseUserDeleted>(url);
  }
}
