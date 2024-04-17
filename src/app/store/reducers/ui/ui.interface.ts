/* eslint-disable @typescript-eslint/naming-convention */
export enum LangEnum {
  ES = 'es',
  EN = 'en',
}

export interface UIState {
  isLoading: boolean;
  message: {
    message: string;
    status: number;
  } | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  platform: PlatformEnum | null;
}

export enum PlatformEnum {
  WEB = 'web',
  MOBILE = 'mobile',
}
