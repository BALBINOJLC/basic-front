import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { MainComponent } from '../main/main.component';
import { ViewDetailsComponent } from './view/vew.component';
import { EditDetailsComponent } from './edit/edit.component';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { IQueryBase, IBase, IBaseFilter } from 'app/features/base';
import { BaseStoreService } from '../store/store.service';
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
  base$: Observable<IBase>;
  fStore = new BaseStoreService(this.store);
  id: string;
  editMode: boolean = false;
  filter: IBaseFilter = {};

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
    });
  }

  ngOnInit(): void {
    this.base$ = this.fStore.seeBase();
    this.initialProsses();
    this.get();
  }

  initialProsses(): void {
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
    const query: IQueryBase = {
      filter: this.filter,
    };

    if (this.id !== 'new') {
      this.fStore.getbase(query);
      this.toggleEditMode(false);
    } else {
      this.toggleEditMode(true);
    }
  }

  update(data: IBase): void {
    this.fStore.updateBase(this.id, data);
    this.toggleEditMode(false);
  }

  deleteD(): void {
    this.fStore.deleteBase(this.id);
    this.toggleEditMode(false);
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }

  close(): void {
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
  }
  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.fStore.cleanBase();
    if (this._tagsPanelOverlayRef) {
      this._tagsPanelOverlayRef.dispose();
    }
  }
}
