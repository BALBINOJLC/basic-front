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
import { MatPaginatorModule } from '@angular/material/paginator';
import { TLayout } from '@utils';
import { LayoutListComponent } from '../layouts/list/layout.list.component';
import { LayoutGridComponent } from '../layouts/grid/layout.grid.component';
import { HeaderPagesComponent } from 'app/shared/components/header-pages/header-pages.component';
import { commonModules, formsModules, materialToolsModules } from '@shared';
import { MatDrawer } from '@angular/material/sidenav';
import { iconScreen, translate } from '../config';
import { IQueryTemplates, ISortTemplates, ITemplate, ITemplateFilter, ITemplateState } from '@template';
import { TemplateStoreService } from '../store/store.service';
import { Store } from '@ngrx/store';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

@Component({
  selector: 'clients-main',
  templateUrl: './main.component.html',
  standalone: true,
  imports: [
    ...commonModules,
    ...materialToolsModules,
    ...formsModules,
    MatPaginatorModule,
    LayoutListComponent,
    LayoutGridComponent,
    HeaderPagesComponent,
    MainComponent,
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

  drawerMode: 'side' | 'over' = 'side';
  layout: TLayout = 'list';

  items$: Observable<ITemplateState>;
  limit: number = 10;
  offset: number = 0;
  sort: ISortTemplates = {
    field: 'name',
    order: 1,
  };

  fStore = new TemplateStoreService(this.store);
  selected!: ITemplate;
  filter: ITemplateFilter = {};

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
    this.items$ = this.fStore.see();
    this.get();
    this.drawerChanges();
    this.mediaChanges();
    if (isPlatformBrowser(this.platformId)) {
      this.elementRef.nativeElement?.addEventListener('scroll', this.onScroll);
    }
  }

  getMoreItems(limit: number, offset: number): void {
    this.limit = limit;
    this.offset = offset;
    const params: IQueryTemplates = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getScroll(params);
  }

  onScroll(event): void {
    // get the height of the scroll
    const height = event.target.scrollHeight - event.target.clientHeight;
    // detect when the scroll is at the bottom
    if (event.target.scrollTop >= height) {
      console.log('scroll at the bottom');
      // add more data
      this.offset += this.limit;
      this.getMoreItems(this.limit, this.offset);
    }
  }

  search(query: string): void {
    const params = this.buildParams();
    this.fStore.searchTemplates(params, query);
  }

  add(): void {
    this._router.navigate(['./', 'new'], { relativeTo: this._activatedRoute });
  }

  view(item: ITemplate): void {
    this._router.navigate(['./', item.id]);
  }

  setLayout(layout: 'list' | 'grid'): void {
    this.layout = layout;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('view', layout);
    }
  }

  onBackdropClicked(): void {
    this._router.navigate(['./'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }

  get(): void {
    this.url = this._router.url;
    const params: IQueryTemplates = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getTemplates(params);
    this.items$ = this.fStore.see();
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

  private buildParams(): IQueryTemplates {
    return {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
  }

  ngOnDestroy(): void {
    this.fStore.cleansTemplates();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
