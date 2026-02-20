'use client';

import { AnimatePresence, motion } from 'motion/react';
import { BookCard } from './BookCard';
import type { Book } from '@/lib/types';

interface Props {
  books: Book[];
  onBookClick: (book: Book) => void;
  viewedIds: Set<number>;
}

export function CardGallery({ books, onBookClick, viewedIds }: Props) {
  if (books.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-24"
        style={{ color: 'var(--color-text-muted)' }}
      >
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-lg">該当する書籍が見つかりません</p>
        <p className="text-sm mt-2">フィルターを変更してみてください</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
    >
      <AnimatePresence mode="popLayout">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onClick={onBookClick}
            isViewed={viewedIds.has(book.id)}
          />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
