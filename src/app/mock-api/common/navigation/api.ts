import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';

@Injectable({
  providedIn: 'root',
})
export class NavigationMockApi {
  private readonly _compactNavigation: FuseNavigationItem[] = [];
  private readonly _defaultNavigation: FuseNavigationItem[] = [];
  private readonly _futuristicNavigation: FuseNavigationItem[] = [];
  private readonly _horizontalNavigation: FuseNavigationItem[] = [];

  /**
   * Constructor
   */
  constructor(private _fuseMockApiService: FuseMockApiService) {
    // Register Mock API handlers
    this.registerHandlers();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Register Mock API handlers
   */
  registerHandlers(): void {
    // -----------------------------------------------------------------------------------------------------
    // @ Navigation - GET
    // -----------------------------------------------------------------------------------------------------
    this._fuseMockApiService.onGet('api/common/navigation').reply(() => {
      // Fill compact navigation children using the default navigation
      this._compactNavigation.forEach((compactNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === compactNavItem.id) {
            compactNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      // Fill futuristic navigation children using the default navigation
      this._futuristicNavigation.forEach((futuristicNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === futuristicNavItem.id) {
            futuristicNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      // Fill horizontal navigation children using the default navigation
      this._horizontalNavigation.forEach((horizontalNavItem) => {
        this._defaultNavigation.forEach((defaultNavItem) => {
          if (defaultNavItem.id === horizontalNavItem.id) {
            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
          }
        });
      });

      // Return the response
      return [
        200,
        {
          compact: cloneDeep(this._compactNavigation),
          default: cloneDeep(this._defaultNavigation),
          futuristic: cloneDeep(this._futuristicNavigation),
          horizontal: cloneDeep(this._horizontalNavigation),
        },
      ];
    });
  }
}
