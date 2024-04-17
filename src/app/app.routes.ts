import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { LayoutComponent } from 'app/layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
  // Redirect empty path to '/example'
  { path: '', pathMatch: 'full', redirectTo: 'admin' },

  // Redirect signed-in user to the '/example'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'admin' },

  // Admin routes
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: initialDataResolver,
    },
    children: [
      {
        path: '',
        loadChildren: () => import('app/features/dashboard/dashboard.routes'),
      },
      {
        path: 'users',
        loadChildren: () => import('app/features/users/presentation/users.routes'),
      },
      {
        path: 'settings',
        loadChildren: () => import('app/features/settings/settings.routing'),
      },
    ],
  },

  // Auth routes for guests
  {
    path: 'auth',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () => import('app/features/auth/pages/confirmation-required/confirmation-required.routes'),
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('app/features/auth/pages/forgot-password/forgot-password.routes'),
      },
      {
        path: 'reset-password',
        loadChildren: () => import('app/features/auth/pages/reset-password/reset-password.routes'),
      },
      {
        path: 'sign-in',
        loadChildren: () => import('app/features/auth/pages/sign-in/sign-in.routes'),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('app/features/auth/pages/sign-up/sign-up.routes'),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: 'expired',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () => import('app/features/auth/pages/sign-out/sign-out.routes'),
      },
    ],
  },

  // Landing routes
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('app/features/landing/home/home.routes'),
      },
    ],
  },
];
