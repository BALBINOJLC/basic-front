import { IAuthAppState } from './store';

export const state: keyof IAuthAppState = 'user';
export const baseModule: string = 'auth';

export const routes = {
  signin: `${baseModule}/signin`,
  signup: `${baseModule}/signin`,
  resetpassword: `${baseModule}/resetpassword`,
  sendlinkpassword: `${baseModule}/sendlinkpassword`,
  // Aditionals
};

export const translate = {
  titles: 'AUTHS', // Plural title
  title: 'AUTH',
};

export const actions = 'AUTH';
