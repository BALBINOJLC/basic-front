import { NgClass, NgFor, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { appThemeConfig } from '@config';
import { FuseDrawerComponent } from '@fuse/components/drawer';
import { FuseConfig, FuseConfigService, TScheme, TTheme, TThemes } from '@fuse/services/config';

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'settings',
  templateUrl: './settings.component.html',
  styles: [
    `
      settings {
        position: static;
        display: block;
        flex: none;
        width: auto;
      }

      @media (screen and min-width: 1280px) {
        empty-layout + settings .settings-cog {
          right: 0 !important;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatIconModule, FuseDrawerComponent, MatButtonModule, NgFor, NgClass, MatTooltipModule],
})
export class SettingsComponent implements OnInit, OnDestroy {
  config: FuseConfig;
  layout: string;
  scheme: 'dark' | 'light';
  theme: string;
  themes: TThemes;

  show: boolean = appThemeConfig.options.showSettings;
  showQuickChat: boolean = appThemeConfig.options.showQuickChat;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  /**
   * Constructor
   */
  constructor(
    private _router: Router,
    private _fuseConfigService: FuseConfigService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config$.pipe(takeUntil(this._unsubscribeAll)).subscribe((config: FuseConfig) => {
      // Store the config
      this.config = config;
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
   * Set the layout on the config
   *
   * @param layout
   */
  setLayout(layout: string): void {
    // Clear the 'layout' query param to allow layout changes
    this._router
      .navigate([], {
        queryParams: {
          layout: null,
        },
        queryParamsHandling: 'merge',
      })
      .then(() => {
        // Set the config
        this._fuseConfigService.config = { layout };
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('layout', layout);
        }
      });
  }

  /**
   * Set the scheme on the config
   *
   * @param scheme
   */
  setScheme(scheme: TScheme): void {
    this._fuseConfigService.config = { scheme };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('scheme', scheme);
    }
  }

  /**
   * Set the theme on the config
   *
   * @param theme
   */
  setTheme(theme: TTheme): void {
    this._fuseConfigService.config = { theme };
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', theme);
    }
  }
}
