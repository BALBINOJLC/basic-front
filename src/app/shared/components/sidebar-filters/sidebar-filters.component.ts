/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModules, FormsModules, MaterialToolsModules } from '@shared';
import { DateRangePickerComponent, IDateRange } from '../form/pickers/date-range-picker-/date-range-picker.component';
import moment from 'moment';

import { IUser, IUserProfile } from '@users';

import { MatSelectChange } from '@angular/material/select';
import { TFiltersSidebar } from './types';
import { FormDateRangePickerModule } from '../form/pickers/date-range-picker-/date-range-picker.module';
export interface IFilters {
  type?: string;
  filterInitDate?: string;
  filterDueDate?: string;
}

@Component({
  selector: 'sidebar-filters',
  templateUrl: './sidebar-filters.component.html',
  standalone: true,
  imports: [...FormsModules, ...CommonModules, FormDateRangePickerModule, ...MaterialToolsModules],
})
export class SidebarFiltersComponent implements OnInit {
  @ViewChild(DateRangePickerComponent) componentDateRange: DateRangePickerComponent;
  form: FormGroup;
  @Output() filterEmit = new EventEmitter<any>();
  @Input() userActive: IUser;

  @Input() filtersPickers!: boolean;
  @Input() filters!: boolean;

  constructor(private _fb: FormBuilder) {}
  max = moment().add(60, 'd').toDate();
  ngOnInit(): void {
    this.form = this._fb.group({
      treatment_user_treatment_type_id: [null],
      status: [null],
      clinic_id: [null],
      initDate: [null],
      dueDate: [null],
    });
  }

  setDateRangeChange(dateRange: IDateRange): void {
    const newDateRange = {
      initDate: dateRange.initDate?.toISOString(),
      dueDate: dateRange.dueDate?.toISOString(),
    };
    this.form.patchValue(newDateRange);

    const formValues = { ...this.form.value };
    const filteredValues = Object.keys(formValues).reduce(
      (acc, key) => {
        if (formValues[key] !== null && formValues[key] !== undefined) {
          acc[key] = formValues[key];
        }
        return acc;
      },
      {} as { [key: string]: any }
    );

    this.filterEmit.emit(filteredValues);
  }

  selectionFilter(value: MatSelectChange, typeFilters: TFiltersSidebar): void {
    const fieldMap: { [key in TFiltersSidebar]?: string } = {};

    const formControlKey = fieldMap[typeFilters];
    if (formControlKey) {
      this.form.get(formControlKey)?.patchValue(value.value);
    }

    if (typeFilters) {
      const formValues = { ...this.form.value };
      const filteredValues = Object.keys(formValues).reduce(
        (acc, key) => {
          if (formValues[key] !== null && formValues[key] !== undefined) {
            acc[key] = formValues[key];
          }
          return acc;
        },
        {} as { [key: string]: any }
      );

      console.log(filteredValues);
      this.filterEmit.emit(filteredValues);
    }
  }

  profileActive(user: IUser): IUserProfile {
    return user?.Profiles?.find((profile) => profile.active) as IUserProfile;
  }

  cleanFilters(): void {
    this.form.reset();
    this.filterEmit.emit({});
    this.componentDateRange.clearFilters();
  }
}
