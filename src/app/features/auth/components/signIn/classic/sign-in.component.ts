import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SignInHeaderComponent } from '../header/sign-in-header.component';
import { FormComponent } from '../form/sing-in-form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TranslocoModule } from '@ngneat/transloco';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sign-in-classic',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    SignInHeaderComponent,
    FormComponent,
    MatCheckboxModule,
    TranslocoModule,
    MatProgressSpinnerModule,
    MatButtonModule,
  ],
})
export class SignInClassicComponent implements OnInit {
  rememberme = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false],
    });
  }

  ngOnInit(): void {}

  signIn(): void {
    console.log('SignIn method called');
  }
}
