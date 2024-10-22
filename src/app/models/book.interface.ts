import { ImageLinks } from './image-links.interface';

export interface Book {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: string;
  error?: boolean;
}
