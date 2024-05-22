import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of, switchMap } from 'rxjs';

export const FirebaseNoAuthGuard: CanActivateFn | CanActivateChildFn = () => {
  const router: Router = inject(Router);
  const afAuth: AngularFireAuth = inject(AngularFireAuth);

  // Check the authentication status using AngularFireAuth
  return afAuth.authState.pipe(
    switchMap((user) => {
      if (user) {
        // User is logged in, redirect to the home page
        return of(router.parseUrl(''));
      } else {
        // User is not logged in, allow access
        return of(true);
      }
    })
  );
};
