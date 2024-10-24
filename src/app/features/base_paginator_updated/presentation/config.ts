import { IBase, IBaseAppState } from '@bases';

export const baseActions = 'BASES';
export const baseRouteBase = '/admin/base';
export const translate = 'BASE';
export const iconScreen = 'feather:airplay';

export const baseKeyStore: keyof IBaseAppState = 'base' as const;

export const initialBase: IBase = {
  id: null,
  amount: null,
  description: null,
};
