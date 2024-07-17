import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';

@Component({
  selector: 'example',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatIcon, MatTabsModule, MatButton, MatButtonToggleModule, MatMenu, MatMenuTrigger, CalendarModule],
  templateUrl: './dashboard.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class ExampleComponent {
  view: CalendarView = CalendarView.Month;

  constructor() {}

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  clickedDate: Date;

  clickedColumn: number;

  clickEventDay(event): void {
    console.log('Event clicked', event);
  }

  clickEventTime(event): void {
    console.log('Event clicked', event);
  }
}
