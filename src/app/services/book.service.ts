import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  map,
  retry,
  switchMap,
} from 'rxjs';

import { ResultBooks } from '../models/result-books.interface';
import { Item } from '../models/item.interface';
import { Book } from '../models/book.interface';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly API_PATH_VOLUMES =
    'https://www.googleapis.com/books/v1/volumes';

  private httpClient = inject(HttpClient);

  private searchTermAction = new Subject<string>();
  searchTermAction$ = this.searchTermAction.asObservable();

  searchBook(searchTerm: string) {
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
    retry(3),
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
    console.error('error on request -> ', error);

    const bookError: Book = {
      error: true,
    };
    return new BehaviorSubject<Book[]>([bookError]).asObservable();
  }
}
