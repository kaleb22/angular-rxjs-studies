import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';
import { take } from 'rxjs';
import { Item } from '../../models/item.interface';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, FormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  bookList: Book[] = [];
  searchField: string = '';

  private bookService = inject(BookService);

  search() {
    this.bookService
      .getBooks(this.searchField)
      .pipe(take(1))
      .subscribe((res) => this.mapBookResultsToBookList(res.items));
  }

  mapBookResultsToBookList(items: Item[]) {
    this.bookList = items.map((item) => {
      return {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
        previewLink: item.volumeInfo?.previewLink,
      } as Book;
    });
  }
}
