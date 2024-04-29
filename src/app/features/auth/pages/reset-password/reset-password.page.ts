import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { AuthEventsService, IPasswordForm, TSignInTemplate } from '@auth';
import { Store } from '@ngrx/store';
import { IAppState } from '@store';
import * as actions from '@auth';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ResetPasswordClassicComponent } from '../../components/reset-password';
import { AuthStoreService } from '@auth';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.page.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [CommonModule, RouterModule, ResetPasswordClassicComponent],
  animations: fuseAnimations,
})
export class AuthResetPasswordComponent implements OnInit {
  template: TSignInTemplate = 'classic';

  token: string;

  fStore = new AuthStoreService(this.store);

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store<IAppState>,
    private activateRoute: ActivatedRoute,
    private authEventsService: AuthEventsService
  ) {
    this.activateRoute.params.subscribe((params) => {
      const tokenParam: string = params.token;
      this.token = tokenParam;
    });
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authEventsService.resetPasswordEvent$.subscribe((data) => {
        if (data && data.password) {
          this.resetPassword(data);
        }
      })
    );
  }

  resetPassword(dataForm: IPasswordForm): void {
    const { password } = dataForm;
    this.store.dispatch(actions.AuthResetPassword({ password, token: this.token }));
  }
}
