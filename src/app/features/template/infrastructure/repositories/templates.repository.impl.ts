import { Observable } from 'rxjs';
import { IResponseTemplateDeleted, IResposeGetTemplates, ITemplate, IQueryTemplate, IQueryTemplates, TemplatesRepository, ITemplateUpdate } from '../../domain';
import { TemplatesApiRestDataSource } from '../datasources';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TemplatesRepositoryImpl implements TemplatesRepository {
  constructor(private dataSource: TemplatesApiRestDataSource) {
    this.dataSource = dataSource;
  }
  getTemplates(params: IQueryTemplates): Observable<IResposeGetTemplates> {
    return this.dataSource.getTemplates(params);
  }

  searchTemplates(params: IQueryTemplates, regexp: string): Observable<IResposeGetTemplates> {
    return this.dataSource.searchTemplates(params, regexp);
  }
  getTemplate(params: IQueryTemplate): Observable<ITemplate> {
    return this.dataSource.getTemplate(params);
  }
  addTemplate(data: ITemplate): Observable<ITemplate> {
    return this.dataSource.addTemplate(data);
  }
  deleteTemplate(id: string): Observable<IResponseTemplateDeleted> {
    return this.dataSource.deleteTemplate(id);
  }
  updateTemplate(id: string, data: ITemplateUpdate): Observable<ITemplate> {
    return this.dataSource.updateTemplate(id, data);
  }
}
