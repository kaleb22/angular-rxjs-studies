import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent {

  bookList: [] = [];

}
