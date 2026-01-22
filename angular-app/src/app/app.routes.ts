import { Routes } from '@angular/router';
import { Product } from './product/product';
import { Home } from './home/home';
import { Shop } from './shop/shop';
import { Settings } from './settings/settings';
import { authGuard, adminGuard } from './auth-guard';

export const routes: Routes = [
    { path: 'products', component: Shop },
    { path: 'products/:id', component: Product },
    { path: 'settings', component: Settings, canActivate: [authGuard] },
    {
      path: 'admin',
      loadComponent: () => import('./settings/settings').then((c) => c.Settings),
      canMatch: [adminGuard]
    },
    { path: '', component: Home },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
