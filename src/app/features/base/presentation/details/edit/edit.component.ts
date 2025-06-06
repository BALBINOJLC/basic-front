/* eslint-disable linebreak-style */
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IFile, deleteEmptyFields, generateStrongPassword } from '@utils';
import { Observable, Subject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { FormComponent } from './form.component';
import { translate } from '../../config';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModules, FormsModules, MaterialToolsModules } from '@shared';
import { IBase, BaseStoreService } from '@base';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Store } from '@ngrx/store';
import { PlatformEnum, UIState, selectPlatform } from '@store';

@Component({
  selector: 'edit-details',
  templateUrl: 'edit.component.html',
  standalone: true,
  imports: [CommonModules, MaterialToolsModules, FormsModules, RouterModule, MatPaginatorModule],
})
export class EditDetailsComponent implements OnInit, OnDestroy {
  @Input({ required: true }) base: IBase;

  @Output() editModeEvent = new EventEmitter<boolean>();
  @Output() file = new EventEmitter<IFile>();
  baseActive$!: Observable<IBase>;
  platform$: Observable<PlatformEnum>;
  form: FormGroup;
  btnSave = 'BTNS.SAVE';
  transloco = translate;

  fFrom = new FormComponent(this.formBuilder);
  fStore = new BaseStoreService(this.store);
  @Input() item: IBase;
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private formBuilder: FormBuilder,
    private _fuseConfirmationService: FuseConfirmationService,
    private store: Store<{ ui: UIState }>
  ) {
    this.form = this.fFrom.form;
  }

  ngOnInit(): void {
    this.platform$ = this.store.select(selectPlatform);

    if (this.base) {
      this.form.patchValue(this.base);
    }
    if (this.base.id !== null) {
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
          this.fStore.deleteBase(this.base.id);
        }
      });
  }

  save(): void {
    let data = {
      ...this.form.value,
    };

    // Delete all fields empty or null
    data = deleteEmptyFields(data);
    if (this.base.id !== null) {
      this.fStore.updateBase(this.base.id, data);
    } else {
      data = {
        ...data,
        password: generateStrongPassword(),
      };
      this.fStore.addbase(data);
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
