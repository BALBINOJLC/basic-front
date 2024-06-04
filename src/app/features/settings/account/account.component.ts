import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@store';
import { IUser, IUserUpdate } from '@users';
import { Observable, Subject } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IFile, filterCountries } from '@utils';
import { IDataAutoComplete } from '../../../shared/components/form/interfaces/index';
import { countries } from '@data';
import { FormEmailComponent, commonModules } from '@shared';
import { TranslocoModule } from '@ngneat/transloco';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { FormPhoneComponent } from 'app/shared/components/form/form-phone';
import { MatInputModule } from '@angular/material/input';
import { UserStoreService } from '@users';
import { AuthStoreService } from '@auth';

@Component({
  selector: 'settings-account',
  templateUrl: './account.component.html',
  standalone: true,
  imports: [
    commonModules,
    ReactiveFormsModule,
    TranslocoModule,
    MatButton,
    MatFormField,
    MatIcon,
    MatInputModule,
    MatIcon,
    MatLabel,
    MatError,
    FormPhoneComponent,
    FormEmailComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsAccountComponent implements OnInit {
  user$: Observable<IUser>;
  form: UntypedFormGroup;
  area = '+56';
  countries: IDataAutoComplete[] = filterCountries(countries);

  fStoreU = new UserStoreService(this.store);
  fStoreA = new AuthStoreService(this.store);

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private store: Store<IAppState>,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      dni: [''],
      two_auth: [false],
      country: ['', []],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.user$ = this.fStoreA.seeUser();
  }

  cancel(): void {
    this.form.reset();
  }

  setNewArea(area: string): void {
    this.area = area;
  }

  setCountry(data): void {
    this.form.patchValue({ country: data.name });
  }

  update(userId: string): void {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        phone: `${this.area}${this.form.value.phone}`,
        address: {
          address1: this.form.value.address1,
          address2: this.form.value.address2,
          userId,
        },
      };
      this.fStoreU.updateUser(userId, data);
    } else {
      this._fuseConfirmationService.open({
        actions: {
          cancel: { show: false },
          confirm: { show: true, label: 'BTNS.OK', color: 'primary' },
        },
        message: 'USER.PROFILE.FORM_INVALID_MESSAGE',
        title: 'USER.PROFILE.FORM_INVALID_TITLE',
      });
    }
  }

  changeImgProfile(file: IFile, userId: string): void {
    if (file) {
      const item: IUserUpdate = {
        avatar: file,
      };
      this.fStoreU.updateUser(userId, item);
    }
  }
}
