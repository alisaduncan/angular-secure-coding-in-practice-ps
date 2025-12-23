import { Injectable, signal, computed, effect } from '@angular/core';

export type ROLE = 'enduser' | 'admin';
export interface AuthState {
  isAuthenticated: boolean;
  role: ROLE;
  accessToken: string | null;
  name: string | null;
}

const defaultAuthState: AuthState = {
  isAuthenticated: false,
  role: 'enduser',
  accessToken: null,
  name: null
}

@Injectable({
  providedIn: 'root',
})
export class Auth {

  readonly #storageKey = 'authState';
  private authState = signal<AuthState>(defaultAuthState);

  isLoggedIn = computed(() => this.authState().isAuthenticated);

  role = computed(() => this.authState().role);

  accessToken = computed(() => {
    if (!this.authState().isAuthenticated) {
      return null;
    }
    return this.authState().accessToken;
  });

  name = computed(() => {
    if (!this.authState().isAuthenticated) {
      return null;
    }
    return this.authState().name;
  });

  constructor() {
    const storageVal  = localStorage.getItem(this.#storageKey);
    if (storageVal) {
      const storageAuth = JSON.parse(storageVal) as AuthState ?? defaultAuthState;
      this.authState.set(storageAuth);
    }

    effect(() => {
      localStorage.setItem(this.#storageKey, JSON.stringify(this.authState()));
    })
  }

  loginAsEndUser(): void {
    this.authState.set({
      isAuthenticated: true,
      role: 'enduser',
      accessToken: 'token-with-enduser-claims',
      name: 'Carb happy'
    });
  }

  loginAsAdmin(): void {
    this.authState.set({
      isAuthenticated: true,
      role: 'admin',
      accessToken: 'token-with-admin-claims',
      name: 'Administrator'
    });
  }

  public logout(): void {
    this.authState.set(defaultAuthState);
  }
}
