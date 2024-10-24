import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IBase } from '@bases';
import { CommonModules, CurrencyPipeCLP, MaterialToolsModules } from '@shared';

@Component({
  selector: 'view-details-paginator',
  templateUrl: 'view.component.html',
  standalone: true,
  imports: [...CommonModules, ...MaterialToolsModules, FormsModule, ReactiveFormsModule, CurrencyPipeCLP],
})
export class ViewDetailsComponent {
  @Input() item!: IBase;
  constructor() {}
}
