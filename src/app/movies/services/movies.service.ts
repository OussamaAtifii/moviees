import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { getMovieGenres } from '@app/shared/utils/helpers';
import { Movie, MoviesData } from '@models/movie.model';
import { Genre, GenresData } from '@models/genre.model';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  // The base URL for the TMDB(The Movie Database) API
  private readonly baseUrl = 'https://api.themoviedb.org/3';

  private httpClient = inject(HttpClient);
  private genres = signal<Genre[]>([]);

  // Read-only signal exposing the list of genres
  allGenres = this.genres.asReadonly();

  private _selectedMovie = signal<Movie | null>(null);
  selectedMovie = this._selectedMovie.asReadonly();

  /**
   * Fetch "now playing" movies.
   *
   * @returns Observable emmiting "now playing" movies array.
   */
  getKeepWatchingMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(`${this.baseUrl}/movie/now_playing`)
      .pipe(map((moviesData) => this.filterMovies(moviesData.results)));
  }

  /**
   * Fetch the most popular movies.
   * @returns Observable emmiting "popular" movies array.
   */
  getMostPopularMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(`${this.baseUrl}/movie/popular`)
      .pipe(map((moviesData) => this.filterMovies(moviesData.results)));
  }

  /**
   * Fetch the list of all available genres.
   * Updates the internal `genres` signal with the retrieved data.
   *
   * @returns Observable emmiting GenresData.
   */
  getGenres(): Observable<GenresData> {
    // The `tap` operator allows performing side effects without requiring a subscription here.
    return this.httpClient
      .get<GenresData>(`${this.baseUrl}/genre/movie/list`)
      .pipe(
        tap({
          next: (genresData) => this.genres.set(genresData.genres),
        }),
      );
  }

  // Fetch movies by the user
  searchMovie(query: string): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(`${this.baseUrl}/search/movie?query=${query}`)
      .pipe(map((moviesData) => this.filterMovies(moviesData.results)));
  }

  // Filter movies with a vote average greater than 0 and a backdrop path
  filterMovies(movies: Movie[]) {
    return movies
      .filter((movie) => movie.vote_average > 0 && movie.backdrop_path !== null)
      .map((movie) => ({
        ...movie,
        genres: getMovieGenres(movie.genre_ids, this.genres()),
      }));
  }

  // Set selected movie to show it in the modal
  setSelectedMovie(movie: Movie | null) {
    this._selectedMovie.set(movie);
  }

  // Remove the movie when the modal get closed
  removeSelectedMovie() {
    this._selectedMovie.set(null);
  }
}
