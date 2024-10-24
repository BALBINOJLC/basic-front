/* eslint-disable @typescript-eslint/naming-convention */
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { IUser, UserStoreService } from '@users';
import { CommonModules } from '@shared';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Store } from '@ngrx/store';
import { UIState } from '@store';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { CurrencyPipeCLP } from '../../../../../shared/pipes/currency.pipe';

@Component({
  selector: 'list-user-1',
  templateUrl: 'list-1.component.html',
  styleUrl: './list-1.component.scss',
  standalone: true,
  imports: [...CommonModules, MatButtonModule, MatIconModule, RouterModule, TranslocoModule, MatTooltipModule, CurrencyPipeCLP],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ListUser1Component {
  @Input({ required: true }) user: IUser;
  selectedUser!: IUser;
  fStore = new UserStoreService(this.store);

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private store: Store<{ ui: UIState }>,
    private _fuseConfirmationService: FuseConfirmationService
  ) {}

  view(user: IUser): void {
    this.selectedUser = user;
    this._router.navigate(['./', user.id], { relativeTo: this._activatedRoute });
  }
  toggleEditMode(): void {}
  deleteD(): void {
    const title = 'MS.DELETE_CONFIRM';
    const message = 'MS.DELETE_INFO';
    const confirm = 'BTNS.YES';

    this._fuseConfirmationService
      .open({
        actions: {
          cancel: { show: true },
          confirm: { show: true, label: confirm, color: 'primary' },
        },
        icon: {
          show: true,
          color: 'warning',
        },
        message,
        title,
      })
      .afterClosed()
      .subscribe((d) => {
        if (d === 'confirmed') {
          this.fStore.deleteUser(this.user.id);
        }
      });
  }
}
