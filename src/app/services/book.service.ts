import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ResultBooks } from '../models/result-books.interface';

@Injectable({ providedIn: 'root' })
export class BookService {
  private readonly API_PATH_VOLUMES =
    'https://www.googleapis.com/books/v1/volumes';

  private httpClient = inject(HttpClient);

  getBooks(searchTerm: string): Observable<ResultBooks> {
    const params = new HttpParams().append('q', searchTerm);
    return this.httpClient
      .get<ResultBooks>(this.API_PATH_VOLUMES, { params })
      .pipe(
        map((res) => {
          return {
            items: res.items,
            totalItems: res.totalItems,
          };
        }),
      );
  }
}
