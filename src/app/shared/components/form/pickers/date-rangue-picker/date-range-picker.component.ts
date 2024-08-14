import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import moment from 'moment';

@Component({
  selector: 'date-range-picker',
  templateUrl: 'date-range-picker.component.html',
})
export class DateRangePickerComponent {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  @Output() dateRange = new EventEmitter<{ initDate: Date; dueDate: Date }>();
  @Input() max = moment().add(1, 'd').toDate();
  @Input() min = moment().subtract(1, 'd').toDate();
  @Input() label: string = 'FORMS.FIELDS.DATE_RANGE';
  form: FormGroup;
  today = moment().add(1, 'd').toDate();
  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      initDate: ['', Validators.compose([Validators.required])],
      dueDate: ['', Validators.compose([Validators.required])],
    });
    moment.locale('es');
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
}
