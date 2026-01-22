import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  let authRequest = req;

  const token = auth.accessToken();
  const trustedOrigins = ['./api/'];

  if (trustedOrigins.some(origin => req.url.startsWith(origin)) && token) {
    authRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  return next(authRequest);
};