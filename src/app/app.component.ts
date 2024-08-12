import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, Subject, Subscription, debounceTime, map, takeUntil } from 'rxjs';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlatformEnum, selectUiState } from './store/reducers';
import * as actions from './store/actions';
import { IHttpError } from '@core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Platform } from '@angular/cdk/platform';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';
import { AnimationItem } from 'lottie-web';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, LottieComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading$: Observable<boolean> = this.store.select(selectUiState).pipe(map((ui) => ui.isLoading));
  options: AnimationOptions = {
    path: '/assets/lottie/loadingLogo.json',
  };

  title = 'backoffice_base_startups';

  private subscription: Subscription = new Subscription();
  private _unsubscribeAll: Subject<void> = new Subject<void>();
  constructor(
    private translocoService: TranslocoService,
    @Inject(DOCUMENT) private document: Document,
    private store: Store,
    private cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private trans: TranslocoService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _platform: Platform
  ) {
    if (this._platform.IOS || this._platform.ANDROID) {
      this.store.dispatch(actions.setPlatForm({ platform: PlatformEnum.MOBILE }));
      this.document.body.classList.add('is-mobile');
    } else {
      this.store.dispatch(actions.setPlatForm({ platform: PlatformEnum.WEB }));
      this.document.body.classList.add('is-web');
    }
  }

  ngOnInit(): void {
    this.store
      .select(selectUiState)
      .pipe(takeUntil(this._unsubscribeAll), debounceTime(400))
      .subscribe((ui) => {
        if (ui.error) {
          this.uiErrors(ui.error);
        }
        if (ui.message) {
          if (ui.message.message.includes('UPDATED') || ui.message.message.includes('DELETED')) {
            this.uiMessageUpdate(ui.message.message, '👍🏽', 3000);
          } else {
            this.uiMessage(ui.message);
          }
          this.store.dispatch(actions.uIClean());
        }
        this.cd.detectChanges();
      });
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  uiErrors(error: IHttpError): void {
    this.store.dispatch(actions.uIClean());
    console.error('Error Api:', error);
    this._fuseConfirmationService.open({
      actions: {
        cancel: { show: false },
        confirm: { show: true, label: 'OK', color: 'primary' },
      },
      message: this.trans.translate(error?.error.message?.toString()),
      title: '',
    });
  }

  uiMessage(message: { message: string; status: number }): void {
    this.store.dispatch(actions.uIClean());

    if (message.message !== 'Token not found') {
      this._fuseConfirmationService.open({
        actions: {
          cancel: { show: false },
          confirm: { show: true, label: 'OK', color: 'primary' },
        },
        message: this.trans.translate(message.message),
        title: '',
      });
    }
  }

  uiMessageUpdate(message: string, icon: string, duration: number): void {
    const messageT = this.trans.translate(message);
    this._snackBar.open(messageT, icon, {
      duration: duration,
      horizontalPosition: 'end',
    });
  }
}
