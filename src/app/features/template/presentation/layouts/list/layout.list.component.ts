import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@ngneat/transloco';
import { ITemplate } from '@template';
import { ListTemplate1Component } from '../../components/list-1/list-1.component';

@Component({
  selector: 'layout-list',
  templateUrl: './layout.list.component.html',
  styleUrl: './layout.list.component.scss',
  standalone: true,
  imports: [CommonModule, ListTemplate1Component, TranslocoModule],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutListComponent {
  @Input() items!: ITemplate[];
  @Output() view = new EventEmitter<ITemplate>();
  constructor() {}

  viewTemplate(item: ITemplate): void {
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
