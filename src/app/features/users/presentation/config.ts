import { IUser, IUserAppState } from '@users';

export const userActions = 'USERS';
export const userRouteUser = '/admin/user';
export const translate = 'USER';
export const iconScreen = 'feather:airplay';

export const userKeyStore: keyof IUserAppState = 'users' as const;

export const initialUser: IUser = {
  id: null,
  display_name: '',
  email: '',
  dni: '',
  email_verify: false,
  first_name: '',
  is_active: false,
  status: undefined,
  last_name: '',
  phone: '',
  phone_area: '',
  address: '',
  birth_date: '',
  user_name: '',
  is_new: false,
  reason_rejection: '',
  Avatar: undefined,
};
