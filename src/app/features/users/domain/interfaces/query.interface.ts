
import { Query, RespApiGETS } from '@utils';
import { IUser } from './users.interface';
import { ETypeEnum, TSortUser } from '../types';

export interface IUserFilter {
  id                  ?: string;
  organization_id     ?: string;
  name                ?: string;
  type                ?: ETypeEnum
}

export interface IQueryUsers extends Query {
  filter? : IUserFilter;
  sort    : ISortUsers;
}

export interface IQueryUser {
  filter?: IUserFilter;
  fields?: string;
}

export interface IRespApiUsers extends RespApiGETS {
  data: IUser[];
}

export interface IUserUpdated {
  data        : IUser;
  message     : string;
}

export interface ISortUsers {
  field: TSortUser;
  order: number;
}
