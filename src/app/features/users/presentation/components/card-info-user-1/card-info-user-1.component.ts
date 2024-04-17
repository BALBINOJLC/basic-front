import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IUser } from '@users';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'card-info-user-1',
  templateUrl: 'card-info-user-1.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoUserOneComponent {
  @Input() user!: IUser;
  @Input() labelLink: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.labelLink = 'Ver cliente';
  }

  view(user: IUser): void {
    this._router.navigate(['./', user._id], { relativeTo: this._activatedRoute });
  }
}
