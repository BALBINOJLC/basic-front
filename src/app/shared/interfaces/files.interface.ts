export interface IFile {
  id?          : string;
  url?         : string;
  name         : string;
  key?         : string;
  extension?   : string;
  mimetype?    : string;
  size?        : number;
  type?        : string;
  charter?     : string;
  color?       : string;
  is_public?   : boolean;
}

export interface IResponseFile {
  file: IFile;
}

export interface IResponseFiles {
  file: IFile;
}
