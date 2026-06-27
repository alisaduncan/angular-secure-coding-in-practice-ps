import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { Review } from '../../product-types';

@Component({
  selector: 'app-add-review',
  imports: [FormField],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 class="text-xl font-semibold text-gray-900 mb-4">Add Your Review</h3>
      <!-- TODO: User name will be obtained from authenticated user -->
      
        <div class="mb-4">
          <label for="reviewText" class="block text-sm font-medium text-gray-700 mb-2">
            Your Review
          </label>
          <textarea
            id="reviewText"
            [formField]="reviewForm.reviewText"
            rows="4"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Share your experience..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button
          (click)="handleSubmit()"
          [disabled]="!reviewForm.reviewText().valid()"
          class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          Submit Review
        </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class AddReview {
  reviewModel = signal({ reviewText: '' });
  
  reviewForm = form(this.reviewModel, (schema) => {
    required(schema.reviewText);
  });
  
  submitReview = output<Review>();
  
  handleSubmit() {

    if (this.reviewForm.reviewText().valid()) {
      const reviewText = this.reviewForm.reviewText().value().trim();
      
      if (reviewText) {
        this.submitReview.emit({
          text: reviewText
        });
        
        // Reset form
        this.reviewForm.reviewText().value.set('');
      }
    }
  }
}
