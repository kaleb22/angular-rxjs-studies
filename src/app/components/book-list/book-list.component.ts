import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  Subject,
  takeUntil,
} from 'rxjs';

import { BookComponent } from '../book/book.component';
import { BookService } from '../../services/book.service';
import { SpinnerComponent } from './../spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, BookComponent, ReactiveFormsModule, SpinnerComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent implements OnInit, OnDestroy {
  private bookService = inject(BookService);
  private spinnerService = inject(SpinnerService);

  private readonly unsub$ = new Subject<void>();
  resultsBooks$ = this.bookService.resultsBooks$;
  spinnerAction$ = this.spinnerService.spinnerAction$;
  error$ = this.bookService.error$;
  searchField = new FormControl();

  ngOnInit() {
    this.searchField.valueChanges
      .pipe(
        filter((term) => term.length >= 3),
        map((term) => term.trim()),
        debounceTime(600),
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
