import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { ITemplate } from '@templates';

@Component({
  selector: 'card-info-template-1',
  templateUrl: 'card-info-1.component.html',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoTemplateOneComponent {
  @Input() template!: ITemplate;
  @Input() labelLink: string;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {
    this.labelLink = 'SEE';
  }

  view(template: ITemplate): void {
    this._router.navigate(['./', template.id], { relativeTo: this._activatedRoute });
  }
}
