import { IFile, IResponseApiGets } from '@utils';

export interface IBase {
    id          : string | null;
    active      : boolean;
    name        : string;
    description : string;
    file        : IFile;
}
  
export interface IBaseUpdate extends Partial<IBase> {}

export interface IResposeGetBases extends IResponseApiGets {
    data: IBase[];
}

export interface IResponseBaseUpdated {
    data    : IBase;
    message : string;
}

export interface IResponseBaseDeleted {
  message: string;
}