import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SignUpHeaderComponent } from '../header/sign-up-header.component';
import { SignUpFormComponent } from '../form/sign-up-form.component';

@Component({
  selector: 'app-sign-up-classic',
  standalone: true,
  imports: [CommonModule, SignUpHeaderComponent, SignUpFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpClassicComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
