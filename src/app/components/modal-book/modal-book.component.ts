import { DatePipe, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

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
export class ModalBookComponent {
  @Input() book: Book;
  @Output() modalChanged = new EventEmitter();

  modalStatus: boolean = true;

  closeModal() {
    this.modalStatus = false;
    this.modalChanged.emit(this.modalStatus);
    body.style.overflow = 'scroll';
  }

  hideScroll() {
    if (this.modalStatus == true) {
      body.style.overflow = 'hidden';
    }
  }

  goToPreview() {
    window.open(this.book.previewLink, '_blank');
  }
}
