import { Component, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IUser } from '@users';
import { CommonModules, MaterialToolsModules } from '@shared';

@Component({
  selector: 'view-details',
  templateUrl: 'view.component.html',
  standalone: true,
  imports: [...CommonModules, ...MaterialToolsModules, FormsModule, ReactiveFormsModule],
})
export class ViewDetailsComponent {
  @Input() item!: IUser;
  constructor() {}
}
