
import { Query, RespApiGETS } from '@utils';
import { IBase } from './bases.interface';
import { ETypeEnum, TSortBase } from '../types';

export interface IBaseFilter {
  id                  ?: string;
  organization_id     ?: string;
  name                ?: string;
  type                ?: ETypeEnum
}

export interface IQueryBases extends Query {
  filter? : IBaseFilter;
  sort    : ISortBases;
}

export interface IQueryBase {
  filter?: IBaseFilter;
  fields?: string;
}

export interface IRespApiBases extends RespApiGETS {
  data: IBase[];
}

export interface IBaseUpdated {
  data        : IBase;
  message     : string;
}

export interface ISortBases {
  field: TSortBase;
  order: number;
}
