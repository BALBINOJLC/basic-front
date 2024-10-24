/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { translate } from '../../config';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModules, FormsModules, MaterialToolsModules } from '@shared';
import { IUser, UserStoreService } from '@users';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Store } from '@ngrx/store';
import { PlatformEnum, UIState, selectPlatform } from '@store';
import { FuseCardComponent } from '@fuse/components/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'edit-details',
  templateUrl: 'edit.component.html',
  styleUrl: './edit.component.scss',
  standalone: true,
  imports: [
    ...CommonModules,
    ...MaterialToolsModules,
    ...FormsModules,
    RouterModule,
    MatPaginatorModule,
    FuseCardComponent,
    MatAutocompleteModule,
  ],
})
export class EditDetailsComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) user: IUser;
  @Input() userActive: IUser;
  @Input() item: IUser;
  @Output() editModeEvent = new EventEmitter<boolean>();

  fbUsersSimples: FormControl = new FormControl([]);
  simples: FormControl = new FormControl();
  userActive$!: Observable<IUser>;
  platform$: Observable<PlatformEnum>;

  form: FormGroup;
  btnSave = 'BTNS.SAVE';
  transloco = translate;

  fFrom = new FormComponent(this.formBuilder);
  fStore = new UserStoreService(this.store);

  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private store: Store<{ ui: UIState }>,
    private _router: Router
  ) {
    this.form = this.fFrom.form;
  }

  ngOnChanges(): void {
    this.platform$ = this.store.select(selectPlatform);
    if (this.user) {
      this.form.patchValue(this.user);
    }
  }

  deleteD(): void {
    const title = 'MS.DELETE_CONFIRM';
    const message = 'MS.DELETE_INFO';
    const confirm = 'BTNS.YES';

    this._fuseConfirmationService
      .open({
        actions: {
          cancel: { show: true },
          confirm: { show: true, label: confirm, color: 'primary' },
        },
        icon: {
          show: true,
          color: 'warning',
        },
        message,
        title,
      })
      .afterClosed()
      .subscribe((d) => {
        if (d === 'confirmed') {
          this.fStore.deleteUser(this.user.id);
        }
      });
  }

  save(): void {
    let data: IUser = {
      ...this.form.value,
    };
    data = this.validateForms(data);

    if (!data) {
      return;
    }

    Object.keys(data).forEach(
      (key) => (data[key] == null || data[key] == '' || (Array.isArray(data[key]) && data[key].length == 0)) && delete data[key]
    );

    if (this.user.id !== null) {
      this.fStore.updateUser(this.user.id, data);
    } else {
      this.fStore.addUser(data);
    }
  }

  cancel(editMode: boolean): void {
    if (this.user.id !== null) {
      this.editModeEvent.emit(editMode);
    } else {
      this._router.navigate(['/']);
    }
  }

  validateForms(data: IUser): IUser | any {
    if (data.first_name == null) {
      return this.showAlertError('USER.ALERTS.FORMS.USER_REQUIRED_AMOUNT');
    }
    return data;
  }

  showAlertError(message: string): void {
    this._fuseConfirmationService.open({
      actions: {
        cancel: { show: true, label: 'USER.ALERTS.FORMS.CLOSE' },
        confirm: { show: false, label: 'USER.ALERTS.FORMS.CLOSE', color: 'warn' },
      },
      icon: {
        show: true,
        name: 'heroicons_solid:exclamation-circle',
        color: 'warn',
      },
      message,
      title: 'error',
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
