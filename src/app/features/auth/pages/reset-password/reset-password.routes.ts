import { Routes } from '@angular/router';
import { AuthResetPasswordComponent } from './reset-password.page';

export default [
  {
    path: ':token',
    component: AuthResetPasswordComponent,
  },
] as Routes;
