import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.interface';
import { AuthorPipe } from '../../pipes/author.pipe';
import { LimitDescriptionPipe } from '../../pipes/limit-description.pipe';
import { ModalBookComponent } from '../modal-book/modal-book.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, AuthorPipe, LimitDescriptionPipe, ModalBookComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() book: Book;
  isModalOpen = false;

  onModalChange(flag: boolean) {
    this.isModalOpen = flag;
  }
}
