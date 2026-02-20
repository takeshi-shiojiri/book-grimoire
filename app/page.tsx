'use client';

import { useState, useCallback } from 'react';
import { books } from '@/lib/books';
import { HeroSection } from '@/components/HeroSection';
import { FilterBar } from '@/components/FilterBar';
import { CardGallery } from '@/components/CardGallery';
import { BookDetailModal } from '@/components/BookDetailModal';
import { useFilter } from '@/hooks/useFilter';
import { useCollection } from '@/hooks/useCollection';
import type { Book } from '@/lib/types';

export default function Home() {
  const { filter, filtered, setAttribute, setRarity, toggleSort, resetFilter } = useFilter(books);
  const { viewedIds, markViewed, viewedCount, isComplete } = useCollection(books.length);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const handleBookClick = useCallback((book: Book) => {
    markViewed(book.id);
    setSelectedBook(book);
  }, [markViewed]);

  const handleModalClose = useCallback(() => {
    setSelectedBook(null);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* ヒーローセクション */}
      <HeroSection
        totalCount={books.length}
        viewedCount={viewedCount}
        isComplete={isComplete}
      />

      {/* フィルターバー */}
      <FilterBar
        filter={filter}
        onAttribute={setAttribute}
        onRarity={setRarity}
        onSort={toggleSort}
        onReset={resetFilter}
        totalCount={books.length}
        filteredCount={filtered.length}
      />

      {/* カードギャラリー */}
      <main className="px-4 py-8 max-w-screen-2xl mx-auto">
        <CardGallery
          books={filtered}
          onBookClick={handleBookClick}
          viewedIds={viewedIds}
        />
      </main>

      {/* フッター */}
      <footer className="text-center py-8 text-xs" style={{ color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="gaming-font">BOOK GRIMOIRE &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">All book links lead to Amazon Japan search results.</p>
      </footer>

      {/* 詳細モーダル */}
      <BookDetailModal book={selectedBook} onClose={handleModalClose} />
    </div>
  );
}
