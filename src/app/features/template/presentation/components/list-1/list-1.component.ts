import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslocoModule } from '@ngneat/transloco';
import { ITemplate } from '@template';
import { commonModules } from '@shared';

@Component({
  selector: 'list-template-1',
  templateUrl: 'list-1.component.html',
  styleUrl: './list-1.component.scss',
  standalone: true,
  imports: [...commonModules, MatButtonModule, MatIconModule, RouterModule, TranslocoModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListTemplate1Component {
  @Input({ required: true }) template: ITemplate;
  selectedTemplate!: ITemplate;

  constructor(private _router: Router, private _activatedRoute: ActivatedRoute) {}

  view(template: ITemplate): void {
    this.selectedTemplate = template;
    this._router.navigate(['./', template.id], { relativeTo: this._activatedRoute });
  }
}
