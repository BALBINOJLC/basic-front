/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import moment from 'moment';

@Component({
  selector: 'app-datetime-picker',
  templateUrl: './datetime-picker.component.html',
})
export class DatetimePickerComponent {
  @ViewChild('picker') picker: any;
  @Input() minDate: moment.Moment;
  @Input() maxDate: moment.Moment;
  @Input() date: moment.Moment;
  @Input() disabled = false;
  @Input() showSpinners = true;
  @Input() showSeconds = false;
  @Input() stepHour = 1;
  @Input() stepMinute = 1;
  @Input() stepSecond = 1;
  @Input() touchUi = false;
  @Input() color: ThemePalette = 'primary';
  @Input() dateControl = new FormControl(new Date());
  @Output() dateTime = new EventEmitter<any>();
  constructor() {
    moment.locale('es');
  }

  getData(): void {
    if (this.dateControl.invalid) {
      return;
    }
    const dateTime = moment(this.dateControl.value).toDate();
    this.dateTime.emit({ dateTime });
  }
}
