/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-parens */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { commonModules, formsModules } from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormEmailComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormEmailComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  standalone: true,
  imports: [...commonModules, ...formsModules, MatIconModule],
})
export class FormEmailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() email: string = '';
  @Input() placeHolder: string = 'Email';
  @Input() colorLabel: string;
  @Input() showLabel: boolean;
  @Input() showIcon: boolean;
  @Output() setEmail = new EventEmitter<string>();
  form: FormGroup;
  subscriptions: Subscription[];

  constructor(private formBuilder: FormBuilder) {
    this.subscriptions = [];
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
    this.colorLabel = 'text-secondary';
    this.subscriptions.push(
      this.form.valueChanges.subscribe(({ email }) => {
        this.onChange(email);
        this.onTouched();
      })
    );

    this.showIcon = true;
    this.showLabel = true;
  }

  get emailControl(): AbstractControl<any, any> {
    return this.form.controls['email'];
  }

  get value(): FormEmailComponent {
    return this.form.value;
  }

  set value(value: FormEmailComponent) {
    this.form.setValue({ email: value });
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
    if (this.email) {
      this.form.patchValue({ email: this.email });
      this.setEmail.emit(this.email);
    }
  }

  ngOnChanges(): void {
    if (this.email) {
      this.form.patchValue({ email: this.email });
      this.setEmail.emit(this.email);
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
    return this.form.valid ? null : { email: { valid: false } };
  }
}
