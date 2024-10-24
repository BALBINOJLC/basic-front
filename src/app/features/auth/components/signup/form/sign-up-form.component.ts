import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormEmailComponent } from 'app/shared/components';
import { FormPasswordComponent } from 'app/shared/components';
import { RouterModule } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { CommonModules, FormsModules, HelpersService, MaterialToolsModules, validateRut } from '@shared';
import { AuthEventsService } from '@auth';
import { PlatformEnum, selectPlatform, UIState } from '@store';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FuseConfirmationService } from '@fuse/services/confirmation';

@Component({
  selector: 'sign-up-form-component',
  standalone: true,
  imports: [...CommonModules, ...MaterialToolsModules, ...FormsModules, FormEmailComponent, FormPasswordComponent, RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  form: FormGroup;
  colorButton: ThemePalette = 'primary';
  platform$: Observable<PlatformEnum>;
  // eslint-disable-next-line max-params
  constructor(
    private _formBuilder: FormBuilder,
    private _authEventsService: AuthEventsService,
    private _store: Store<{ ui: UIState }>,
    private _helperService: HelpersService,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dni: ['', [Validators.required, validateRut]],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      termsConditions: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {
    this.platform$ = this._store.select(selectPlatform);
  }

  signUp(): void {
    if (this.form.invalid) {
      this.validateForms(this.form);
    }
    if (this.form.valid) {
      console.log(this.form.value);
      this._authEventsService.emitSignUpEvent(this.form.value);
    } else {
      console.log('Form is invalid');
      console.log(this.form);
    }
  }

  validateForms(form: FormGroup): void {
    form.markAllAsTouched();
    form.updateValueAndValidity();
    const messages = this._helperService.formValidateMessages(form);
    this.showAlertError(messages);
  }

  showAlertError(messages: string): void {
    this._fuseConfirmationService.open({
      actions: {
        cancel: { show: false },
        confirm: { show: true, label: 'BTNS.OK', color: 'primary' },
      },
      icon: {
        show: true,
        color: 'error',
      },
      message: messages,
      title: 'FORMS.ERRORS.TITLE',
    });
  }

  setEmail(email: string): void {
    this.form.get('email')?.setValue(email);
  }

  setPassword(password: string): void {
    this.form.get('password')?.setValue(password);
  }
}
