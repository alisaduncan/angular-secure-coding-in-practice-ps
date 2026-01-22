import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Review as ReviewType } from '../../product-types';
import { VideoPlayer } from './video-player';

@Component({
  selector: 'app-review',
  template: `
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <p class="text-sm font-semibold text-gray-900 mb-1">{{ review().user }}</p>
      <p class="text-gray-700" [innerHTML]="review().text"></p>

      @if(review().video) {
        <app-video-player [video]="review().video!" />
      }
    </div>
  `,
  styles: ``,
  imports: [VideoPlayer],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Review {
  review = input.required<ReviewType>();
}
