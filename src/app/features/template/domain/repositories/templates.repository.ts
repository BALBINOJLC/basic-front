import { Observable } from 'rxjs';
import { IResponseTemplateDeleted, IResposeGetTemplates, ITemplate, IQueryTemplate, IQueryTemplates, ITemplateUpdate } from '../interfaces';

export abstract class TemplatesRepository {
  abstract getTemplates(params: IQueryTemplates): Observable<IResposeGetTemplates>;

  abstract searchTemplates(params: IQueryTemplates, query: string): Observable<IResposeGetTemplates>;

  abstract getTemplate(params: IQueryTemplate): Observable<ITemplate>;

  abstract addTemplate(data: ITemplate): Observable<ITemplate>;

  abstract updateTemplate(id: string, data: ITemplateUpdate): Observable<ITemplate>;

  abstract deleteTemplate(id: string): Observable<IResponseTemplateDeleted>;
}
