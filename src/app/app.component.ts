import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';

import { MovieModalComponent } from './shared/modal/movie-modal/movie-modal.component';
import { MoviesService } from './movies/services/movies.service';
import { SearchMoviesComponent } from './movies/components/search-movies/search-movies.component';
import { MoviesComponent } from './movies/movies.component';

@Component({
  selector: 'app-root',
  imports: [MoviesComponent, SearchMoviesComponent, MovieModalComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private movieService = inject(MoviesService);
  selectedMovie = this.movieService.selectedMovie;
  loading = signal(true);

  ngOnInit(): void {
    this.movieService.getGenres().subscribe({
      next: () => console.log('Genres generated'),
      error: (error) => console.log('Error generating genres: ', error),
      complete: () => this.loading.set(false),
    });
  }
}
