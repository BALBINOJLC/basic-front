import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatSelect } from '@angular/material/select';
import { TranslocoModule } from '@ngneat/transloco';
import { commonModules } from '@shared';
import { MatRadioModule } from '@angular/material/radio';
import { FuseAlertComponent } from '@fuse/components/alert';
import { MatInput } from '@angular/material/input';

interface IPlan {
  id?: string;
  value: string;
  label: string;
  details: string;
  price: string;
}

@Component({
  selector: 'settings-plan-billing',
  templateUrl: './plan-billing.component.html',
  standalone: true,
  imports: [
    commonModules,
    ReactiveFormsModule,
    TranslocoModule,
    MatButtonModule,
    MatFormField,
    MatOption,
    MatSelect,
    MatIcon,
    MatInput,
    MatLabel,
    MatRadioModule,
    FuseAlertComponent,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPlanBillingComponent implements OnInit {
  planBillingForm: UntypedFormGroup;
  plans: IPlan[];

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
    this.planBillingForm = this._formBuilder.group({
      plan: ['team'],
      cardHolder: ['Brian Hughes'],
      cardNumber: [''],
      cardExpiration: [''],
      cardCVC: [''],
      country: ['usa'],
      zip: [''],
    });

    // Setup the plans
    this.plans = [
      {
        value: 'basic',
        label: 'BASIC',
        details: 'Starter plan for individuals.',
        price: '10',
      },
      {
        value: 'team',
        label: 'TEAM',
        details: 'Collaborate up to 10 people.',
        price: '20',
      },
      {
        value: 'enterprise',
        label: 'ENTERPRISE',
        details: 'For bigger businesses.',
        price: '40',
      },
    ];
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Track by function for ngFor loops
   *
   * @param index
   * @param item
   */
  trackByFn(index: number, item: IPlan): string | number {
    return item.id || index;
  }
}
