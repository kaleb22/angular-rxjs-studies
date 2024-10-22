import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  take,
  tap,
} from 'rxjs';
import { Item } from '../../models/item.interface';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit {
  searchField = new FormControl();

  private bookService = inject(BookService);

  resultsBooks$ = this.bookService.resultsBooks$;

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        filter((term) => term.length >= 3),
        map((term) => term.trim()),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((term) => this.bookService.searchBook(term));
  }
}
