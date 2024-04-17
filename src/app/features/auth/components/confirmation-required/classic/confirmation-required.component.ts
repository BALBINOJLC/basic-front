import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appThemeConfig } from '@config';
import { fuseAnimations } from '@fuse/animations';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'confirmation-required-classic',
  templateUrl: './confirmation-required.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule],
})
export class ConfirmationRequiredClassicComponent {
  config = appThemeConfig;
  constructor() {}
}
