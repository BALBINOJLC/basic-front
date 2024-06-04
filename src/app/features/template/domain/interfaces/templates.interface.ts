import { IFile, IResponseApiGets } from '@utils';

export interface ITemplate {
    id          : string | null;
    active      : boolean;
    name        : string;
    description : string;
    file        : IFile;
}
  
export interface ITemplateUpdate extends Partial<ITemplate> {}

export interface IResposeGetTemplates extends IResponseApiGets {
    data: ITemplate[];
}

export interface IResponseTemplateUpdated {
    data    : ITemplate;
    message : string;
}

export interface IResponseTemplateDeleted {
  message: string;
}