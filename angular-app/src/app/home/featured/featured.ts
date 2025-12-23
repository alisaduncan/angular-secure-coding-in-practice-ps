import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../../product-types';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-featured',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './featured.html'
})
export class Featured {
  featured = input.required<Product>();
}
