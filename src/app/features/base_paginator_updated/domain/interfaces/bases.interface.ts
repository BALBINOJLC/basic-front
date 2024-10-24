import { IFile, IResponseApiGets } from '@utils';

export interface IBase {
    id         ?: string | null;
    amount        : number;
    description   : string;

}

export interface IBaseUpdate extends Partial<IBase> {}

export interface IResponseGetBases extends IResponseApiGets {
    data: IBase[];
}

export interface IFileGalleryBases {
  id:string
  File: IFile;
  Base: IBase;
}

export interface IResponseBaseUpdated {
    data    : IBase;
    message : string;
}

export interface IResponseBaseDeleted {
  message: string;
}


