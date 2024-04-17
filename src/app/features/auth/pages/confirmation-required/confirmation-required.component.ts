import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { TSignInTemplate } from '@auth';
import { ConfirmationRequiredClassicComponent } from '../../components/confirmation-required';

@Component({
  selector: 'app-confirmation-required',
  standalone: true,
  imports: [CommonModule, ConfirmationRequiredClassicComponent],
  templateUrl: './confirmation-required.component.html',
  styleUrl: './confirmation-required.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationRequiredComponent implements OnInit {
  template: TSignInTemplate = 'classic';

  ngOnInit(): void {}
}
