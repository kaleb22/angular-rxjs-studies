import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books-list',
    pathMatch: 'full'
  },
  {
    path: 'books-list',
    component: BookListComponent
  }
];
