import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { appThemeConfig } from '@config';
import { TranslocoModule } from '@ngneat/transloco';

@Component({
  selector: 'sign-in-header-component',
  standalone: true,
  imports: [CommonModule, TranslocoModule, RouterModule],
  templateUrl: './sign-in-header.component.html',
  styleUrl: './sign-in-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInHeaderComponent implements OnInit {
  appConfig = appThemeConfig;

  constructor() {}

  ngOnInit(): void {}
}
