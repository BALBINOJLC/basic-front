import { IUser} from '@users';
import { TSocialNetwork } from './auth.types';

export interface IPasswordForm {
    password        : string;
    passwordConfirm?: string;
}

export interface ISignInForm {
    email       : string;
    password    : IPasswordForm;
    rememberme  : string;
}

export interface ISignUpForm {
    email           : string;
    last_name       : string;
    first_name      : string;
    password        : IPasswordForm;
    passwordConfirm : string;
    policy          : boolean;
    organization?   : string;
}

export interface IAuthSignUpOptions {
    user        : IAuthSignUp;
    invited?    : boolean;
    sendEmail?  : boolean;
}

export interface IAuthSignUp {
    email       : string;
    password    : string;
    last_name   : string;
    first_name  : string;
    network?    : TSocialNetwork;
    org?        : string;
    socialToken?: string;
}

export interface IAuthSignIn {
    email       : string;
    password    : string;
    network?    : TSocialNetwork;
    socialToken?: string;
}

export interface IAuthSignUp {
    email       : string;
    password    : string;
    last_name   : string;
    first_name  : string;
    network?    : TSocialNetwork;
    socialToken?: string;
}

export interface ILoadUser {
    token   : string;
    message?: string;
    user    : IUser;
}

export interface ISingInSuccess {
    access_token    : string;
    message         : string;
    user            : IUser;
}

export interface IResponseMessage {
    message : string;
}

export interface ISingUpSucces {
    _id             : string;
    access_token?   : string;
    email           : string;
    message?        : string;
    role?           : string;
    type?           : string;
    user            : IUser;
    user_name       : string;
}