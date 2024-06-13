import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { IBase } from '@bases';
import { CommonModules } from '@shared';

@Component({
  selector: 'list-base-1',
  templateUrl: 'list-1.component.html',
  styleUrl: './list-1.component.scss',
  standalone: true,
  imports: [...CommonModules, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListBase1Component {
  @Input({ required: true }) base: IBase;
  selectedBase!: IBase;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {}

  view(base: IBase): void {
    this.selectedBase = base;
    this._router.navigate(['./', base.id], { relativeTo: this._activatedRoute });
  }
}
