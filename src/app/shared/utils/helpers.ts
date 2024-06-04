import { IDataAutoComplete } from '../components/form/interfaces';
import { Country } from '../components/form/form-phone/interfaces';
export const setQueryParams = (params: object): URLSearchParams => {
  const queryParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    queryParams.set(key, params[key]);
  });
  return queryParams;
};

export const filterCountries = (countries: Country[]): IDataAutoComplete[] => {
  const usersFiltered: IDataAutoComplete[] = [];
  if (Array.isArray(countries) && countries.length) {
    countries.map((country) => {
      const name = country.name;
      const id = country.id;
      const image = country.flagImagePos;

      usersFiltered.push({
        image,
        id: id,
        name,
      });
    });
  }

  return usersFiltered;
};

export const generateStrongPassword = (): string => {
  const length = 10; // define the desired length of the password
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+'; // define the characters allowed in the password
  let password = '';
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  return password;
};
