import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, type OnInit } from '@angular/core';
import { ForgotPasswordClassicComponent } from '../../components/forgot-password/classic/forgot-password.component';
import { AuthEventsService, TSignInTemplate } from '@auth';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthStoreService } from '@core';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ForgotPasswordClassicComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  template: TSignInTemplate = 'classic';

  fStore = new AuthStoreService(this.store);

  private subscription: Subscription = new Subscription();

  constructor(
    private authEventsService: AuthEventsService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.authEventsService.forgotPasswordEvent$.subscribe((data) => {
        if (data && data.email) {
          this.sendResetLink(data);
        }
      })
    );
  }

  sendResetLink(dataForm: { email: string }): void {
    const { email } = dataForm;
    this.fStore.authForgotPassword(email);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
