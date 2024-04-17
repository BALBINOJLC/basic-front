import { IFile, IResponseApiGets } from '@utils';
import { UserRolesType, UserTypesType } from '../types';

export interface IUser {
    _id             : string | null;
    email_verify    : boolean;
    is_active       : boolean;
    display_name?   : string;
    email           : string;
    first_name      : string;
    last_name       : string;
    phone?          : string;
    role            : UserRolesType;
    type            : UserTypesType;
    photo_url       : IFile;
    access_token?   : string;
    userOrg?        : IUser;
    currentPassword?: string;
    newPassword?    : string;
}
  
export interface IUserUpdate extends Partial<IUser> {}

export interface IResposeGetUsers extends IResponseApiGets {
    data: IUser[];
}

export interface IResponseUserUpdated {
    data    : IUser;
    message : string;
}

export interface IResponseUserDeleted {
  message: string;
}