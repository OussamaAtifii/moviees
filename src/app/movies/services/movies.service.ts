import { inject, Injectable, signal } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Genre, GenresData } from '../models/genre.model';
import { Movie, MoviesData } from '../models/movie.model';

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

  /**
   * Fetch "now playing" movies.
   *
   * @returns Observable emmiting "now playing" movies array.
   */
  getKeepWatchingMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(`${this.baseUrl}/movie/now_playing`)
      .pipe(map((moviesData) => moviesData.results));
  }

  /**
   * Fetch the most popular movies.
   * @returns Observable emmiting "popular" movies array.
   */
  getMostPopularMovies(): Observable<Movie[]> {
    return this.httpClient
      .get<MoviesData>(`${this.baseUrl}/movie/popular`)
      .pipe(map((moviesData) => moviesData.results));
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
      .pipe(
        map((moviesData) =>
          moviesData.results.filter(
            (movie) => movie.vote_average > 0 && movie.backdrop_path !== null,
          ),
        ),
      );
  }
}
