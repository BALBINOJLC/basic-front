// Types

import { Layout } from 'app/layout/layouts/layout.types';

export type Scheme = 'auto' | 'dark' | 'light';
export type Screens = { [key: string]: string };
export type Theme = 'theme-default' | string;
export type Themes = { id: string; name: string }[];

export interface IAppConfig {
  layout: Layout;
  scheme: Scheme;
  screens: Screens;
  theme: Theme;
  themes: Themes;
  options: {
    showNotifications: boolean;
    showQuickChat: boolean;
    showShortcuts: boolean;
    showLanguage: boolean;
    showSearch: boolean;
    showMessages: boolean;
    showSettings: boolean;
    showFullScreen: boolean;
  };
  copyRight: string;
  logo: string;
  logoTextOnDark: string;
  logoTextOnLight: string;
  bgColorDark: string;
}

/**
 * Default configuration for the entire application. This object is used by
 * FuseConfigService to set the default configuration.
 *
 * If you need to store global configuration for your app, you can use this
 * object to set the defaults. To access, update and reset the config, use
 * FuseConfigService and its methods.
 *
 * "Screens" are carried over to the BreakpointObserver for accessing them within
 * components, and they are required.
 *
 * #18191e cambiar por #18191e
 *
 * "Themes" are required for Tailwind to generate themes.
 */

export const appThemeConfig: IAppConfig = {
  layout: 'compact',
  scheme: 'dark',
  screens: {
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1440px',
  },
  theme: 'theme-brand',
  themes: [
    {
      id: 'theme-default',
      name: 'Default',
    },
    {
      id: 'theme-brand',
      name: 'Brand',
    },
    {
      id: 'theme-teal',
      name: 'Teal',
    },
    {
      id: 'theme-rose',
      name: 'Rose',
    },
    {
      id: 'theme-purple',
      name: 'Purple',
    },
    {
      id: 'theme-amber',
      name: 'Amber',
    },
  ],
  options: {
    showNotifications: false,
    showQuickChat: false,
    showShortcuts: false,
    showLanguage: false,
    showSearch: false,
    showMessages: false,
    showSettings: true,
    showFullScreen: false,
  },

  copyRight: 'SICRUX | Todos los derechos reservados.',
  logo: 'assets/images/logo/logo.svg',
  logoTextOnDark: 'assets/images/logo/logo-text.png',
  logoTextOnLight: 'assets/images/logo/logo-text.png',
  bgColorDark: '#190a11',
};
