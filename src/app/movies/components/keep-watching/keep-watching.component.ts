import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { MovieComponent } from '@components/movie/movie.component';
import { Movie } from '@models/movie.model';
import { MoviesService } from '@services/movies.service';

@Component({
  selector: 'app-keep-watching',
  imports: [MovieComponent],
  templateUrl: './keep-watching.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KeepWatchingComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  movies = signal<Movie[]>([]);

  ngOnInit(): void {
    const moviesSubscription = this.moviesService
      .getKeepWatchingMovies()
      .subscribe((movies) => {
        this.movies.set(movies);
      });

    this.destroyRef.onDestroy(() => {
      moviesSubscription.unsubscribe();
    });
  }
}
