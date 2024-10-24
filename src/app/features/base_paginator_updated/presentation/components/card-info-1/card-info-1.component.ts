import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { IBase } from '@bases';

@Component({
  selector: 'card-info-base-1',
  templateUrl: 'card-info-1.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoBaseOneComponent {
  @Input() base!: IBase;
  @Input() labelLink: string;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this.labelLink = 'SEE';
  }

  view(base: IBase): void {
    this._router.navigate(['./', base.id], { relativeTo: this._activatedRoute });
  }
}
