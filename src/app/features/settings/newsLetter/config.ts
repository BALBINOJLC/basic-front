import { NewsLetterAppState } from './store';

export const newsLetterBaseModule: keyof NewsLetterAppState = 'newsLetter';
export const routes = {
  gets: `${newsLetterBaseModule}`,
  get: `${newsLetterBaseModule}`,
  add: `${newsLetterBaseModule}`,
  put: `${newsLetterBaseModule}`,
  delete: `${newsLetterBaseModule}`,
  search: `${newsLetterBaseModule}/search`,
  // Aditionals
};

export const translate = 'NEWSLETTER';
export const actions = 'NEWSLETTER';
export const iconScreen = 'feather:framer';
