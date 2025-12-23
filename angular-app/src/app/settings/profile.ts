import { Component, inject } from '@angular/core';
import { Auth } from '../auth';

@Component({
  selector: 'app-profile',
  imports: [],
  template: `
    <div class="max-w-3xl mb-8 mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <div class="border-l-4 border-pink-600 pl-6 mb-8">
        <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Hi there, {{ authService.name() ?? 'Guest' }}!</h1>
        <p class="text-lg text-gray-600">Your personal profile</p>
      </div>

      <div class="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <p class="text-gray-800 leading-relaxed">
          Welcome to the Profile component! I display and manage all sorts of private user information.
          You don't want to show this info to the public for sure!
        </p>
      </div>
    </div>
  `,
  styles: ``,
})
export class Profile {
  authService = inject(Auth);
}
