/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-parens */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Country } from './interfaces';
import { countries } from '@data';
import { CommonModules, FormsModules } from 'app/shared/imports';
import { TranslocoModule } from '@ngneat/transloco';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-phone[area]',
  templateUrl: './form-phone.component.html',
  standalone: true,
  imports: [
    CommonModules,
    FormsModules,
    TranslocoModule,
    MatIcon
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPhoneComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormPhoneComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormPhoneComponent implements OnInit, OnChanges, OnDestroy {
  @Input() phone: string;
  @Input() area: string;
  @Output() newArea = new EventEmitter<string>();
  @Input() showMultiArea: boolean;
  @Output() setEmail = new EventEmitter<string>();

  form: FormGroup;
  subscriptions: Subscription[];
  countries: Country[] = countries;

  constructor(private formBuilder: FormBuilder) {
    this.subscriptions = [];

    this.form = this.formBuilder.group({
      phone: ['', [Validators.required]],
      area: [''],
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe(({ phone }) => {
        this.onChange(phone);
        this.onTouched();
      })
    );
  }

  get phoneControl(): AbstractControl<any, any> {
    return this.form.controls.phone;
  }

  get value(): FormPhoneComponent {
    return this.form.value;
  }

  setArea(area: string): void {
    const areaCode = this.countries.find((country) => country.iso === area).code;

    this.area = areaCode;
    this.form.patchValue({ area: area });
    this.newArea.emit(areaCode);
  }

  set value(value: FormPhoneComponent) {
    this.form.setValue({ phone: value, area: this.countries.find((country) => country.code === this.area).iso });
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
    if (this.area) {
      this.form.patchValue({ area: this.countries.find((country) => country.code === this.area).iso });
    } else {
      this.form.patchValue({ area: this.countries[0].iso });
    }

    if (this.phone) {
      const phone = this.phone.replace(this.area, '');
      this.form.patchValue({ phone: phone });
      this.setEmail.emit(phone);
    }
  }

  ngOnChanges(): void {
    if (this.phone) {
      const phone = this.phone.replace(this.area, '');
      this.form.patchValue({ phone: phone });
      this.setEmail.emit(phone);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.form.valid ? null : { phone: { valid: false } };
  }

  /**
   * Get country info by iso code
   *
   * @param iso
   */
  getCountryByIso(iso: string): Country {
    return this.countries.find((country) => country.iso === iso);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: any): any {
    return item.id || index;
  }
}
