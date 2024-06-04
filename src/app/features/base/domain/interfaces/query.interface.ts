
import { Query, RespApiGETS } from '@utils';
import { IBase } from './bases.interface';
import { TSortBase } from '../types';

export interface IBaseFilter {
  id?: string;
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
