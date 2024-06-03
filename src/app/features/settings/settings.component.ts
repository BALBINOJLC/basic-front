import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from '@angular/material/sidenav';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { IPanelSettigns } from './interfaces';
import { SettingsNotificationsComponent } from './notifications/notifications.component';
import { SettingsPlanBillingComponent } from './plan-billing/plan-billing.component';
import { SettingsSecurityComponent } from './security/security.component';
import { SettingsAccountComponent } from './account/account.component';
import { MatIcon } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    TranslocoModule,
    MatDrawer,
    MatIcon,
    MatDrawerContainer,
    MatDrawerContent,
    SettingsAccountComponent,
    SettingsComponent,
    SettingsNotificationsComponent,
    SettingsPlanBillingComponent,
    SettingsSecurityComponent,
  ],
})
export class SettingsComponent implements OnInit, OnDestroy {
  @ViewChild('drawer') drawer: MatDrawer;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  panels: IPanelSettigns[] = [];
  selectedPanel: string = 'account';
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  /**
   * Constructor
   */
  constructor(private _changeDetectorRef: ChangeDetectorRef, private _fuseMediaWatcherService: FuseMediaWatcherService) {}

  ngOnInit(): void {
    // Setup available panels
    this.panels = [
      {
        id: 'account',
        icon: 'heroicons_outline:user-circle',
        title: 'SETTINGS.PROFILE.TITLE',
        description: 'SETTINGS.PROFILE.DESCRIPTION',
      },
      {
        id: 'security',
        icon: 'heroicons_outline:lock-closed',
        title: 'SETTINGS.SECURITY.TITLE',
        description: 'SETTINGS.SECURITY.DESCRIPTION',
      },
      {
        id: 'integrations',
        icon: 'mat_outline:apps',
        title: 'SETTINGS.INTEGRATIONS.TITLE',
        description: 'SETTINGS.INTEGRATIONS.DESCRIPTION',
      },
    ];

    // Subscribe to media changes
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Set the drawerMode and drawerOpened
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
        this.drawerOpened = true;
      } else {
        this.drawerMode = 'over';
        this.drawerOpened = false;
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
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
   * Navigate to the panel
   *
   * @param panel
   */
  goToPanel(panel: string): void {
    this.selectedPanel = panel;

    // Close the drawer on 'over' mode
    if (this.drawerMode === 'over') {
      this.drawer.close();
    }
  }

  /**
   * Get the details of the panel
   *
   * @param id
   */
  getPanelInfo(id: string): IPanelSettigns {
    return this.panels.find((panel) => panel.id === id);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: IPanelSettigns): string | number {
    return item.id || index;
  }
}
