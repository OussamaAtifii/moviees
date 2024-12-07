import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { environment } from '@app/environments/environment';

/**
 * Intercepts HTTP requests to add an authorization token to the headers.
 *
 * @param request - The original HTTP request.
 * @param next - The next handler in the HTTP request chain.
 * @returns The modified HTTP request with the authorization token in the headers.
 */
export function authInterceptor(
  request: HttpRequest<unknown>,
  next: HttpHandlerFn,
) {
  const reqWithToken = request.clone({
    headers: request.headers.set(
      'authorization',
      `Bearer ${environment.TMDB_TOKEN}`,
    ),
  });

  return next(reqWithToken);
}
