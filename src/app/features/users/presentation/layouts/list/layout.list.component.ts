import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListUser1Component } from '../../components/list-user-1/list-user-1.component';
import { TranslocoModule } from '@ngneat/transloco';
import { IUser } from '@users';

@Component({
  selector: 'layout-list',
  templateUrl: './layout.list.component.html',
  styleUrl: './layout.list.component.scss',
  standalone: true,
  imports: [CommonModule, ListUser1Component, TranslocoModule],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutListComponent {
  @Input() items!: IUser[];
  @Output() view = new EventEmitter<IUser>();
  constructor() {}

  viewUser(item: IUser): void {
    this.view.emit(item);
  }

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: IUser): string | number {
    return item._id || index;
  }
}
