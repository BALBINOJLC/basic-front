import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { IUser } from '@users';
import { commonModules } from '@shared';

@Component({
  selector: 'list-user-1',
  templateUrl: 'list-user-1.component.html',
  styleUrl: './list-user.component.scss',
  standalone: true,
  imports: [...commonModules, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListUser1Component {
  @Input({ required: true }) user: IUser;
  selectedUser!: IUser;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {}

  view(user: IUser): void {
    this.selectedUser = user;
    this._router.navigate(['./', user.id], { relativeTo: this._activatedRoute });
  }
}
