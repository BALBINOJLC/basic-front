export interface IApiError {
  message: string;
  statusCode: number;
  module: string;
  innerError?: Error;
}

export interface IHttpError {
  error: IApiError;
  status: number;
}
