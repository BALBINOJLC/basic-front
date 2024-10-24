import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { IUser } from '@users';
import { CardInfoUserOneComponent } from '../../components/card-info-1/card-info-1.component';

@Component({
  selector: 'layout-grid',
  templateUrl: './layout.grid.component.html',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, TranslocoModule, CardInfoUserOneComponent],
})
export class LayoutGridComponent {
  @Input({ required: true }) users: IUser[];
  @Output() view = new EventEmitter<IUser>();
  constructor() {}

  viewClient(item: IUser): void {
    this.view.emit(item);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: IUser): string | number {
    return item.id || index;
  }
}
