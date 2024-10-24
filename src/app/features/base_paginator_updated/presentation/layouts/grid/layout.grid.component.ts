import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { IBase } from '@bases';
import { CardInfoBaseOneComponent } from '../../components/card-info-1/card-info-1.component';

@Component({
  selector: 'layout-grid',
  templateUrl: './layout.grid.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslocoModule, CardInfoBaseOneComponent],
})
export class LayoutGridComponent {
  @Input({ required: true }) bases: IBase[];
  @Output() view = new EventEmitter<IBase>();
  constructor() {}

  viewClient(item: IBase): void {
    this.view.emit(item);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: IBase): string | number {
    return item.id || index;
  }
}
