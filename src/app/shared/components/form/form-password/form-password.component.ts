/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModules, FormsModules, validatePasswordControl } from '@shared';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormPasswordComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormPasswordComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...CommonModules, ...FormsModules, MatIconModule],
})
export class FormPasswordComponent implements OnInit, OnDestroy, OnChanges {
  @Input() showConfirm: boolean;
  @Input() password: string = '';
  @Input() labelPassword = 'AUTH.SIGN_UP.PASSWORD';
  @Output() setPassword = new EventEmitter<string>();
  @Input() colSpan = 2;
  form: FormGroup;
  subscriptions: Subscription[];

  constructor(private _formBuilder: FormBuilder) {
    this.showConfirm = false;
    this.subscriptions = [];
    this.form = this._formBuilder.group({
      password: ['', Validators.compose([Validators.required, validatePasswordControl])],
      passwordConfirm: [''],
    });

    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }
  get passwordControl(): AbstractControl<any, any> {
    return this.form.controls['password'];
  }

  get passwordConfirm(): AbstractControl<any, any> {
    return this.form.controls['passwordConfirm'];
  }
  get value(): FormPasswordComponent {
    return this.form.value;
  }

  set value(value: FormPasswordComponent) {
    this.form.setValue({ password: value, passwordConfirm: value });
    this.onChange(value);
    this.onTouched();
  }

  ngOnInit(): void {
    if (this.showConfirm) {
      this.form.controls['passwordConfirm'].setValidators([
        Validators.required,
        this.noEqual().bind(this), // Aquí se usa .bind(this) para asegurar el contexto correcto de `this`
      ]);
      this.form.controls['passwordConfirm'].updateValueAndValidity(); // Actualiza la validez del control
    }
    if (this.password) {
      this.form.patchValue({ password: this.password });
      this.setPassword.emit(this.password);
    }
  }

  currentIcon = 'faeye';
  toggleIcon(): void {
    this.currentIcon = this.currentIcon === 'this.ficons.faeye' ? 'this.ficons.faeyeLowVision' : 'this.ficons.faeye';
  }

  ngOnChanges(): void {
    if (this.password) {
      this.form.patchValue({ password: this.password });
      this.setPassword.emit(this.password);
    }
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
    return this.form.valid ? null : { password: { valid: false }, passwordConfirm: { valid: false } };
  }

  noEqual(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!this.form) return null; // Asegúrate de que `this.form` está definido
      const password = this.form.get('password')?.value;
      if (control.value !== password) {
        // Devuelve el objeto de error si la validación falla
        return { noIgual: true };
      } else {
        // Devuelve `null` si la validación es exitosa
        return null;
      }
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
  }
}
