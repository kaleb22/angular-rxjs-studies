import { TestBed } from '@angular/core/testing';

import { BookService } from './book.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        SpinnerService,
      ],
    });
    service = TestBed.inject(BookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
