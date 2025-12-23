import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { Product } from '../product-types';

@Component({
  selector: 'app-product-item',
  imports: [CurrencyPipe, RouterLink],
  template: `
    @let productData = product();
    <a
      [routerLink]="['/products', productData.id]"
      class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow no-underline"
    >
      <img
        src="{{productData.image}}"
        alt="{{productData.name}}"
        class="w-full h-48 object-cover"
      />

      <div class="p-6">
        <h3 class="text-2xl font-bold text-gray-900 mb-2">{{productData.name}}</h3>
        <p class="text-2xl font-bold text-pink-600 mb-4">{{productData.price | currency}}</p>
        <p class="text-gray-700 mb-4">{{productData.description}}</p>
      </div>
    </a>
`,
  styles: ``,
})
export class ProductItem {
  product = input.required<Product>();
}
