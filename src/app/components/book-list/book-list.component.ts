import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BookComponent } from '../book/book.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { BookService } from '../../services/book.service';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
} from 'rxjs';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, ReactiveFormsModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit, OnDestroy {
  searchField = new FormControl();

  private bookService = inject(BookService);

  resultsBooks$ = this.bookService.resultsBooks$;

  private readonly unsub$ = new Subject<void>();

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        filter((term) => term.length >= 3),
        map((term) => term.trim()),
        debounceTime(300),
        distinctUntilChanged(),
        takeUntil(this.unsub$),
      )
      .subscribe((term) => this.bookService.searchBook(term));
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
