import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  EMPTY,
  Observable,
  Subject,
  catchError,
  map,
  switchMap,
  tap,
} from 'rxjs';

import { ResultBooks } from '../models/result-books.interface';
import { Item } from '../models/item.interface';
import { Book } from '../models/book.interface';
import { SpinnerService } from './spinner.service';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly API_PATH_VOLUMES =
    'https://www.googleapis.com/books/v1/volumes';

  private httpClient = inject(HttpClient);
  private spinnerService = inject(SpinnerService);

  private searchTermAction = new Subject<string>();
  searchTermAction$ = this.searchTermAction.asObservable();
  error$ = new Subject<boolean>();

  searchBook(searchTerm: string) {
    this.spinnerService.show(true);
    this.searchTermAction.next(searchTerm);
  }

  resultsBooks$ = this.searchTermAction$.pipe(
    switchMap((term) =>
      this.httpClient.get<ResultBooks>(
        this.API_PATH_VOLUMES,
        this.getParams(term),
      ),
    ),
    map((res) => {
      return {
        items: res.items ? res.items : [],
        totalItems: res.totalItems,
      };
    }),
    map((res) => this.mapBookResultsToBookList(res.items)),
    tap(() => this.spinnerService.show(false)),
    catchError((err) => this.handleError(err)),
  );

  private mapBookResultsToBookList(items: Item[]) {
    return items.map((item) => {
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

  private getParams(term: string) {
    const params = new HttpParams().append('q', term);
    return { params };
  }

  private handleError(error: HttpErrorResponse): Observable<Book[]> {
    this.spinnerService.show(false);
    console.error('error on request -> ', error);

    this.error$.next(true);
    return EMPTY;
  }
}
