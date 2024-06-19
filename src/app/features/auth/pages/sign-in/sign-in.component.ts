import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, PLATFORM_ID, type OnInit, OnDestroy } from '@angular/core';
import { SignInClassicComponent } from '../../components/signIn';
import { TSignInTemplate } from '../../auth.types';
import { IAuthSignIn, ISignInForm } from '../../auth.interface';
import { Store } from '@ngrx/store';
import { AuthEventsService, AuthStoreService, selectAuthToken } from '@auth';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, SignInClassicComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent implements OnInit, OnDestroy {
  template: TSignInTemplate = 'classic';

  fStore = new AuthStoreService(this.store);

  private subscription: Subscription = new Subscription();

  constructor(
    private store: Store,
    private authEventsService: AuthEventsService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  ngOnInit(): void {
    this.checkUserTokenAndRedirect();
    this.subscription.add(
      this.authEventsService.signInEvent$.subscribe((data) => {
        if (data && data.email && data.password?.password) {
          this.signIn(data);
        }
      })
    );
  }

  checkUserTokenAndRedirect(): void {
    this.subscription.add(
      this.store
        .select(selectAuthToken)
        .pipe(map((token) => this.redirectIfTokenPresent(token)))
        .subscribe()
    );
  }

  private redirectIfTokenPresent(token: string | null): void {
    if (token && isPlatformBrowser(this.platformId)) {
      window.location.replace('/admin');
    }
  }

  signIn(dataForm: ISignInForm): void {
    const {
      email,
      password: { password },
    } = dataForm;
    const user: IAuthSignIn = {
      email: email.toLocaleLowerCase().trim(),
      password: password.trim(),
    };
    this.fStore.authSignIn(user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
