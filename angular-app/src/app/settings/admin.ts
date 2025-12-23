import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  imports: [],
  template: `
    <!-- <div class="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4"> -->
      <!-- <div class="max-w-4xl mx-auto"> -->
        <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div class="border-l-4 border-red-600 pl-6 mb-8">
            <h1 class="text-4xl font-extrabold text-gray-900 mb-2">Admin Dashboard</h1>
            <p class="text-lg text-gray-600">Restricted access area requiring Admin role</p>
          </div>

          <div class="bg-red-50 border border-red-200 rounded-xl p-6 mb-8">
            <h2 class="text-xl font-bold text-red-900 mb-2">⚠️ Admin Access Required</h2>
            <p class="text-red-800">
              This section contains sensitive administrative functions for managing the bakery system.
            </p>
          </div>

          <div class="space-y-6">
            <div class="bg-gray-50 rounded-lg p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Sample Admin Tasks</h3>
              <ul class="list-disc list-inside space-y-2 text-gray-700">
                <li>Manage user accounts and permissions</li>
                <li>Review and moderate product reviews</li>
                <li>Update product inventory and pricing</li>
                <li>View analytics and sales reports</li>
                <li>Configure system settings</li>
              </ul>
            </div>
          </div>
        </div>
      <!-- </div> -->
    <!-- </div> -->
  `,
  styles: ``,
})
export class Admin {

}
