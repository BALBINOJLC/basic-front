/* eslint-disable arrow-parens */
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { isPlatformBrowser } from '@angular/common';
import { MatPaginatorModule,} from '@angular/material/paginator';
import { TLayout } from '@utils';
import { LayoutListComponent } from '../layouts/list/layout.list.component';
import { LayoutGridComponent } from '../layouts/grid/layout.grid.component';
import { HeaderPagesComponent } from 'app/shared/components/header-pages/header-pages.component';
import { commonModules, formsModules, materialToolsModules } from '@shared';
import { MatDrawer } from '@angular/material/sidenav';
import { iconScreen, translate } from '../config';
import { IQueryUsers, ISortUsers, IUser, IUserFilter, IUserState } from '@users';
import { UserStoreService } from '../store/store.service';
import { Store } from '@ngrx/store';
import { PaginatorLoad, selectUIPaginator } from '@store';


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

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;

  transloco = translate;

  drawerMode: 'side' | 'over' = 'side';
  layout: TLayout = 'list';


  items$: Observable<IUserState>;
  itemsPage$: Observable<IUserState>;
  maxSize$: Observable<number>;
  limit: number = 50;
  offset: number = 0;
  sort: ISortUsers = {
    field: 'display_name',
    order: 1,
  };

  fStore = new UserStoreService(this.store);
  selected!: IUser;
  filter: IUserFilter = {};

  iconScreen = iconScreen;
  url!: string;

  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _changeDetectorRef: ChangeDetectorRef,
    private _router: Router,
    private store: Store,
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
    this.get();
    this.getsItemsPaginator();
  }

  search(query: string): void {
    const params = this.buildParams();
    this.fStore.searchUsers(params, query);
  }

  add(): void {
    this._router.navigate(['./', 'new'], { relativeTo: this._activatedRoute });
  }

  view(item: IUser): void {
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
    const params: IQueryUsers = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getUsers(params, 'user');
    this.items$ = this.fStore.see();
    this.maxSize$ = this.fStore.seeMaxSize();
    this.maxSize$.subscribe((maxSize) => {
      this.loadPaginate(maxSize);
    });
  }

  loadPaginate(items: number): void {
    this.store.dispatch(
      PaginatorLoad({
        paginator: {
          limit: this.limit,
          offset: this.offset,
          items: items,
        },
      })
    );
  }

  eventPaginate(limit: number, offset: number): void {
    this.limit = limit;
    this.offset = offset;
    const params: IQueryUsers = {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
    this.fStore.getUsers(params, 'user');
    this.items$ = this.fStore.see();
    this.maxSize$ = this.fStore.seeMaxSize();
    this.maxSize$.subscribe((maxSize) => {
      this.store.dispatch(
        PaginatorLoad({
          paginator: {
            items: maxSize,
          },
        })
      );
    });
  }


  getsItemsPaginator(): void {
    const paginator$ = this.store.select(selectUIPaginator);
    paginator$.subscribe((paginator) => {
      if (paginator.limit) {
        this.eventPaginate(paginator.limit, paginator.offset);
      }
    });
  }


  private buildParams(): IQueryUsers {
    return {
      filter: this.filter,
      limit: this.limit,
      offset: this.offset,
      sort: this.sort,
    };
  }


  ngOnDestroy(): void {
    this.fStore.cleansUsers();
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
