/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';
export interface IDateRange {
  initDate: Date;
  dueDate: Date;
}
@Component({
  selector: 'form-date-range-picker',
  templateUrl: 'date-range-picker.component.html',
})
export class DateRangePickerComponent implements OnInit {
  @Output() dateRange = new EventEmitter<any>();
  @Input() range: IDateRange;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() label: string;

  @Input() init_date: string;
  @Input() due_date: string;
  form: FormGroup;
  @Input() max = moment().add(1, 'd').toDate();
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      initDate: ['', Validators.compose([Validators.required])],
      dueDate: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    if (this.init_date || this.due_date) {
      this.setNewDateRange();
    }
  }

  setNewDateRange(): void {
    const newInitDate = moment(this.init_date).add(1, 'day').toDate();
    const newDueDate = moment(this.due_date).add(1, 'day').toDate();

    this.form.setValue({
      initDate: newInitDate || '',
      dueDate: newDueDate || '',
    });
    const initDate = moment(this.form.get('initDate').value).toDate();
    const dueDate = moment(this.form.get('dueDate').value).toDate();
    this.dateRange.emit({ initDate, dueDate });
  }

  getData(): void {
    if (this.form.invalid) {
      return;
    }
    const initDate = moment(this.form.get('initDate').value).toDate();
    const dueDate = moment(this.form.get('dueDate').value).toDate();
    this.dateRange.emit({ initDate, dueDate });
  }

  clearFilters(): void {
    this.form.reset();
  }

  setValue(initDate: string, dueDate: string): void {
    console.log(initDate, dueDate);
  }
}
