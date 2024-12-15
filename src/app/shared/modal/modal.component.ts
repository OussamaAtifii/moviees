import {
  Component,
  ElementRef,
  inject,
  OnInit,
  viewChild,
} from '@angular/core';
import { MoviesService } from '@app/movies/services/movies.service';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
})
export class ModalComponent implements OnInit {
  private movieService = inject(MoviesService);

  private dialogEl =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  ngAfterViewInit(): void {
    this.dialogEl().nativeElement.showModal();
  }

  onDialogCancel() {
    this.movieService.removeSelectedMovie();
  }

  ngOnInit(): void {
    console.log('MODAL RENDERIZADA');
  }
}
