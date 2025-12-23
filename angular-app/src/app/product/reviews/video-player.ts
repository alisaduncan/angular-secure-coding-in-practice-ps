import { Component, input, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  imports: [],
  template: `
    @if (video()) {
      <div class="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
        <iframe
          [src]="videoUrl()"
          width="560"
          height="315"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full rounded-lg"
        ></iframe>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ``,
})
export class VideoPlayer {
  private sanitizer = inject(DomSanitizer);
  
  video = input.required<string>();
  videoUrl = computed(() => this.video());
  readonly #videoHost = 'https://www.youtube.com/embed';

}
