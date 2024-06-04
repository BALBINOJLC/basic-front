import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@core';
import {
  IResponseTemplateDeleted,
  IResponseTemplateUpdated,
  IResposeGetTemplates,
  ITemplate,
  IQueryTemplate,
  IQueryTemplates,
  TemplatesDataSource,
  ITemplateUpdate,
} from '@template';
import { environment } from 'environments/environment';
import { Observable, of, switchMap } from 'rxjs';
import { apiRestRoutes } from './routes';
import { setQueryParams } from '@utils';

@Injectable({
  providedIn: 'root',
})
export class TemplatesApiRestDataSource implements TemplatesDataSource {
  #urlApi = environment.urlApi;
  #authService = inject(AuthService);

  constructor(private http: HttpClient) {}

  getTemplates(params: IQueryTemplates): Observable<IResposeGetTemplates> {
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
    return this.http.get<IResposeGetTemplates>(url, { params: query });
  }
  searchTemplates(params: IQueryTemplates, regexp: string): Observable<IResposeGetTemplates> {
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
    return this.http.get<IResposeGetTemplates>(url);
  }
  getTemplate({ fields, filter }: IQueryTemplate): Observable<ITemplate> {
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

    return this.http.get<ITemplate>(url);
  }
  addTemplate(data: ITemplate): Observable<ITemplate> {
    const url = `${this.#urlApi}/${apiRestRoutes.add}`;
    return this.http.post<ITemplate>(url, data);
  }
  updateTemplate(id: string, data: ITemplateUpdate): Observable<ITemplate> {
    const url = `${this.#urlApi}/${apiRestRoutes.put}/${id}`;
    return this.http.patch<IResponseTemplateUpdated>(url, data).pipe(
      switchMap((response) => {
        return of(response.data);
      })
    );
  }
  deleteTemplate(id: string): Observable<IResponseTemplateDeleted> {
    const url = `${this.#urlApi}/${apiRestRoutes.delete}/${id}`;
    return this.http.delete<IResponseTemplateDeleted>(url);
  }
}
