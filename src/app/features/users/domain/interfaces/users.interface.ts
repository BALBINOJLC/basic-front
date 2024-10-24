import { TAttachmentConcept, TAttachmentType, TStatus, TUserRoles } from '@users';
import { IFile, IResponseApiGets } from '@utils';

export interface IUser {
  id                                   :  string;
  display_name                         :  string;
  email                                :  string;
  dni                                  :  string;
  email_verify                         :  boolean;
  first_name                           :  string;
  is_active                            :  boolean;
  status                               :  TStatus;
  last_name                            :  string;
  phone                                :  string;
  phone_area                           :  string;
  address                              :  string;
  birth_date                           :  string;
  user_name                            :  string;
  is_new                               :  boolean;
  currentPassword?                     :  string;
  newPassword?                         :  string;
  reason_rejection                     :  string | null;
  Profiles?                            :  IUserProfile[];
  Avatar                               :  IUserAvatar;

}

export interface IUserUpdate extends Partial<IUser> {}

export interface IResponseGetUsers extends IResponseApiGets {
    data: IUser[];
}

export interface IResponseUserUpdated {
  data         : IUser;
  message      : string;
  access_token?: string;
}

export interface IFileGalleryUsers {
  id:string
  File: IFile;
  User: IUser;
}

export interface IResponseUserUpdated {
    data    : IUser;
    message : string;
    access_token?: string;
}

export interface IResponseUserDeleted {
  message: string;
}


export interface IUserProfile {
  id?                     :    string;
  role                    :    TUserRoles;
  active                  :    boolean;
  user_id?                :    string;

  Attachments?            :    IAttachment[];

  user                    :    IUser

  points                  :    number;

}


export interface IUserAvatar {
  file_id  ?: string;
  user_id  ?: string;
  File      : IFile;
}
export interface IAttachment {
  user_profile_id :    string;
  type            :    TAttachmentType;
  concept         :    TAttachmentConcept;
  description?    :    string;
  required        :    boolean;
  File?           :    IFile;
}
