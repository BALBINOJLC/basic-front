import { PLATFORM_ID, inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, switchMap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const FirebaseAuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
  const router: Router = inject(Router);
  const platformId = inject(PLATFORM_ID); // Inject PLATFORM_ID
  const afAuth: AngularFireAuth = inject(AngularFireAuth); // Inject AngularFireAuth

  // Check the authentication status using AngularFireAuth
  return afAuth.authState.pipe(
    switchMap((user) => {
      if (isPlatformBrowser(platformId)) {
        // Browser environment (client-side)
        console.log('User:', user);

        if (!user) {
          const redirectURL = state.url === '/sign-out' ? '' : `redirectURL=${state.url}`;
          const urlTree = router.parseUrl(`/auth/sign-in?${redirectURL}`);
          window.location.replace(urlTree.toString());
        }
        return of(!!user); // Return true if user is logged in, false otherwise
      } else {
        return of(false);
      }
    })
  );
};
