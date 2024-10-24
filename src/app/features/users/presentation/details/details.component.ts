/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { MainComponent } from '../main/main.component';
import { ViewDetailsComponent } from './view/vew.component';
import { EditDetailsComponent } from './edit/edit.component';
import { MatDrawerToggleResult, MatSidenavModule } from '@angular/material/sidenav';
import { IQueryUser, IUser, IUserFilter, initialUser } from '@users';
import { UserStoreService } from '../store/store.service';
import { Store } from '@ngrx/store';
import { IconImageFirstLetterComponent, NgVarDirective } from '@shared';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { AuthStoreService } from '@auth';

@Component({
  selector: 'item-details',
  templateUrl: './details.component.html',
  host: { class: 'h-full flex justify-center' },
  standalone: true,
  imports: [
    CommonModule,
    TranslocoModule,
    NgVarDirective,
    IconImageFirstLetterComponent,
    RouterModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatMenuModule,
    MatSidenavModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MainComponent,
    EditDetailsComponent,
    ViewDetailsComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  user$: Observable<IUser>;
  fStore = new UserStoreService(this.store);
  id: string;
  editMode: boolean = false;
  filter: IUserFilter = {};
  userDefault = initialUser;

  fStoreAuth = new AuthStoreService(this.store);
  userActive$: Observable<IUser>;
  private _tagsPanelOverlayRef!: OverlayRef;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _mainComponent: MainComponent,
    private _router: Router,
    private store: Store
  ) {
    this._activatedRoute.params.subscribe((params) => {
      const id: string = params['id'];
      this.id = id;
      this.filter = { id };
      this.get();
    });
  }

  ngOnInit(): void {
    this.toggleEditMode(true);
    this.user$ = this.fStore.seeUser();
    this.initialProsses();
  }

  initialProsses(): void {
    this.userActive();
    this._mainComponent.matDrawer.open();
  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._mainComponent.matDrawer.close();
  }
  toggleEditMode(editMode: boolean | null = null): void {
    if (editMode === null) {
      this.editMode = !this.editMode;
    } else {
      this.editMode = editMode;
    }
  }

  get(): void {
    const query: IQueryUser = {
      filter: this.filter,
    };

    if (this.id !== 'new') {
      this.fStore.getUser(query);
      this.toggleEditMode(false);
    } else {
      this.toggleEditMode(true);
    }
  }

  deleteD(): void {
    this.fStore.deleteUser(this.id);
    this.toggleEditMode(false);
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }

  close(): void {
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }

  userActive(): void {
    this.userActive$ = this.fStoreAuth.seeUser();
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.fStore.cleanUser();
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }
}
