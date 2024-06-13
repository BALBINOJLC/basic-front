import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { AuthEventsService } from '@auth';
import { FormPasswordComponent, CommonModules, FormsModules } from '@shared';

@Component({
  selector: 'reset-password-form-component',
  templateUrl: 'reset-password-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [...CommonModules, FormsModules, MatButtonModule, FormPasswordComponent, RouterModule],
})
export class ResetPasswordFormComponent implements OnInit {
  form: FormGroup;
  rememberme = false;
  constructor(
    private _formBuilder: FormBuilder,
    private authEventsService: AuthEventsService
  ) {
    this.form = this._formBuilder.group({
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  setPassword(password: string): void {
    console.log('password', password);

    this.form.patchValue({ password });
  }

  signIn(): void {
    if (this.form.valid) {
      this.authEventsService.emitResetPasswordEvent(this.form.value);
    } else {
      this.showAlert();
    }
  }

  showAlert(): void {
    console.log(this.form.value);
  }
}
