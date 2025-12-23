import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Review as ReviewType } from '../../product-types';

@Component({
  selector: 'app-review',
  template: `
    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <p class="text-sm font-semibold text-gray-900 mb-1">{{ review().user }}</p>
      <p class="text-gray-700">{{ review().text }}</p>

    </div>
  `,
  styles: ``,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Review {
  review = input.required<ReviewType>();
}
