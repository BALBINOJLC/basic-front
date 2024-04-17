import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { IPasswordForm } from '@auth';
import { ResetPasswordHeaderComponent } from '../header/reset-password-header.component';
import { ResetPasswordFormComponent } from '../form/reset-password-form.component';

@Component({
  selector: 'reset-password-classic',
  templateUrl: './reset-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [ResetPasswordHeaderComponent, ResetPasswordFormComponent],
})
export class ResetPasswordClassicComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  resetPassword(data: IPasswordForm): void {
    console.log(data);
  }
}
