import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
import { of, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID
  const authService = inject(AuthService);

  // Check the authentication status
  return inject(AuthService)
    .checkAuthUser()
    .pipe(
      switchMap((authenticated) => {
        if (isPlatformBrowser(platformId)) {
          console.log('authenticated', authenticated);
          // Browser environment (client-side)
          if (!authenticated) {
            const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
            console.log('redirectURL', redirectURL);
            authService.signOut();
            const urlTree = router.parseUrl(`/auth/sign-in?${redirectURL}`);
            window.location.replace(urlTree.toString());
          }
          return of(authenticated);
        } else {
          return of(false);
        }
      })
    );
};
