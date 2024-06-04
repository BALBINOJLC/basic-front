import { IBase, IBaseAppState } from 'app/features/base';

export const baseActions = 'BASES';
export const baseRouteBase = '/admin/bases';
export const translate = 'BASE';
export const iconScreen = 'feather:airplay';

export const baseKeyStore: keyof IBaseAppState = 'base' as const;

export const initialBase: IBase = {
  id: null,
  name: '',
  description: '',
  active: true,
  file: null,
};
