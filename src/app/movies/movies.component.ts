import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { MoviesService } from '@services/movies.service';
import { Movie } from '@models/movie.model';
import { MoviesContainerComponent } from './components/movies-container/movies-container.component';
import { tap } from 'rxjs';

@Component({
  selector: 'app-movies',
  imports: [MoviesContainerComponent],
  templateUrl: './movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  popularMovies = signal<Movie[]>([]);
  keepWatchingMovies = signal<Movie[]>([]);

  ngOnInit(): void {
    // Fetch most popular movies
    const mostPopularSubscription = this.moviesService
      .getMostPopularMovies()
      .subscribe((movies) => {
        this.popularMovies.set(movies);
      });

    const keepWatchingSubscription = this.moviesService
      .getKeepWatchingMovies()
      .subscribe((movies) => {
        this.keepWatchingMovies.set(movies);
      });

    // Unsubscribe when component is destroyed
    this.destroyRef.onDestroy(() => {
      mostPopularSubscription.unsubscribe();
      keepWatchingSubscription.unsubscribe();
    });
  }
}
