import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root',
})
export class HelpersService {
  constructor(private _translocoService: TranslocoService) {}

  formValidateMessages(form: FormGroup): string {
    // Obtener los campos con errores
    const fieldsWithErrors = Object.keys(form.controls).filter((key) => {
      const control = form.get(key);
      return control && control.invalid;
    });

    const errorMessages = fieldsWithErrors.map((field) => {
      const control = form.get(field);
      const errors = control.errors;
      const errorKeys = Object.keys(errors);
      const messages = errorKeys.map((errorKey) => {
        let message = '';
        switch (errorKey) {
          case 'required':
            message = this._translocoService.translate('FORMS.ERRORS.REQUIRED');
            break;
          case 'validateRut':
            message = this._translocoService.translate('FORMS.ERRORS.RUT_INVALID');
            break;
          case 'requiredTrue':
            message = this._translocoService.translate('FORMS.ERRORS.REQUIRED_TRUE');
            break;
          case 'email':
            message = this._translocoService.translate('FORMS.ERRORS.INVALID_EMAIL');
            break;
          case 'passwordConfirm':
            message = this._translocoService.translate('FORMS.ERRORS.PASSWORD_CONFIRM');
            break;
          case 'password':
            message = this._translocoService.translate('FORMS.ERRORS.PASSWORD_VALID');
            break;
          default:
            message = this._translocoService.translate('FORMS.ERRORS.UNKNOWN');
            break;
        }
        // translate Field Name
        const fieldName = this._translocoService.translate(`FORMS.FIELDS.${field.toUpperCase()}`);
        // concat field name with error message
        return `${fieldName}: ${message}`;
      });

      return messages;
    });

    // Show alert
    const message = errorMessages.join('\n');
    return message;
  }

  formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
