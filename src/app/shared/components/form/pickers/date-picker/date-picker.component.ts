/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, EventEmitter, Input, OnChanges, Output, ViewChild, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import * as moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
})
export class DatePickerComponent implements OnChanges, OnInit {
  @ViewChild('picker') picker: any;
  @Input() minDate: moment.Moment | null;
  @Input() availableDates: string[];
  filter: any;
  @Input() label: string;
  @Input() showLabel: boolean;
  @Input() reset: boolean;
  @Input() maxDate: moment.Moment;
  @Input() date: string;
  @Input() disabled = false;
  @Input() touchUi = false;
  @Input() color: ThemePalette = 'primary';

  selected: Date | null;

  @Input() dateControl = new FormControl();
  @Output() datePicker = new EventEmitter<any>();

  constructor() {
    moment.locale('es');
  }

  ngOnInit(): void {
    this.createFilter();
  }

  ngOnChanges(): void {
    this.createFilter();
  }

  getData(): void {
    const date = moment(this.dateControl.value).format('DD-MM-YYYY');
    this.datePicker.emit(date);
  }

  onSelectDate(): void {
    if (this.selected) {
      const selectedDateString: string = moment(this.selected).format('YYYY-MM-DD');
      this.datePicker.emit(selectedDateString);
    }
  }

  createFilter(): void {
    const minDate = this.minDate ? moment(this.minDate).startOf('day') : null;
    this.filter = (date: Date | null): boolean => {
      return !minDate || moment(date).startOf('day').isSameOrAfter(minDate);
    };
    if (this.date) {
      this.dateControl.setValue(moment(this.date));
    }
  }
}
