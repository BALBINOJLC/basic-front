import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';

export const NoAuthGuard: CanActivateFn | CanActivateChildFn = () => {
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID

  // Check the authentication status
  return inject(AuthService)
    .checkAuthUser()
    .pipe(
      switchMap((authenticated) => {
        if (isPlatformBrowser(platformId)) {
          // If the user is authenticated...
          if (authenticated) {
            return of(router.parseUrl(''));
          }

          // Allow the access

          return of(true);
        } else {
          return of(false);
        }
      })
    );
};
