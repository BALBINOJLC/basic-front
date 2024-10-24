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
  const minLength = 12;
  const minLowercase = 1;
  const minUppercase = 1;
  const minNumbers = 1;
  const minSymbols = 1;
  const length = minLength; // define the desired length of the password
  const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbersCharset = '0123456789';
  const symbolsCharset = '!@#$%^&*()_+';
  let password = '';

  // Generate lowercase characters
  for (let i = 0; i < minLowercase; i++) {
    password += lowercaseCharset.charAt(Math.floor(Math.random() * lowercaseCharset.length));
  }

  // Generate uppercase characters
  for (let i = 0; i < minUppercase; i++) {
    password += uppercaseCharset.charAt(Math.floor(Math.random() * uppercaseCharset.length));
  }

  // Generate numbers
  for (let i = 0; i < minNumbers; i++) {
    password += numbersCharset.charAt(Math.floor(Math.random() * numbersCharset.length));
  }

  // Generate symbols
  for (let i = 0; i < minSymbols; i++) {
    password += symbolsCharset.charAt(Math.floor(Math.random() * symbolsCharset.length));
  }

  // Generate remaining characters
  const remainingLength = length - (minLowercase + minUppercase + minNumbers + minSymbols);
  const charset = lowercaseCharset + uppercaseCharset + numbersCharset + symbolsCharset;
  for (let i = 0; i < remainingLength; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }

  return password;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteEmptyFields = (data: object): any => {
  Object.keys(data).forEach((key) => {
    if (data[key] === '' || data[key] === null || data[key] === undefined) {
      delete data[key];
    }
  });

  return data;
};

export const generateRandomRut = (): string => {
  const randomNumber = Math.floor(Math.random() * 100000000); // Hasta 99,999,999

  const dv = calculateDv(randomNumber);

  const formattedRut = `${randomNumber}-${dv}`;

  return formattedRut;
};

function calculateDv(rutNumber: number): string {
  let M = 0,
    S = 1;
  for (; rutNumber; rutNumber = Math.floor(rutNumber / 10)) {
    S = (S + (rutNumber % 10) * (9 - (M++ % 6))) % 11;
  }
  return S ? String(S - 1) : 'k';
}
console.table([1, 2, 3, 4, 5].map(() => generateRandomRut()));
