import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MoviesService } from '../../services/movies.service';
import {
  formatVoteAverage,
  getMovieGenres,
} from '../../../shared/utils/helpers';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent {
  private moviesService = inject(MoviesService);
  movie = input.required<Movie>();

  get image() {
    return `https://image.tmdb.org/t/p/w400${this.movie().backdrop_path}`;
  }

  get voteAverage(): string {
    return formatVoteAverage(this.movie().vote_average);
  }

  get movieGenres() {
    return getMovieGenres(
      this.movie().genre_ids,
      this.moviesService.allGenres(),
    );
  }
}
