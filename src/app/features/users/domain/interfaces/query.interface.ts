
import { Query, RespApiGETS } from '@utils';
import { IUser } from './users.interface';
import { TSortUser } from '../types';

export interface IUserFilter {
  id?: string;
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
  access_token: string;
  message     : string;
}

export interface ISortUsers {
  field: TSortUser;
  order: number;
}

export interface ISingUpSucces {
  user_name : string;
  email     : string;
  message   : string;
  id       : string;
  user      : IUser;
}
