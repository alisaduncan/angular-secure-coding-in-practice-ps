import { Component, inject, signal, resource } from '@angular/core';
import { Products as ProductsService } from '../products';
import { Hero } from '../hero/hero';
import { ProductItem } from "./product-item";
import { form, FormField } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

interface SearchRequest {
  query: string;
}

@Component({
  selector: 'app-shop',
  imports: [Hero, ProductItem, FormField],
  template: `
  <app-hero />
  <section class="my-[50px] px-8">
    <h2 class="text-4xl font-extrabold mb-16 text-center">Shop our baked goods</h2>

    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex justify-center">
        <input
          type="text"
          [formField]="searchForm.query"
          (keyup)="onSearch()"
          placeholder="Search products..."
          class="w-full md:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
        />
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
      @for (product of productsResource.value() ?? []; track product.id) {
        <app-product-item [product]="product" />
      }
    </div>
  </section>
`,
  styles: ``,
})
export class Shop {
  private productService = inject(ProductsService);

  searchModel = signal({ query: '' });
  searchForm = form(this.searchModel);

  #searchQuery = signal('');

  productsResource = resource({
    params: () => ({ query: this.#searchQuery() }),
    loader: ({ params }) => firstValueFrom(this.productService.getProducts(params.query)),
  });

  onSearch() {
    const query = this.searchForm.query().value();
    this.#searchQuery.set(query);
  }
}
