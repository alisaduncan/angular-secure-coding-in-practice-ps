import { inject } from '@angular/core';
import { CanActivateFn, CanMatchFn, Router } from '@angular/router';
import { Auth } from './auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  return auth.isLoggedIn();
};

export const adminGuard: CanMatchFn = (routes, segments) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.role() === 'admin' || router.parseUrl('');
}