import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BooleanInput } from '@angular/cdk/coercion';
import { Subject } from 'rxjs';
import { IUser } from '@users';
import { basePath } from 'app/mock-api/common/navigation/data';
import { commonModules, materialToolsModules } from '@shared';
import { AuthService } from '@core';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  exportAs: 'user',
  imports: [...commonModules, ...materialToolsModules, RouterModule],
})
export class UserComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_showAvatar: BooleanInput;

  @Input() showAvatar: boolean = true;
  @Input({ required: true }) user!: IUser;
  basePath = basePath;
  private _unsubscribeAll: Subject<void> = new Subject<void>();

  /**
   * Constructor
   */
  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user status
   *
   * @param status
   */
  updateUserStatus(status: string): void {
    // Return if user is not available
    console.log(status);

    if (!this.user) {
      return;
    }
  }

  /**
   * Sign out
   */
  signOut(): void {
    this._authService.signOut();
  }
}
