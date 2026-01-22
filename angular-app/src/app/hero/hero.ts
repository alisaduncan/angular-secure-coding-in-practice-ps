import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [ NgOptimizedImage, RouterLink],
  templateUrl: './hero.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    h2 {
      color: slateblue;
    }
  `
})
export class Hero {

}
