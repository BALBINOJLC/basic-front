import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormEmailComponent } from 'app/shared/components';
import { FormPasswordComponent } from 'app/shared/components';
import { RouterModule } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import { CommonModules, FormsModules, MaterialToolsModules } from '@shared';
import { AuthEventsService } from '@auth';

@Component({
  selector: 'sign-up-form-component',
  standalone: true,
  imports: [...CommonModules, ...MaterialToolsModules, ...FormsModules, FormEmailComponent, FormPasswordComponent, RouterModule],
  templateUrl: './sign-up-form.component.html',
  styleUrl: './sign-up-form.component.scss',
})
export class SignUpFormComponent {
  form: FormGroup;
  colorButton: ThemePalette = 'primary';

  constructor(
    private _formBuilder: FormBuilder,
    private authEventsService: AuthEventsService
  ) {
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      termsConditions: [false],
    });
  }

  ngOnInit(): void {}

  signUp(): void {
    if (this.form.valid) {
      this.authEventsService.emitSignUpEvent(this.form.value);
    } else {
      console.log('Form is invalid');
      console.log(this.form);
    }
  }

  setEmail(email: string): void {
    this.form.get('email')?.setValue(email);
  }

  setPassword(password: string): void {
    this.form.get('password')?.setValue(password);
  }
}
