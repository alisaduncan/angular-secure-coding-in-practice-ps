import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Auth } from '../auth';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgOptimizedImage],
  template: `
    <header class="bg-[var(--header-bg-brown)] flex items-center py-5 px-[50px]">
      <h1 class="m-0 p-0.5">
        <a routerLink="/">
          <img ngSrc="/img/logo.png" alt="Bethany's Pie Shop Logo" height="48" width="151" priority/>
        </a>
      </h1>
      <nav class="flex-grow ml-[30px] text-[var(--site-font-color-light)]">
        <ul class="flex justify-end items-center list-none [&>li+li]:ml-[30px] font-semibold uppercase">
            <li>
              <a routerLink="/products">
                Shop
              </a>
            </li>
            <li>
              <a routerLink="/settings">
                Settings
              </a>
            </li>
            <li>
              <a routerLink="/admin">
                Admin
              </a>
            </li>
            @if (authService.isLoggedIn()) {
            <li class="border-1 border-white px-3 py-1 rounded-md hover:bg-[var(--site-bg-light-pink)] hover:text-[var(--header-bg-brown)] transition-colors">
              <button (click)="logout()" class="font-semibold uppercase cursor-pointer">
                Log out
              </button>
            </li>
            } @else {
            <li class="border-1 border-white px-3 py-1 rounded-md hover:bg-[var(--site-bg-light-pink)] hover:text-[var(--header-bg-brown)] transition-colors">
              <button (click)="login()" class="font-semibold uppercase cursor-pointer">
                Log in
              </button>
            </li>
            <li class="border-1 border-white px-3 py-1 rounded-md hover:bg-[var(--site-bg-light-pink)] hover:text-[var(--header-bg-brown)] transition-colors">
              <button (click)="loginAsAdmin()" class="font-semibold uppercase cursor-pointer">
                Log in as admin
              </button>
            </li>
            }
        </ul>
      </nav>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Header {
  authService = inject(Auth);

  login(): void {
    this.authService.loginAsEndUser();
  }

  loginAsAdmin(): void {
    this.authService.loginAsAdmin();
  }

  logout(): void {
    this.authService.logout();
  }
}
