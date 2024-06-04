import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ITemplate } from '@templates';
import { CardInfoTemplateOneComponent } from '../../components/card-info-1/card-info-1.component';

@Component({
  selector: 'layout-grid',
  templateUrl: './layout.grid.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslocoModule, CardInfoTemplateOneComponent],
})
export class LayoutGridComponent {
  @Input({ required: true }) templates: ITemplate[];
  @Output() view = new EventEmitter<ITemplate>();
  constructor() {}

  viewClient(item: ITemplate): void {
    this.view.emit(item);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: ITemplate): string | number {
    return item.id || index;
  }
}
