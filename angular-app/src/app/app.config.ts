import { ApplicationConfig, CSP_NONCE, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { 
      provide: CSP_NONCE, 
      useValue: '123'
    }
  ]
};
