import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthEventsService } from '@auth';
import { commonModules, formsModules, materialToolsModules } from '@shared';
import { FormEmailComponent } from 'app/shared/components';

@Component({
  selector: 'app-form-classic',
  standalone: true,
  templateUrl: './forgot-password-form.component.html',
  styleUrl: './forgot-password-form.component.scss',
  imports: [...commonModules, ...formsModules, ...materialToolsModules, FormEmailComponent, RouterModule],
})
export class FormForgotPasswordComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authEventsService: AuthEventsService
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  setEmail(email: string): void {
    this.form.get('email')?.setValue(email);
  }

  sendEmail(): void {
    if (this.form.valid) {
      this.authEventsService.emitForgotPasswordEvent(this.form.value);
    } else {
      console.log('Form is invalid');
      console.log(this.form);
    }
  }
}
