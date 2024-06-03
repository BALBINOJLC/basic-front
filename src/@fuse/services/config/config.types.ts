// Types
export type TScheme = 'auto' | 'dark' | 'light';
export type TScreens = { [key: string]: string };
export type TTheme = 'theme-default' | string;
export type TThemes = { id: string; name: string }[];

/**
 * IAppConfig interface. Update this interface to strictly type your config
 * object.
 */
export interface FuseConfig {
  layout: string;
  scheme: TScheme;
  screens: TScreens;
  theme: TTheme;
  themes: TThemes;
}
