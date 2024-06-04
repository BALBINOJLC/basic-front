/* eslint-disable @typescript-eslint/naming-convention */
import { createAction, props } from '@ngrx/store';
import { templateActions } from '../config';
import { IResposeGetTemplates, ITemplate, IQueryTemplate, IQueryTemplates, ITemplateUpdate } from '@template';


export const TemplateGets       = createAction(`[${templateActions}] GETS TEMPLATES`,   props<{ params: IQueryTemplates; }>());
export const TemplateSearch     = createAction(`[${templateActions}] SEARCH`,           props<{ params: IQueryTemplates; query: string }>());
export const TemplateLoads      = createAction(`[${templateActions}] LOADS TEMPLATES`,  props<{ data: IResposeGetTemplates }>());
export const TemplateGetScroll  = createAction(`[${templateActions}] GETS SCROLL`,      props<{ params: IQueryTemplates; }>());
export const TemplateLoadScroll = createAction(`[${templateActions}] LOADS SCROLL`,     props<{ data: IResposeGetTemplates }>());
export const TemplateGet        = createAction(`[${templateActions}] GET`,              props<{ query: IQueryTemplate }>());
export const TemplateDelete     = createAction(`[${templateActions}] DELETE`,           props<{ id: string; }>());
export const TemplateUpdate     = createAction(`[${templateActions}] UPDATE`,           props<{ id: string; item: ITemplateUpdate }>());
export const TemplateAdd        = createAction(`[${templateActions}] ADD`,              props<{ item: ITemplate; }>());
export const TemplateLoad       = createAction(`[${templateActions}] LOAD`,             props<{ item: ITemplate }>());
export const TemplateClean      = createAction(`[${templateActions}] CLEAN`);
export const TemplateCleans     = createAction(`[${templateActions}] CLEANS`);
