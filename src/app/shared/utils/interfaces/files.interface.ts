export interface IFile {
  url?: string;
  name: string;
  key?: string;
  extension?: string;
  mimetype?: string;
  size?: number;
  type?: string;
  charter?: string;
  color?: string;
}

export interface IResponseFile {
  file: IFile;
}

export interface IResponseFiles {
  file: IFile;
}
