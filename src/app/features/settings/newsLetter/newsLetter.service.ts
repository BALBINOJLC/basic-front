/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { routes } from './config';
import { IQueryNewsLetters, IRespApiNewsLetters, INewsLetterFilter, INewsLetterUpdated } from './interface';
import { setQueryParams } from '@utils';
import { INewsLetterEntity } from './interface';

@Injectable({
  providedIn: 'root',
})
export class NewsLettersService {
  private urlApi = environment.urlApi;

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {}

  gets(params: IQueryNewsLetters): Observable<{ data: INewsLetterEntity[]; total_count: number; page: number; per_page: number }> {
    const { limit, offset, fields, sort } = params;
    let query = null;
    if (params.filter) {
      query = setQueryParams(params.filter);
    }

    let url = `${this.urlApi}/${routes.gets}/${limit}/${offset}/${JSON.stringify(sort)}`;
    if (fields) {
      url = `${url}/${fields}`;
    }
    if (query) {
      url = `${url}?${query}`;
    }

    return this._httpClient.get<IRespApiNewsLetters>(url).pipe(
      tap((resp: IRespApiNewsLetters) => resp),
      switchMap((resp) => {
        const newResp = {
          ...resp,
        };

        return of(newResp);
      })
    );
  }

  /**
   * Search
   *
   * @param limit
   * @param offset
   */
  search(params: IQueryNewsLetters, regexp: string): Observable<IRespApiNewsLetters> {
    const { limit, offset, fields, sort, filter } = params;

    let query = null;
    if (filter) {
      query = setQueryParams(filter);
    }

    let url = `${this.urlApi}/${routes.search}/${limit}/${offset}/${JSON.stringify(sort)}/${regexp}`;

    if (fields) {
      console.log(fields);

      url = `${url}/${fields}`;
    }
    if (query) {
      url = `${url}?${query}`;
    }
    console.log(url);

    return this._httpClient.get<IRespApiNewsLetters>(url).pipe(
      tap((resp: IRespApiNewsLetters) => resp),
      switchMap((resp) => of(resp))
    );
  }

  /**
   * Get by filter
   *
   * @param query
   */

  get({ fields, filter }: { fields: string; filter: INewsLetterFilter }): Observable<INewsLetterEntity> {
    const query = setQueryParams(filter);

    let url = `${this.urlApi}/${routes.get}`;
    if (fields) {
      url = `${url}/${fields}`;
    }
    if (filter) {
      url = `${url}?${query}`;
    }
    return this._httpClient.get<INewsLetterEntity>(url).pipe(
      tap((resp: INewsLetterEntity) => resp),
      switchMap((resp) => of(resp))
    );
  }

  /**
   * Add
   *
   * @param data
   */
  add(data: INewsLetterEntity): Observable<INewsLetterEntity> {
    const url = `${this.urlApi}/${routes.add}`;
    return this._httpClient.post<INewsLetterEntity>(url, data).pipe(
      tap((resp: INewsLetterEntity) => resp),
      switchMap((resp) => of(resp))
    );
  }

  /**
   * Update
   *
   * @param data
   * @param filter
   */
  update(filter: INewsLetterFilter, data: INewsLetterEntity): Observable<INewsLetterEntity> {
    const query = setQueryParams(filter);
    let url = `${this.urlApi}/${routes.put}`;
    if (filter) {
      url = `${url}?${query}`;
    }

    return this._httpClient.put<INewsLetterUpdated>(url, data).pipe(
      tap((resp: INewsLetterUpdated) => resp),
      switchMap((resp) => {
        return of(resp.data);
      })
    );
  }

  /**
   * Delete
   *
   * @param id
   * @returns : Observable<INewsLetterEntity>
   */
  delete(id: string): Observable<INewsLetterEntity> {
    const url = `${this.urlApi}/${routes.delete}/${id}`;
    return this._httpClient.delete<INewsLetterEntity>(url).pipe(
      tap((resp) => resp),
      switchMap((resp) => of(resp))
    );
  }
}
