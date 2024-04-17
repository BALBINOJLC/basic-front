import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { TranslocoModule } from '@ngneat/transloco';
import { commonModules } from '@shared';

@Component({
  selector: 'settings-notifications',
  templateUrl: './notifications.component.html',
  standalone: true,
  imports: [commonModules, TranslocoModule, ReactiveFormsModule, MatButton, MatSlideToggle],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNotificationsComponent implements OnInit {
  notificationsForm: UntypedFormGroup;

  /**
   * Constructor
   */
  constructor(private _formBuilder: UntypedFormBuilder) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    // Create the form
    this.notificationsForm = this._formBuilder.group({
      communication: [true],
      security: [true],
      meetups: [false],
      comments: [false],
      mention: [true],
      follow: [true],
      inquiry: [true],
    });
  }
}
