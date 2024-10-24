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
  isLoading$: Observable<boolean>;
  options: AnimationOptions = {
    path: '/assets/lottie/loadingLogo.json',
  };

  title = 'backoffice_base_startups';

  private subscription: Subscription = new Subscription();
  private unsubscribeAll: Subject<void> = new Subject<void>();
  // eslint-disable-next-line max-params
  constructor(
    private _translocoService: TranslocoService,
    @Inject(DOCUMENT) private _document: Document,
    private _store: Store,
    private _cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _trans: TranslocoService,
    private _fuseConfirmationService: FuseConfirmationService,
    private _platform: Platform
  ) {
    if (this._platform.IOS || this._platform.ANDROID) {
      this._store.dispatch(actions.setPlatForm({ platform: PlatformEnum.MOBILE }));
      this._document.body.classList.add('is-mobile');
    } else {
      this._store.dispatch(actions.setPlatForm({ platform: PlatformEnum.WEB }));
      this._document.body.classList.add('is-web');
    }
  }

  ngOnInit(): void {
    this.isLoading$ = this._store.select(selectUiState).pipe(
      takeUntil(this.unsubscribeAll),
      debounceTime(2000),
      map((ui) => ui.isLoading)
    );
    this._store
      .select(selectUiState)
      .pipe(takeUntil(this.unsubscribeAll), debounceTime(400))
      .subscribe((ui) => {
        if (ui.error) {
          this.uiErrors(ui.error);
          console.log(ui.error);
        }
        if (ui.message) {
          if (ui.message.message.includes('UPDATED') || ui.message.message.includes('DELETED')) {
            this.uiMessageUpdate(ui.message.message, '👍🏽', 3000);
          } else {
            this.uiMessage(ui.message);
          }
          this._store.dispatch(actions.uIClean());
        }
        this._cd.detectChanges();
      });
  }

  uiErrors(error: IHttpError): void {
    this._store.dispatch(actions.uIClean());
    console.error('Error Api:', error);
    this._fuseConfirmationService.open({
      actions: {
        cancel: { show: false },
        confirm: { show: true, label: 'OK', color: 'primary' },
      },
      message: this._trans.translate(error?.error.message?.toString()),
      title: '',
    });
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  animationCreated(animationItem: AnimationItem): void {}

  uiMessage(message: { message: string; status: number }): void {
    this._store.dispatch(actions.uIClean());

    if (message.message !== 'Token not found') {
      this._fuseConfirmationService.open({
        actions: {
          cancel: { show: true, label: 'cerrar' },
          confirm: { show: false, label: 'cerrar', color: 'success' },
        },
        icon: {
          show: true,
          color: 'success',
          name: 'heroicons_outline:check-circle',
        },
        message: this._trans.translate(message.message),
        title: '',
      });
    }
  }

  uiMessageUpdate(message: string, icon: string, duration: number): void {
    const messageT = this._trans.translate(message);
    this._snackBar.open(messageT, icon, {
      duration: duration,
      horizontalPosition: 'end',
    });
  }
}
