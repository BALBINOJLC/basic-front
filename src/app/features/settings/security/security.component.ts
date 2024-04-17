import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@store';
import * as actions from '@auth';
import { FormPasswordComponent, commonModules } from '@shared';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInput } from '@angular/material/input';
import { IUserUpdate } from '@users';

@Component({
  selector: 'settings-security',
  templateUrl: './security.component.html',
  standalone: true,
  imports: [
    commonModules,
    TranslocoModule,
    MatIcon,
    MatLabel,
    MatFormField,
    FormPasswordComponent,
    ReactiveFormsModule,
    MatButtonModule,
    MatInput,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsSecurityComponent implements OnInit {
  form: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(
    private _formBuilder: UntypedFormBuilder,
    private store: Store<IAppState>
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.form = this._formBuilder.group({
      currentPassword: [''],
      newPassword: [''],
      twoStep: [true],
      askPasswordChange: [false],
    });
  }

  changePassword(): void {
    if (this.form.valid) {
      const user: IUserUpdate = this.form.value;
      const newPassword = this.form.get('newPassword').value;

      user.newPassword = newPassword.password;
      this.store.dispatch(actions.AuthChangePassword({ user }));
    }
  }
}
