import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { appThemeConfig } from '@config';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'reset-password-header-component',
  templateUrl: 'reset-password-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule, TranslocoModule],
})
export class ResetPasswordHeaderComponent {
  appConfig = appThemeConfig;
  constructor() {}
}
