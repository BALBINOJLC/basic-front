import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IAppConfig, appThemeConfig } from '@config';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'app-forgot-password-header',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule],
  templateUrl: './forgot-password-header.component.html',
  styleUrl: './forgot-password-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordHeaderComponent implements OnInit {
  appConfig: IAppConfig = appThemeConfig;

  constructor() {}

  ngOnInit(): void {}
}
