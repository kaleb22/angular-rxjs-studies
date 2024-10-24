import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBookComponent } from './modal-book.component';
import { Book } from '../../models/book.interface';

describe('ModalBookComponent', () => {
  let component: ModalBookComponent;
  let fixture: ComponentFixture<ModalBookComponent>;
  let bookMock: Book;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalBookComponent],
    }).compileComponents();

    bookMock = {
      thumbnail: 'http://mocksite.com',
    };
    fixture = TestBed.createComponent(ModalBookComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('book', bookMock);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
