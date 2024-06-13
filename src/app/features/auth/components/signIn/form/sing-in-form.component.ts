import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthEventsService } from '@auth';
import { AuthService } from '@core';
import { CommonModules, FormsModules, MaterialToolsModules } from '@shared';
import { FormEmailComponent } from 'app/shared/components';
import { FormPasswordComponent } from 'app/shared/components';

@Component({
  selector: 'app-form-classic',
  standalone: true,
  templateUrl: './sing-in-form.component.html',
  styleUrl: './sing-in-form.component.scss',
  imports: [...CommonModules, ...FormsModules, ...MaterialToolsModules, FormEmailComponent, FormPasswordComponent, RouterModule],
})
export class FormComponent implements OnInit {
  rememberme = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authEventsService: AuthEventsService,
    public _authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {}

  signIn(): void {
    if (this.form.valid) {
      this.authEventsService.emitSignInEvent(this.form.value);
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
