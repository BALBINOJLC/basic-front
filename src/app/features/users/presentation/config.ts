import { IUser, IUserAppState, TUserRoles } from '@users';

export const userActions = 'USERS';
export const userRouteBase = '/admin/users';
export const translate = 'USER';
export const iconScreen = 'feather:user-plus';

export const userKeyStore: keyof IUserAppState = 'users';

export const initialUser: IUser = {
  id: null,
  first_name: '',
  last_name: '',
  email: '',
  Profiles: [],
  email_verify: false,
  active: false,
  Avatar: {
    url: '',
    name: '',
    size: 0,
    type: '',
  },
};

export const roles: TUserRoles[] = ['ADMIN', 'USER'];
