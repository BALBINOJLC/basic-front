import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@core';
import {
  IResponseBaseDeleted,
  IResponseBaseUpdated,
  IResposeGetBases,
  IBase,
  IQueryBase,
  IQueryBases,
  BasesDataSource,
  IBaseUpdate,
} from 'app/features/base';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { apiRestRoutes } from './routes';
import { setQueryParams } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class BasesApiRestDataSource implements BasesDataSource {
  #urlApi = environment.urlApi;
  #authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getBases(params: IQueryBases): Observable<IResposeGetBases> {
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
    return this.http.get<IResposeGetBases>(url, { params: query });
  }
  searchBases(params: IQueryBases, regexp: string): Observable<IResposeGetBases> {
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
    return this.http.get<IResposeGetBases>(url);
  }
  getBase({ fields, filter }: IQueryBase): Observable<IBase> {
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

    return this.http.get<IBase>(url);
  }
  addBase(data: IBase): Observable<IBase> {
    const url = `${this.#urlApi}/${apiRestRoutes.add}`;
    return this.http.post<IBase>(url, data);
  }
  updateBase(id: string, data: IBaseUpdate): Observable<IBase> {
    const url = `${this.#urlApi}/${apiRestRoutes.put}/${id}`;
    return this.http.patch<IResponseBaseUpdated>(url, data).pipe(
      switchMap((response) => {
        return of(response.data);
      })
    );
  }
  deleteBase(id: string): Observable<IResponseBaseDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.delete}/${id}`;
    return this.http.delete<IResponseBaseDeleted>(url);
  }
}
