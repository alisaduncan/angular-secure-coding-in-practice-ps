import { Component } from '@angular/core';
import { Admin } from './admin';
import { Profile } from "./profile";

@Component({
  selector: 'app-settings',
  imports: [Admin, Profile],
  template: `
    <section class="space-y-16 py-12">
      <app-profile />
      <app-admin />
    </section>
  `,
  styles: ``,
})
export class Settings {
}
