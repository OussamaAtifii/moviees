import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { MovieComponent } from '../movie/movie.component';
import { Movie } from '@app/movies/models';
import { MoviesService } from '@app/movies/services';

@Component({
  selector: 'app-keep-watching',
  imports: [MovieComponent],
  templateUrl: './keep-watching.component.html',
  styleUrl: './keep-watching.component.css',
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

    const genresSubscription = this.moviesService
      .getGenres()
      .subscribe((genresData) => console.log(genresData.genres));

    this.destroyRef.onDestroy(() => {
      moviesSubscription.unsubscribe();
      genresSubscription.unsubscribe();
    });
  }
}
