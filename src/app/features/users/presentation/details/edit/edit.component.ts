import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFile } from '@utils';
import { Observable, Subject } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { roles, translate } from '../../config';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormUserComponent } from 'app/shared/components/form/form-user/form-user.component';
import { commonModules, formsModules, materialToolsModules } from '@shared';
import { IUser, UserStoreService } from '@users';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Store } from '@ngrx/store';
import { PlatformEnum, selectPlatform } from '@store';

@Component({
  selector: 'edit-details',
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [...commonModules, ...materialToolsModules, ...formsModules, RouterModule, MatPaginatorModule, FormUserComponent],
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user: IUser;

  @Output() editModeEvent = new EventEmitter<boolean>();
  @Output() file = new EventEmitter<IFile>();

  userActive$!: Observable<IUser>;
  platform$: Observable<PlatformEnum>;

  form: FormGroup;
  btnSave = 'BTNS.SAVE';

  roles = roles;
  area = '+56';
  transloco = translate;

  fFrom = new FormComponent(this.formBuilder);
  fStore = new UserStoreService(this.store);

  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private _router: Router,
    private _fuseConfirmationService: FuseConfirmationService,
    private store: Store
  ) {
    this.form = this.fFrom.form;
  }

  ngOnInit(): void {
    this.platform$ = this.store.select(selectPlatform);

    if (this.user) {
      this.form.patchValue(this.user);
    }
    if (this.user._id !== null) {
      this.btnSave = 'BTNS.UPDATE';
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
          this.fStore.deleteUser(this.user._id, 'user');
        }
      });
  }

  save(): void {
    const data = {
      ...this.form.value,
      password: new Date().getTime().toString(),
    };

    if (this.user._id !== null) {
      this.fStore.updateUser(this.user._id, data);
    } else {
      this.fStore.adduser(data, 'user');
    }

    this.editModeEvent.emit(false);
  }

  cancel(editMode: boolean): void {
    this.editModeEvent.emit(editMode);
  }

  sendFile(file: IFile): void {
    this.file.emit(file);
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
