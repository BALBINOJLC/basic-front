import { CommonModule, NgIf } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RouterOutlet } from '@angular/router';
import { selectAuthUser } from '@auth';
import { IAppConfig, appThemeConfig } from '@config';
import { FuseFullscreenComponent } from '@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { TranslocoModule } from '@ngneat/transloco';
import { Store } from '@ngrx/store';
import { IPaginator, PaginatorLoad, selectUIPaginator } from '@store';
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
import { Observable, of, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'compact-layout',
  templateUrl: './compact.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    CommonModule,
    FuseLoadingBarComponent,
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
    FuseVerticalNavigationComponent,
    TranslocoModule,
    MatPaginatorModule,
  ],
})
export class CompactLayoutComponent implements OnInit, OnDestroy {
  @Input({ required: true }) user!: IUser;

  isScreenSmall: boolean;
  navigation: Navigation;

  appConfig: IAppConfig = appThemeConfig;
  paginator$: Observable<IPaginator>;

  private _unsubscribeAll: Subject<void> = new Subject<void>();
  maxSize$: Observable<number>;
  /**
   * Constructor
   */
  constructor(
    private store: Store,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    private _fuseNavigationService: FuseNavigationService
  ) {
    this.paginator$ = this.store.select(selectUIPaginator);
    this.paginator$.subscribe((paginator) => {
      this.maxSize$ = of(paginator.items);
    });
  }

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
    // Subscribe to the user service
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
    });
  }

  eventPaginate(event: PageEvent): void {
    let paginate = 0;
    paginate = event.pageIndex * event.pageSize;
    const limit = event.pageSize;
    const offset = paginate;
    this.store.dispatch(PaginatorLoad({ paginator: { limit, offset } }));
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
}
