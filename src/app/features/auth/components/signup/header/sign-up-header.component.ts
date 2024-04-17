import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IAppConfig, appThemeConfig } from '@config';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'sign-up-header-component',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule],
  templateUrl: './sign-up-header.component.html',
  styleUrl: './sign-up-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpHeaderComponent implements OnInit {
  appConfig: IAppConfig = appThemeConfig;

  constructor() {}

  ngOnInit(): void {}
}
