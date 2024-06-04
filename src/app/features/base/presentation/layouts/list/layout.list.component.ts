import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { IBase } from 'app/features/base';
import { ListBase1Component } from '../../components/list-1/list-1.component';

@Component({
  selector: 'layout-list',
  templateUrl: './layout.list.component.html',
  styleUrl: './layout.list.component.scss',
  standalone: true,
  imports: [CommonModule, ListBase1Component, TranslocoModule],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutListComponent {
  @Input() items!: IBase[];
  @Output() view = new EventEmitter<IBase>();
  constructor() {}

  viewBase(item: IBase): void {
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
