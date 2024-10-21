import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() book: Book;
  isModalOpen = false;

  onModalChange(flag: boolean) {
    // TODO
  }
}
