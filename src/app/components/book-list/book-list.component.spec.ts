import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListComponent } from './book-list.component';
import { BookService } from '../../services/book.service';
import { SpinnerService } from '../../services/spinner.service';
import { provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Book } from '../../models/book.interface';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [BookService, SpinnerService, provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display msg when search returns no results', () => {
    component.resultsBooks$ = of([]);

    fixture.detectChanges();
    const errorDiv = fixture.debugElement.query(
      By.css('[data-testId="no-results"]'),
    );
    expect(errorDiv).toBeTruthy();
  });

  it('should display books when request returns results', () => {
    const booksArr: Book[] = [];
    for (let i = 0; i < 3; i++) {
      const book: Book = {
        thumbnail: 'http://test.com',
      };
      booksArr.push(book);
    }

    component.resultsBooks$ = of(booksArr);
    fixture.detectChanges();

    const appBookElements = fixture.debugElement.queryAll(
      By.css('[data-testId="app-book"]'),
    );
    expect(appBookElements).toHaveSize(3);
  });

  it('should display error msg when request fails', () => {
    component.error$.next(true);
    fixture.detectChanges();

    const errorDiv = fixture.debugElement.query(
      By.css('[data-testId="on-error"]'),
    );
    const noResultsDiv = fixture.debugElement.query(
      By.css('[data-testId="no-results"]'),
    );
    expect(errorDiv).toBeTruthy();
    expect(noResultsDiv).toBeFalsy();
  });

  it('should display initialScreen template on initial loading', () => {
    const onLoadDiv = fixture.debugElement.query(
      By.css('[data-testId="on-load"]'),
    );
    expect(onLoadDiv).toBeTruthy();
  });
});
