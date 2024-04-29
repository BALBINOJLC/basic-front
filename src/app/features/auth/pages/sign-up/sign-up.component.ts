import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, type OnInit } from '@angular/core';
import { SignUpClassicComponent } from '../../components/signup/classic/sign-up.component';
import { AuthEventsService, AuthStoreService, IAuthSignUp, ISignUpForm, TSignInTemplate } from '@auth';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, SignUpClassicComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit, OnDestroy {
  template: TSignInTemplate = 'classic';

  fStore = new AuthStoreService(this.store);

  private subscription: Subscription = new Subscription();

  constructor(
    private authEventsService: AuthEventsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authEventsService.signUpEvent$.subscribe((data) => {
        if (data && data.email && data.password?.password) {
          this.signUp(data);
        }
      })
    );
  }

  signUp(dataForm: ISignUpForm): void {
    const {
      email,
      password: { password },
      first_name,
      last_name,
      type,
    } = dataForm;

    const user: IAuthSignUp = {
      email: email.toLowerCase().trim(),
      password: password.trim(),
      first_name,
      last_name,
      type,
    };

    this.fStore.authSignUp({ user, invited: false, sendEmail: true });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
