import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MovieComponent } from '@components/movie/movie.component';
import { KeepWatchingComponent } from '@components/keep-watching/keep-watching.component';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@models/movie.model';

@Component({
  selector: 'app-movies',
  imports: [KeepWatchingComponent, MovieComponent],
  templateUrl: './movies.component.html',
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
      .subscribe((movies) => {
        console.log(movies);

        this.movies.set(movies);
      });

    // Unsubscribe when component is destroyed
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
