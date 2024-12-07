import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MoviesComponent } from './movies/movies.component';
import { SearchMoviesComponent } from './movies/components';

@Component({
  selector: 'app-root',
  imports: [MoviesComponent, SearchMoviesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
