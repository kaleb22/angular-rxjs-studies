import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'limitDescription',
  standalone: true,
})
export class LimitDescriptionPipe implements PipeTransform {
  transform(description?: string): string {
    if (description && description.length > 30) {
      return `${description.slice(0, 30)}...`;
    }

    return description ? description : '';
  }
}
