import { Query, RespApiGETS } from '@utils';

export interface INewsLetterEntity {
  _id?: string;
  email: string;
}

export interface INewsLetterFilter {
  _id?: string;
  email?: string;
}

export interface IQueryNewsLetters extends Query {
  filter?: INewsLetterFilter;
  sort: ISortNewsLetters;
}

export interface IQueryNewsLetter {
  filter?: INewsLetterFilter;
  fields?: string;
}

export interface IRespApiNewsLetters extends RespApiGETS {
  data: INewsLetterEntity[];
}

export interface INewsLetterUpdated {
  data: INewsLetterEntity;
  message: string;
}

export interface ISortNewsLetters {
  field: 'email';
  order: number;
}
