import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookComponent } from './book.component';
import { By } from '@angular/platform-browser';
import { Book } from '../../models/book.interface';

describe('BookComponent', () => {
  let component: BookComponent;
  let fixture: ComponentFixture<BookComponent>;
  let bookMock: Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookComponent],
    }).compileComponents();

    bookMock = {
      thumbnail: 'http://mocksite.com',
    };
    fixture = TestBed.createComponent(BookComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', bookMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open modal book on click', () => {
    const btnEl = fixture.debugElement.query(
      By.css('[data-testId="details-btn"]'),
    );
    btnEl.nativeElement.dispatchEvent(new Event('click'));

    fixture.detectChanges();
    expect(component.isModalOpen).toBe(true);

    const modalEl = fixture.debugElement.query(
      By.css('[data-testId="app-modal-book"]'),
    );

    expect(modalEl).toBeTruthy();
  });
});
