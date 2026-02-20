import booksRaw from '@/data/books.json';
import { RATING_TO_RARITY } from './constants';
import { generateAmazonUrl } from './amazon';
import type { Book, BookRaw } from './types';

export function processBooks(): Book[] {
  return (booksRaw as BookRaw[]).map((b) => ({
    ...b,
    rarity: RATING_TO_RARITY[b.rating] ?? 'C',
    thumbnail: b.thumbnail ?? null,
    amazonUrl: generateAmazonUrl(b.title, b.author),
  }));
}

export const books: Book[] = processBooks();
