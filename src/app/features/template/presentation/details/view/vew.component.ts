import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ITemplate } from '@templates';
import { commonModules, materialToolsModules } from '@shared';

@Component({
  selector: 'view-details',
  templateUrl: 'view.component.html',
  standalone: true,
  imports: [...commonModules, ...materialToolsModules, FormsModule, ReactiveFormsModule],
})
export class ViewDetailsComponent {
  @Input() item!: ITemplate;
  constructor() {}
}
