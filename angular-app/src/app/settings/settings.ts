import { Component, computed, inject } from '@angular/core';
import { Admin } from './admin';
import { Profile } from "./profile";
import { Auth } from '../auth';

@Component({
  selector: 'app-settings',
  imports: [Admin, Profile],
  template: `
    <section class="space-y-16 py-12">
    @if(isAdmin()) {
      <app-admin />
    } @else { 
      <app-profile />
    }
    </section>
  `,
  styles: ``,
})
export class Settings {
  #auth = inject(Auth);
  isAdmin = computed(() => this.#auth.role() === 'admin');
}
