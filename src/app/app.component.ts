// Start of Selection
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, DOCUMENT } from '@angular/common';
import { Observable, Subject, Subscription, debounceTime, map, of, takeUntil } from 'rxjs';
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
export class AppComponent implements OnInit {
  isLoading$: Observable<boolean> = of(false);
  options: AnimationOptions = {
    path: '/assets/lottie/loadingLogo.json',
  };

  title = 'backOffice_base_startups';

  private subscription: Subscription = new Subscription();
  private unsubscribeAll: Subject<void> = new Subject<void>();

  // eslint-disable-next-line max-params
  constructor(
    private _translocoService: TranslocoService,
    @Inject(DOCUMENT) private _document: Document,
    private _store: Store,
    private _cd: ChangeDetectorRef,
    private _snackBar: MatSnackBar,
    private _fuseConfirmationService: FuseConfirmationService,
    private _platform: Platform
  ) {
    this.initializePlatform();
  }

  ngOnInit(): void {
    this.initializeLoadingObserver();
    this.initializeUiStateListener();
  }

  private initializePlatform(): void {
    const isMobile = this._platform.IOS || this._platform.ANDROID;
    const platform = isMobile ? PlatformEnum.MOBILE : PlatformEnum.WEB;
    this._store.dispatch(actions.setPlatForm({ platform }));
    this._document.body.classList.add(isMobile ? 'is-mobile' : 'is-web');
  }

  private initializeLoadingObserver(): void {
    this.isLoading$ = this._store.select(selectUiState).pipe(
      takeUntil(this.unsubscribeAll),
      debounceTime(2000),
      map((ui) => ui.isLoading)
    );
  }

  private initializeUiStateListener(): void {
    this._store
      .select(selectUiState)
      .pipe(takeUntil(this.unsubscribeAll), debounceTime(400))
      .subscribe((ui) => {
        if (ui.error) {
          this.handleUiError(ui.error);
        }
        if (ui.message) {
          this.handleUiMessage(ui.message);
          this._store.dispatch(actions.uIClean());
        }
        this._cd.detectChanges();
      });
  }

  private handleUiError(error: IHttpError): void {
    this._store.dispatch(actions.uIClean());
    console.error('Error Api:', error);
    this._fuseConfirmationService.open({
      actions: {
        cancel: { show: false },
        confirm: { show: true, label: 'OK', color: 'primary' },
      },
      message: this._translocoService.translate(error?.error.message?.toString() || 'An error occurred'),
      title: '',
    });
  }

  private handleUiMessage(message: { message: string; status: number }): void {
    if (message.message.includes('UPDATED') || message.message.includes('DELETED')) {
      this.showSnackBarMessage(message.message, '👍🏽', 3000);
    } else if (message.message !== 'Token not found') {
      this._fuseConfirmationService.open({
        actions: {
          cancel: { show: false },
          confirm: { show: true, label: 'OK', color: 'primary' },
        },
        message: this._translocoService.translate(message.message),
        title: '',
      });
    }
  }

  private showSnackBarMessage(message: string, icon: string, duration: number): void {
    const translatedMessage = this._translocoService.translate(message);
    this._snackBar.open(translatedMessage, icon, {
      duration,
      horizontalPosition: 'end',
    });
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  ngOnDestroy(): void {
    this.unsubscribeAll.next();
    this.unsubscribeAll.complete();
    this.subscription.unsubscribe();
  }
}
