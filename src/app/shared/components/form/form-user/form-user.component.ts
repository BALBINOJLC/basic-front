/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable arrow-parens */
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, forwardRef, Input, OnChanges, OnDestroy, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslocoModule } from '@ngneat/transloco';
import { Subscription } from 'rxjs';

export interface IUserProfile {
  displayName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
}

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormUserComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FormUserComponent),
      multi: true,
    },
  ],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    TranslocoModule,
    MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormUserComponent implements OnDestroy, OnChanges {
  @Input() userProfile: IUserProfile | null;
  @Output() firstNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() LastNameChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() EmailChange: EventEmitter<string> = new EventEmitter<string>();

  form: FormGroup;
  subscriptions: Subscription[];

  get value(): FormUserComponent {
    return this.form.value;
  }

  set value(value: FormUserComponent) {
    this.form.patchValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get userFirstNameControl():AbstractControl {
    return this.form.controls['firstName'];
  }

  get userLastNameControl():AbstractControl {
    return this.form.controls['lastName'];
  }

  get userEmailControl(): AbstractControl {
    return this.form.controls['email'];
  }

  get userPhoneControl():AbstractControl {
    return this.form.controls['phone'];
  }

  constructor(private formBuilder: FormBuilder) {
    this.userProfile = null;
    this.subscriptions = [];
    this.form = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
    this.subscriptions.push(
      this.form.valueChanges.subscribe((value) => {
        this.onChange(value);
        this.onTouched();
        this.firstNameChange.emit(value.firstName);
        this.LastNameChange.emit(value.lastName);
        this.EmailChange.emit(value.email);
      })
    );
  }

  ngOnChanges():void {
    if (this.userProfile) {
      this.form.patchValue(this.userProfile);
    }
  }

  ngOnDestroy():void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
  
  //todo: anys que no pude resolver

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: any = () => { };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTouched: any = () => { };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.form.reset();
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(_: FormControl): ValidationErrors | null  {
    return this.form.valid ? null : { userName: { valid: false } };
  }
  emitForm(): void {
    const firstNameValue = this.form.get('firstName')?.value;
    const lastNameValue = this.form.get('lastName')?.value;
    const email = this.form.get('email')?.value;
    this.firstNameChange.emit(firstNameValue);
    this.LastNameChange.emit(lastNameValue);
    this.EmailChange.emit(email);
  }
}
