import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';

import { formatVoteAverage, getMovieGenres } from '@app/shared/utils/helpers';
import { Movie } from '@models/movie.model';
import { MoviesService } from '@services/movies.service';

@Component({
  selector: 'app-movie',
  imports: [],
  templateUrl: './movie.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieComponent implements OnInit {
  private moviesService = inject(MoviesService);
  movie = input.required<Movie>();
  movieGenresList: string = '';

  get image() {
    return `https://image.tmdb.org/t/p/w400${this.movie().backdrop_path}`;
  }

  get voteAverage(): string {
    return formatVoteAverage(this.movie().vote_average);
  }

  movieGenres() {
    console.log(this.movie().genre_ids);

    return getMovieGenres(
      this.movie().genre_ids,
      this.moviesService.allGenres(),
    );
  }

  onSelectMovie() {
    this.moviesService.setSelectedMovie(this.movie());
  }

  ngOnInit(): void {
    console.log('MOVIE RENDERIZADA');
    this.movieGenresList = this.movieGenres();
  }
}
