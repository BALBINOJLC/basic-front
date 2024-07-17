import { IFile, IResponseApiGets } from '@utils';
import { TUserRoles } from '../types';

export interface IUser {
    id              : string | null;
    email_verify    : boolean;
    is_active       : boolean;
    display_name?   : string;
    email           : string;
    first_name      : string;
    last_name       : string;
    dni?            : string;
    phone?          : string;
    phone_area?     : string;
    Avatar          : IFile;
    Profiles        : IUserProfile[];
    userOrg?        : IUser;
    currentPassword?: string;
    newPassword?    : string;
}
  
export interface IUserUpdate extends Partial<IUser> {}

export interface IResposeGetUsers extends IResponseApiGets {
    data: IUser[];
}

export interface IResponseUserUpdated {
    data         : IUser;
    message      : string;
    access_token?: string;
}

export interface IResponseUserDeleted {
  message: string;
}

export interface IUserProfile {
    id    : string;
    role  : TUserRoles;
    active: boolean;
}