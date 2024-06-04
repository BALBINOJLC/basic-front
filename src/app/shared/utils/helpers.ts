import { IDataAutoComplete } from '../components/form/interfaces';
import { Country } from '../components/form/form-phone/interfaces';
export const setQueryParams = (params: any): URLSearchParams => {
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
