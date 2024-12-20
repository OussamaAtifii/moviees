import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
} from '@angular/core';

import { ModalComponent } from '../modal.component';
import { DatePipe } from '@angular/common';
import { MoviesService } from '@app/movies/services/movies.service';

@Component({
  selector: 'app-movie-modal',
  imports: [ModalComponent, DatePipe],
  templateUrl: './movie-modal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieModalComponent implements OnDestroy {
  private movieService = inject(MoviesService);
  movie = this.movieService.selectedMovie;

  onClearSelectedMovie() {
    this.movieService.removeSelectedMovie();
  }

  ngOnDestroy(): void {
    this.movieService.removeSelectedMovie();
  }
}
