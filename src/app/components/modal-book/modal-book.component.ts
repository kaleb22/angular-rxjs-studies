import { DatePipe, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

import { Book } from '../../models/book.interface';
import { LimitDescriptionPipe } from '../../pipes/limit-description.pipe';
import { AuthorPipe } from '../../pipes/author.pipe';

const body = document.querySelector('body') as HTMLBodyElement;

@Component({
  selector: 'app-modal-book',
  standalone: true,
  imports: [NgIf, LimitDescriptionPipe, AuthorPipe, DatePipe],
  templateUrl: './modal-book.component.html',
  styleUrl: './modal-book.component.scss',
})
export class ModalBookComponent implements OnInit {
  @Input() book: Book;
  @Output() modalChanged = new EventEmitter();

  @ViewChild('modalBookInfo') modal: ElementRef;

  modalStatus: boolean = true;

  ngOnInit() {
    this.hideScroll();
  }

  closeModal() {
    this.modalStatus = false;
    this.modalChanged.emit(this.modalStatus);
    body.style.overflow = 'scroll';
  }

  hideScroll() {
    body.style.overflow = 'hidden';
  }

  goToPreview() {
    window.open(this.book.previewLink, '_blank');
  }

  @HostListener('keydown', ['$event'])
  listenForKeyDown(event: KeyboardEvent) {
    this.trapFocus(event);
  }

  private trapFocus(event: KeyboardEvent) {
    const isTabPressed = event.key === 'Tab';

    if (!isTabPressed) {
      return;
    }

    const focusableElements = 'button';
    const firstFocusableElement =
      this.modal.nativeElement.querySelectorAll(focusableElements)[0];
    const lastFocusableElement =
      this.modal.nativeElement.querySelectorAll(focusableElements)[1];

    if (event.shiftKey || isTabPressed) {
      if (document.activeElement === firstFocusableElement) {
        lastFocusableElement.focus();
        event.preventDefault();
      } else {
        firstFocusableElement.focus();
        event.preventDefault();
      }
    }
  }
}
