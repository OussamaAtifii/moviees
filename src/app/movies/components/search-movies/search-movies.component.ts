import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { MoviesService } from '@app/movies/services';
import { formatVoteAverage } from '@app/shared/utils';
import { Movie } from '@app/movies/models';

@Component({
  selector: 'app-search-movies',
  imports: [FormsModule],
  templateUrl: './search-movies.component.html',
  styleUrl: './search-movies.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  foundMovies = signal<Movie[]>([]);
  query = signal('');
  querySubject = new Subject<string>();

  ngOnInit(): void {
    const subscription = this.querySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.moviesService.searchMovie(query)),
      )
      .subscribe({
        next: (movies) => {
          console.log(movies);
          this.foundMovies.set(movies);
          this.loading.set(false);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  searchMovie() {
    this.loading.set(true);

    if (this.query().trim() === '') {
      this.foundMovies.set([]);
      return;
    }

    this.querySubject.next(this.query());
  }

  getMovieImage(image: string): string {
    return `https://image.tmdb.org/t/p/w200${image}`;
  }

  getVoteAverage(voteAverage: number): string {
    return formatVoteAverage(voteAverage);
  }
}
