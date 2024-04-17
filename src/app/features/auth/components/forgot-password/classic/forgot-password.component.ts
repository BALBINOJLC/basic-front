import { Component } from '@angular/core';
import { ForgotPasswordHeaderComponent } from '../header/forgot-password-header.component';
import { FormForgotPasswordComponent } from '../form/forgot-password-form.component';

@Component({
  selector: 'app-forgot-password-classic',
  standalone: true,
  imports: [ForgotPasswordHeaderComponent, FormForgotPasswordComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPasswordClassicComponent {}
