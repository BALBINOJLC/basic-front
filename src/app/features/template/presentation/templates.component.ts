import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation, type OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-templates',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './templates.component.html',
  styles: ':host {display: block; }',
})
export class TemplatesComponent implements OnInit {
  constructor() {}
  ngOnInit(): void {}
}
