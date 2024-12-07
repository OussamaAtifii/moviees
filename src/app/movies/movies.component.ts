import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { KeepWatchingComponent, MovieComponent } from './components';
import { Movie } from './models';
import { MoviesService } from './services';

@Component({
  selector: 'app-movies',
  imports: [KeepWatchingComponent, MovieComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    // Fetch most popular movies
    const subscription = this.moviesService
      .getMostPopularMovies()
      .subscribe((movies) => this.movies.set(movies));

    // Unsubscribe when component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
