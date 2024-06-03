import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { MainComponent } from '../main/main.component';
import { ViewDetailsComponent } from './view/vew.component';
import { EditDetailsComponent } from './edit/edit.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { TFrom, IQueryUser, IUser, IUserFilter } from '@users';
import { UserStoreService } from '../store/store.service';
import { Store } from '@ngrx/store';
import { commonModules, materialToolsModules } from '@shared';

@Component({
  selector: 'item-details',
  templateUrl: './details.component.html',
  host: { class: 'h-full flex justify-center' },
  standalone: true,
  imports: [...commonModules, ...materialToolsModules, MainComponent, EditDetailsComponent, ViewDetailsComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent implements OnInit, OnDestroy {
  user$: Observable<IUser>;
  fStore = new UserStoreService(this.store);

  id: string;
  from!: TFrom;
  editMode: boolean = false;
  filter: IUserFilter = {};

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
    });
  }

  ngOnInit(): void {
    this.initialProsses();
    this.get();
  }

  initialProsses(): void {
    this._mainComponent.matDrawer.open();
    const route = this._router.url;
    if (route.includes('clients')) {
      this.from = 'client';
    } else if (route.includes('users')) {
      this.from = 'user';
    }
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
      fields: ' ',
    };

    if (this.id !== 'new') {
      this.fStore.getuser(query);
      this.toggleEditMode(false);
    } else {
      this.toggleEditMode(true);
    }
  }

  update(data: IUser): void {
    this.fStore.updateUser(this.id, data);
    this.toggleEditMode(false);
  }

  deleteD(): void {
    this.fStore.deleteUser(this.id, this.from);
    this.toggleEditMode(false);
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }

  close(): void {
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
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
