import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';

import { formatVoteAverage } from '@app/shared/utils/helpers';
import { Movie } from '@models/movie.model';
import { MoviesService } from '@services/movies.service';

@Component({
  selector: 'app-search-movies',
  imports: [FormsModule],
  templateUrl: './search-movies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchMoviesComponent implements OnInit {
  private moviesService = inject(MoviesService);
  private destroyRef = inject(DestroyRef);

  loading = signal(false);
  foundMovies = signal<Movie[]>([]);
  query = signal('');
  querySubject = new Subject<string>();
  isInputFocused = signal(false);

  ngOnInit(): void {
    const subscription = this.querySubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) => this.moviesService.searchMovie(query)),
      )
      .subscribe({
        next: (movies) => {
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

  onFocus() {
    this.isInputFocused.set(true);
  }

  onBlur() {
    setTimeout(() => {
      this.isInputFocused.set(false);
    }, 100);
  }

  getMovieImage(image: string): string {
    return `https://image.tmdb.org/t/p/w200${image}`;
  }

  getVoteAverage(voteAverage: number): string {
    return formatVoteAverage(voteAverage);
  }
}
