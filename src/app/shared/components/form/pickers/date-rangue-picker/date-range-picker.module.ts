import { NgModule } from '@angular/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateRangePickerComponent } from './date-range-picker.component';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModules, FormsModules } from '@shared';

@NgModule({
  declarations: [DateRangePickerComponent],
  imports: [CommonModules, FormsModules, MatDatepickerModule, MatMomentDateModule, TranslocoModule],
  exports: [DateRangePickerComponent],
  providers: [
    MatDatepickerModule,
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: 'LL',
        },
        display: {
          dateInput: 'LL',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
      },
    },
  ],
})
export class FormDateRangeModule {}
