
import { Query, RespApiGETS } from '@utils';
import { ITemplate } from './templates.interface';
import { TSortTemplate } from '../types';

export interface ITemplateFilter {
  id?: string;
}

export interface IQueryTemplates extends Query {
  filter? : ITemplateFilter;
  sort    : ISortTemplates;
}

export interface IQueryTemplate {
  filter?: ITemplateFilter;
  fields?: string;
}

export interface IRespApiTemplates extends RespApiGETS {
  data: ITemplate[];
}

export interface ITemplateUpdated {
  data        : ITemplate;
  message     : string;
}

export interface ISortTemplates {
  field: TSortTemplate;
  order: number;
}
