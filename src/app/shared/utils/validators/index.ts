/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AbstractControl, ValidationErrors } from '@angular/forms';

// Validates if the input is a valid phone number
export const validatePhone = (control: AbstractControl): ValidationErrors | null => {
  const phone = control.value;
  if (phone) {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return {
        phone: true,
      };
    }
  }
  return null;
};

// Validates that there are no consecutive decimal points in a number
export const validateNoRepeatPoint = (control: AbstractControl): ValidationErrors | null => {
  const number = control.value;
  if (number) {
    const numberRegex = /^(?!.*\.\.).*$/;
    if (!numberRegex.test(number)) {
      return {
        number: true,
      };
    }
  }
  return null;
};

// Validates if the input is a valid URL
export const validateUrl = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;

  if (url) {
    const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates if the input is a valid URL without a trailing slash
export const validateUrlAndNoPathLast = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;
  if (url) {
    const urlRegex =
      /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates if the input is a valid URL with http:// or https:// at the beginning
export const validateUrlWithHttp = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;
  if (url) {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates that the input does not start with http:// or https://
export const validateNoHttp = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;
  if (url) {
    const urlRegex = /^(?!(http:\/\/|https:\/\/)).+$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates that the input does not start with http:// or https:// and does not end with .myshopify.com
export const validateNoHttpAndDomain = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;
  if (url) {
    const urlRegex = /^(?!(http:\/\/|https:\/\/)).+(?<!\.myshopify\.com)$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates that the input does not start with http:// or https:// and does not end with .myshopify.com
export const validateNoHttpAndNoDomain = (control: AbstractControl): ValidationErrors | null => {
  const url = control.value;
  if (url) {
    const urlRegex = /^(?!(http:\/\/|https:\/\/)).+(?<!\.myshopify\.com)$/;
    if (!urlRegex.test(url)) {
      return {
        url: true,
      };
    }
  }
  return null;
};

// Validates if the input is a valid Chilean RUT (Rol Único Tributario)
export const validateRut = (control: AbstractControl): ValidationErrors | null => {
  const rutInput = control.value;
  if (rutInput) {
    const rutValid = {
      cleanRut: function (rut: string): string {
        return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';
      },
      validateRut: function (rutInput: string): boolean {
        // Clean and format the RUT
        const cleanRut = this.cleanRut(rutInput);
        if (cleanRut.length < 2) return false;

        const dv = cleanRut.charAt(cleanRut.length - 1);
        const rutBody = cleanRut.slice(0, -1);

        // Calculate and compare the verification digit
        return this.dv(rutBody).toString() === dv.toLowerCase();
      },
      dv: function (T: string | number): string | number {
        let M = 0,
          S = 1;
        const Tstr = T.toString();
        for (let i = Tstr.length - 1; i >= 0; i--) {
          S = (S + parseInt(Tstr.charAt(i)) * (9 - (M++ % 6))) % 11;
        }
        return S ? S - 1 : 'k';
      },
    };

    // Check if the RUT is valid
    if (!rutValid.validateRut(rutInput)) {
      return { validateRut: true };
    }
  }

  // If there's no value or it's valid, return null
  return null;
};

// Validates if the input string is a valid Chilean RUT
export const validateRutString = (rutInput: string): boolean => {
  const rutValid = {
    cleanRut: function (rut: string): string {
      return typeof rut === 'string' ? rut.replace(/^0+|[^0-9kK]+/g, '').toUpperCase() : '';
    },
    validateRut: function (rutInput: string): boolean {
      // Clean and format the RUT
      const cleanRut = this.cleanRut(rutInput);
      if (cleanRut.length < 2) return false;

      const dv = cleanRut.charAt(cleanRut.length - 1);
      const rutBody = cleanRut.slice(0, -1);

      // Calculate and compare the verification digit
      return this.dv(rutBody).toString() === dv.toLowerCase();
    },
    dv: function (T: string | number): string | number {
      let M = 0,
        S = 1;
      const Tstr = T.toString();
      for (let i = Tstr.length - 1; i >= 0; i--) {
        S = (S + parseInt(Tstr.charAt(i)) * (9 - (M++ % 6))) % 11;
      }
      return S ? S - 1 : 'k';
    },
  };

  // Check if the RUT is valid and return the result
  return rutValid.validateRut(rutInput);
};

// Validates if the input is a valid email address
export const validateEmail = (email: string): boolean => {
  // Regular expression to validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Helper function to validate the password
const isPasswordValid = (password: string): boolean => {
  const minLength = 8;
  const minLowercase = 1;
  const minUppercase = 1;
  const minNumbers = 1;
  const minSymbols = 1;

  const lowercaseCharset = 'abcdefghijklmnopqrstuvwxyz';
  const uppercaseCharset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbersCharset = '0123456789';
  const symbolsCharset = '!@#$%^&*()_+{}[]|\\:;"\'<>,.?/~`';

  let lowercaseCount = 0;
  let uppercaseCount = 0;
  let numberCount = 0;
  let symbolCount = 0;

  // Check each character in the password
  for (const char of password) {
    if (lowercaseCharset.includes(char)) {
      lowercaseCount++;
    } else if (uppercaseCharset.includes(char)) {
      uppercaseCount++;
    } else if (numbersCharset.includes(char)) {
      numberCount++;
    } else if (symbolsCharset.includes(char)) {
      symbolCount++;
    }
  }

  // Validate that the password meets the requirements
  return (
    password.length >= minLength &&
    lowercaseCount >= minLowercase &&
    uppercaseCount >= minUppercase &&
    numberCount >= minNumbers &&
    symbolCount >= minSymbols
  );
};

// Validates if the input string is a valid password
export const validatePasswordString = (password: string): boolean => {
  return isPasswordValid(password);
};

// Validates if the input control value is a valid password
export const validatePasswordControl = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value;
  if (password && !isPasswordValid(password)) {
    return { password: true };
  }
  return null;
};

// Validates if the input value is greater than or equal to the minimum price
export const validateMinPrice = (minPrice: number) => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null; // Don't validate if the field is empty
    }

    // Remove currency symbol and thousand separators
    const numericValue = parseInt(value.toString().replace(/[^\d]/g, ''), 10);
    console.log(minPrice);
    console.log(numericValue);
    if (isNaN(numericValue) || numericValue < minPrice) {
      return { minPrice: { required: minPrice, actual: numericValue } };
    }

    return null;
  };
};
