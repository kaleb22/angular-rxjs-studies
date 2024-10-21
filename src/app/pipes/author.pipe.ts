import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'author',
  standalone: true,
})
export class AuthorPipe implements PipeTransform {
  transform(authors?: string[]): string {
    if (authors && authors.length > 0) return authors[0];

    return '';
  }
}
