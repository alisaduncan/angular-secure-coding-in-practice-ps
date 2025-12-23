import { HttpClient } from '@angular/common/http';
import { inject, Injectable, Signal } from '@angular/core';
import { Product, Review } from './product-types';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';

export const API = './api';
@Injectable({
  providedIn: 'root'
})
export class Products {

  private http = inject(HttpClient);

  constructor() { }

  getProducts(query?: string):Observable<Product[]>  {
    let url = new URL(`${API}/products`, window.location.origin);
    if (query) {
      url.searchParams.set('q', query);
    }

    return this.http.get<{items: Product[]}>(url.toString()).pipe(
      map(res => res.items),
    );
  }

  getProduct(id: number): Signal<Product | undefined> {
    return toSignal(this.http.get<Product>(`${API}/products/${id}`), {initialValue: undefined});
  }

  getFeatured(): Signal<Product[]> {
    return toSignal(this.http.get<Product[]>(`${API}`), { initialValue: []});
  }

  // Get reviews for a specific cafe
  getProductReviews(productId: number): Signal<Review[]> {
    return toSignal(this.http.get<{productId: number, reviews: Review[]}>(`${API}/products/${productId}/reviews`).pipe(
      map(res => res.reviews || [])
    ), { initialValue: []});
  }

  // Add a new review to a product
  addProductReview(productId: number, review: string, user: string, video?: string): Observable<Review> {
    return this.http.post<Review>(`${API}/products/${productId}/reviews`, { review, user, video });
  }
}
