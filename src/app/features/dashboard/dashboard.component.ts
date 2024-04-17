import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'example',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIcon, MatTabsModule, MatButton, MatButtonToggleModule, MatMenu, MatMenuTrigger],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent {
  /**
   * Constructor
   */
  constructor() {}
}
