import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Review as ReviewType } from '../../product-types';
import { Review } from './review';
import { AddReview } from './add-review';
import { AddReviewWithVideo } from "./add-review-with-video";


@Component({
  selector: 'app-reviews',
  imports: [Review, AddReview],
  template: `
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Reviews</h2>
    <div class="mb-6 space-y-4">
      <!-- Reviews List -->
      @for (review of reviews(); track review.id) {
        <div>
          <app-review [review]="review" />
        </div>
      } @empty {
        <p class="text-gray-500 italic">No reviews yet. Be the first to review!</p>
      }
    </div>

    <!-- Add Review Form -->
    <app-add-review (submitReview)="onSubmitReview($event)" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Reviews {

  reviews = input.required<ReviewType[]>();
  newReview = output<ReviewType>();

  onSubmitReview(newReview: ReviewType) {
    this.newReview.emit(newReview);
  }
}
