import { Movie } from '@app/movies/models/movie.model';
import { Genre } from '../../movies/models/genre.model';

/**
 * Obtiene los nombres de los géneros de una película a partir de sus IDs.
 *
 * @param genresId - IDs de los géneros de la película.
 * @param genres - Lista de géneros disponibles con `id` y `name`.
 * @returns Una cadena con los nombres de los géneros separados por comas o una cadena vacía si no hay coincidencias.
 *
 * @example
 * const genresId = [1, 2, 3];
 * const genres = [
 *   { id: 1, name: 'Acción' },
 *   { id: 2, name: 'Aventura' },
 *   { id: 3, name: 'Comedia' },
 *   { id: 4, name: 'Drama' }
 * ];
 * getMovieGenres(genresId, genres); // "Acción, Aventura, Comedia"
 */
export function getMovieGenres(genresId: number[], genres: Genre[]): string {
  if (!genresId.length || !genres.length) return '';

  genresId = genresId.splice(0, 3);

  const movieGenres = genres.filter((genre) => genresId.includes(genre.id));
  return movieGenres.map((genre) => genre.name).join(', ');
}

/**
 * Formatea una calificación promedio a un valor con un decimal.
 *
 * @param voteAverage - La calificación promedio como número.
 * @returns El valor formateado como una cadena con un decimal.
 *
 * @example
 * formatVoteAverage(8.456); // "8.5"
 */
export function formatVoteAverage(voteAverage: number): string {
  return voteAverage.toFixed(1);
}

function getRandomPorcentage() {
  return Math.floor(Math.random() * 100);
}

export function addProgressBarPercentage(movies: Movie[]) {
  const updatedMovies = movies.map((movie) => ({
    ...movie,
    watchPercentage: getRandomPorcentage(),
  }));

  return updatedMovies;
}
