import { Component, computed, input } from '@angular/core';
import { Movie } from '@app/movies/models/movie.model';
import { MovieComponent } from '../movie/movie.component';

@Component({
  selector: 'app-movies-container',
  imports: [MovieComponent],
  templateUrl: './movies-container.component.html',
})
export class MoviesContainerComponent {
  movies = input.required<Movie[]>();
  title = input.required<string>();
  type = input<'watching' | 'popular'>();

  addProgressBar = computed(() => {
    return this.type() === 'watching';
  });
}
