import { Component, inject, signal, ChangeDetectionStrategy, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products as ProductsService } from '../products';
import { Review as ReviewType } from '../product-types';
import { Reviews } from './reviews/reviews';
import { CurrencyPipe } from '@angular/common';
import { Auth } from '../auth';

@Component({
  selector: 'app-product',
  imports: [CurrencyPipe, Reviews],
  templateUrl: './product.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Product {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductsService);
  private authService = inject(Auth);

  productId = parseInt(this.route.snapshot.params['id']);
  product = this.productService.getProduct(this.productId);

  #initialReviews = this.productService.getProductReviews(this.productId);
  #addedReviews = signal<ReviewType[]>([]);
  
  reviews = computed(() => {
    return [...this.#initialReviews(), ...this.#addedReviews()];
  });

  onNewReview = (review: { text: string; video?: string }) => {
    const user = this.authService.name() ?? 'Who am I?';

    this.productService.addProductReview(this.productId, review.text, user, review.video)
      .subscribe({
        next: (review) => {
          this.#addedReviews.update(reviews => [...reviews, review]);
        },
        error: (err) => {
          console.error('Failed to submit review:', err);
        }
    });
  };
}
