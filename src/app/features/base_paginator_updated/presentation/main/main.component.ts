/* eslint-disable max-params */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-parens */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { TLayout } from '@utils';
import { LayoutListComponent } from '../layouts/list/layout.list.component';
import { LayoutGridComponent } from '../layouts/grid/layout.grid.component';
import { HeaderPagesComponent } from 'app/shared/components/header-pages/header-pages.component';
import { CommonModules, FormsModules, IFilters, MaterialToolsModules, SidebarFiltersComponent } from '@shared';
import { MatDrawer } from '@angular/material/sidenav';
import { iconScreen, translate } from '../config';
import { IQueryBases, ISortBases, IBase, IBaseFilter, IBaseState, selectBaseMaxSize } from '@bases';
import { BaseStoreService } from '../store/store.service';
import { Store } from '@ngrx/store';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { AuthStoreService } from '@auth';
import { IUser } from '@users';

@Component({
  selector: 'clients-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    ...CommonModules,
    ...FormsModules,
    ...MaterialToolsModules,
    MatPaginatorModule,
    LayoutListComponent,
    LayoutGridComponent,
    HeaderPagesComponent,
    MainComponent,
    SidebarFiltersComponent,
  ],
  styles: [
    `
      .fixed-header {
        position: sticky; /* Make the header sticky */
        top: 0; /* Position it at the top of the viewport */
        z-index: 10; /* Ensure the header stays on top during scrolling (optional) */
        padding: 1rem; /* Add some padding for better look (optional) */
      }

      .scrollable-content {
        overflow-y: auto; /* Enable vertical scrolling */
        height: calc(100vh - 300px); /* Adjust height based on header height */
      }
    `,
  ],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;
  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;
  transloco = translate;
  drawerWidth = 'w-2/3 sm:w-72 lg:w-100';
  drawerMode: 'side' | 'over' = 'side';
  layout: TLayout = 'list';

  limit: number = 10;
  offset: number = 0;
  sort: ISortBases = {
    field: 'createdAt',
    order: -1,
  };

  items$: Observable<IBaseState>;
  user$: Observable<IUser>;
  maxSize$: Observable<number>;

  fStoreAuth = new AuthStoreService(this.store);
  fStore = new BaseStoreService(this.store);

  selected!: IBase;
  filter: IBaseFilter = {};

  iconScreen = iconScreen;
  url!: string;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private store: Store,
    private _fuseMediaWatcherService: FuseMediaWatcherService,
    @Inject(PLATFORM_ID) private platformId: string
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const layout: TLayout = localStorage.getItem('view') as TLayout;
      if (layout) {
        this.layout = layout;
      }
    }
  }

  ngOnInit(): void {
    this.userActive();
    this.get();
    this.items$ = this.fStore.see();
    this.userActive();
    this.drawerChanges();
    this.mediaChanges();
  }

  userActive(): void {
    this.user$ = this.fStoreAuth.seeUser();
    this.user$.subscribe((user) => {
      console.log('user', user);
    });
  }

  search(query: string): void {
    const params = this.buildParams();
    this.fStore.searchBases(params, query);
  }

  add(): void {
    this._router.navigate(['./', 'new'], { relativeTo: this._activatedRoute });
  }

  view(item: IBase): void {
    this._router.navigate(['./', item.id]);
  }

  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }

  get(): void {
    this.url = this._router.url;
    const params: IQueryBases = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getBases(params);
    this.maxSize$ = this.store.select(selectBaseMaxSize);
  }

  eventPaginate(event: PageEvent): void {
    let paginate = 0;
    const limit = event.pageSize;
    paginate = event.pageIndex * event.pageSize;
    this.limit = limit;
    this.offset = paginate;

    const params: IQueryBases = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getBases(params);
  }

  drawerChanges(): void {
    this.matDrawer.openedChange.subscribe((opened) => {
      if (!opened) {
        // Remove the selected contact when drawer closed
        this.selected = null;
        this.get();
        // Mark for check
        this._changeDetectorRef.markForCheck();
      }
    });
  }

  filters(type: IFilters): void {
    console.log('filtered:', type);
  }

  mediaChanges(): void {
    this._fuseMediaWatcherService.onMediaChange$.pipe(takeUntil(this._unsubscribeAll)).subscribe(({ matchingAliases }) => {
      // Set the drawerMode if the given breakpoint is active
      if (matchingAliases.includes('lg')) {
        this.drawerMode = 'side';
      } else {
        this.drawerMode = 'over';
      }

      // Mark for check
      this._changeDetectorRef.markForCheck();
    });
  }

  private buildParams(): IQueryBases {
    return {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
  }

  ngOnDestroy(): void {
    this.fStore.cleansBases();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
