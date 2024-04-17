/* eslint-disable @typescript-eslint/naming-convention */
export interface Query {
  limit: number;

  offset: number;

  fields?: string;
}

export interface RespApiGETS {
  page: number;
  per_page: number;
  total_count: number;
}
