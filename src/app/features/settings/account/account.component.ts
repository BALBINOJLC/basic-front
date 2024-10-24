import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '@store';
import { IUser, IUserAvatar, IUserUpdate } from '@users';
import { Observable, Subject, takeUntil } from 'rxjs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { IFile, deleteEmptyFields, filterCountries } from '@utils';
import { IDataAutoComplete } from '../../../shared/components/form/interfaces/index';
import { countries } from '@data';
import { FormEmailComponent, CommonModules } from '@shared';
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
    CommonModules,
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

  fStoreU = new UserStoreService(this._store);
  fStoreA = new AuthStoreService(this._store);

  private unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _formBuilder: UntypedFormBuilder,
    private _store: Store<IAppState>,
    private _fuseConfirmationService: FuseConfirmationService
  ) {
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      phone: [''],
      dni: [''],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    this.user$ = this.fStoreA.seeUser();
    this.user$.pipe(takeUntil(this.unsubscribeAll)).subscribe((user) => {
      if (user) {
        // Create copy of object because the user is read-only
        console.log('user', user);

        let copyUser: IUser = { ...user };
        copyUser = deleteEmptyFields(copyUser);

        if (copyUser.phone_area && copyUser.phone) {
          this.area = copyUser.phone_area;
          copyUser.phone = copyUser.phone.replace(copyUser.phone_area, '');
        }
        console.log('copyUser', copyUser);

        this.form.patchValue(copyUser);
      }
    });
  }

  cancel(): void {
    this.form.reset();
  }

  setNewArea(area: string): void {
    this.area = area;
  }

  update(userId: string): void {
    if (this.form.valid) {
      const data = {
        ...this.form.value,
        phone: `${this.area}${this.form.value.phone}`,
        phone_area: this.area,
      };
      // delete empty, null or undefined values
      const dataClean = deleteEmptyFields(data);
      this.fStoreU.updateUser(userId, dataClean);
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
      const avatar: IUserAvatar = {
        File: file,
      };
      const item: IUserUpdate = {
        Avatar: avatar,
      };
      this.fStoreU.updateUser(userId, item);
    }
  }
}
