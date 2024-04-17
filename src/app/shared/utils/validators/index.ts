/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AbstractControl, ValidationErrors } from '@angular/forms';

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

export const validateNumber = (control: AbstractControl): ValidationErrors | null => {
  const number = control.value;
  if (number) {
    const numberRegex = /^[0-9]+(\.[0-9]+)?$/;
    if (!numberRegex.test(number)) {
      return {
        number: true,
      };
    }
  }
  return null;
};

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

export const validateEmail = (control: AbstractControl): ValidationErrors | null => {
  const email = control.value;
  if (email) {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailRegex.test(email)) {
      return {
        email: true,
      };
    }
  }
  return null;
};

export const validatePassword = (control: AbstractControl): ValidationErrors | null => {
  const password = control.value;
  if (password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return {
        password: true,
      };
    }
  }
  return null;
};

// Regular expresion validate url
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

// Regular expression to validate url and no last text /
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

// Regular expression to validate have https:// in the beginning
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

// Regular expression to validate no have http:// or https://
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

// regular expression to validate no first with http:// or https:// and last with .myshopify.com
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

// regular expression to validate no first with http:// or https:// and no last with .myshopify.com
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

// Valida Rut
export const validateRut = (control: AbstractControl): ValidationErrors | null => {
  const rutInput = control.value;
  if (rutInput) {
    const rutValid = {
      // Validates the rut with its full string "XXXXXXXX-X"
      validaRut: function (rutInput: string): boolean {
        rutInput = rutInput.replace('-', '-');
        if (!/^[0-9]+[-|-]{1}[0-9kK]{1}$/.test(rutInput)) return false;
        const tmp = rutInput.split('-');
        let digv = tmp[1];
        const rut = tmp[0];
        if (digv == 'K') digv = 'k';

        // Return true if the RUT is valid, otherwise return false
        return rutValid.dv(rut) == digv ? true : false;
      },
      dv: function (T: string | number): string | number {
        let M = 0,
          S = 1;
        //@ts-ignore
        for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
        return S ? S - 1 : 'k';
      },
    };
    if (!rutValid.validaRut(rutInput)) {
      return { validateRut: true };
    } else {
      return null;
    }
  } else {
    return null;
  }
};

// validate Password min 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character
export const validatePasswordMin = (control: AbstractControl): ValidationErrors | null => {
  const passwordValid = control.value;
  if (passwordValid) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(passwordValid)) {
      return {
        passwordValid: true,
      };
    }
  }
  return null;
};
