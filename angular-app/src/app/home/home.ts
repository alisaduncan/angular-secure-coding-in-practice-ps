import { Component, inject, resource } from '@angular/core';
import { Products } from '../products';
import { Hero } from "../hero/hero";
import { Featured } from "./featured/featured";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [Hero, Featured],
  templateUrl: './home.html',
  styles: ``,
})
export class Home {
  private productService = inject(Products);

  // Get all products from the service
  productsResource = resource({
    loader: () => firstValueFrom(this.productService.getProducts())
  });

  // Pick a random product as featured
  get featuredProduct() {
    const allProducts = this.productsResource.value();
    if (!allProducts || allProducts.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * allProducts.length);
    return allProducts[randomIndex];
  }
}
