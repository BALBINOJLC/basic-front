import { IUser } from '../../domain';

export const cleanUserUpdate = (user: IUser): IUser => {
  return {
    ...user,
    id: undefined,
  };
};
