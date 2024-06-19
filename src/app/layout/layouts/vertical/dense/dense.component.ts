import { NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { selectAuthUser } from '@auth';
import { IAppConfig, appThemeConfig } from '@config';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { Store } from '@ngrx/store';
import { IUser } from '@users';
import { Navigation } from 'app/core/navigation/navigation.types';
import { LanguagesComponent } from 'app/layout/common/languages/languages.component';
import { MessagesComponent } from 'app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'app/layout/common/search/search.component';
import { ShortcutsComponent } from 'app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'app/layout/common/user/user.component';
import { userMenu } from 'app/mock-api/common/navigation/data';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'dense-layout',
  templateUrl: './dense.component.html',
  encapsulation: ViewEncapsulation.None,
  styles: `
    .space-nav-bar {
      width: calc(100% - 30px) !important;
      margin: 10px;
      position: relative;
      left: 10px;
    }
  `,
  standalone: true,
  imports: [
    FuseLoadingBarComponent,
    FuseVerticalNavigationComponent,
    MatButtonModule,
    MatIconModule,
    LanguagesComponent,
    FuseFullscreenComponent,
    SearchComponent,
    ShortcutsComponent,
    MessagesComponent,
    NotificationsComponent,
    UserComponent,
    NgIf,
    RouterOutlet,
    QuickChatComponent,
  ],
})
export class DenseLayoutComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user!: IUser;

  isScreenSmall: boolean;
  navigation: Navigation;
  navigationAppearance: 'default' | 'dense' = 'dense';

  appConfig: IAppConfig = appThemeConfig;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  /**
   * Constructor
   */
  constructor(
    private store: Store,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for current year
   */
  get currentYear(): number {
    return new Date().getFullYear();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    this.store
      .select(selectAuthUser)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((d) => {
        if (d && d.profiles && d.profiles.length > 0) {
          this.navigation = userMenu(d.profiles);
        }
      });

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Check if the screen is small
      this.isScreenSmall = !matchingAliases.includes('md');

      // Change the navigation appearance
      this.navigationAppearance = this.isScreenSmall ? 'default' : 'dense';
    });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle navigation
   *
   * @param name
   */
  toggleNavigation(name: string): void {
    // Get the navigation
    const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

    if (navigation) {
      // Toggle the opened status
      navigation.toggle();
    }
  }

  /**
   * Toggle the navigation appearance
   */
  toggleNavigationAppearance(): void {
    this.navigationAppearance = this.navigationAppearance === 'default' ? 'dense' : 'default';
  }
}
