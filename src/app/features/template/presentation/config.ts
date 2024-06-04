import { ITemplate, ITemplateAppState } from '@templates';

export const templateActions = 'TEMPLATES';
export const templateRouteBase = '/admin/templates';
export const translate = 'TEMPLATE';
export const iconScreen = 'feather:airplay';

export const templateKeyStore: keyof ITemplateAppState = 'template';

export const initialTemplate: ITemplate = {
  id: null,
  name: '',
  description: '',
  active: true,
  file: null,
};
