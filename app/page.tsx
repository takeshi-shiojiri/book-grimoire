'use client';

import { useState, useCallback } from 'react';
import { books } from '@/lib/books';
import { HeroSection } from '@/components/HeroSection';
import { FilterBar, type ViewMode } from '@/components/FilterBar';
import { CardGallery } from '@/components/CardGallery';
import { BookListTable } from '@/components/BookListTable';
import { BookDetailModal } from '@/components/BookDetailModal';
import { useFilter } from '@/hooks/useFilter';
import { useFavorites } from '@/hooks/useFavorites';
import type { Book } from '@/lib/types';

export default function Home() {
  const { filter, filtered, setAttribute, setRarity, toggleSort, resetFilter } = useFilter(books);
  const { favoriteIds, toggleFavorite, isFavorite, favoriteCount, isComplete } = useFavorites(books.length);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('card');

  const handleBookClick = useCallback((book: Book) => {
    setSelectedBook(book);
  }, []);

  const handleModalClose = useCallback(() => {
    setSelectedBook(null);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: 'var(--color-bg-primary)' }}>
      {/* ヒーローセクション */}
      <HeroSection
        totalCount={books.length}
        favoriteCount={favoriteCount}
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
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* ギャラリー / 一覧 切り替え */}
      <main className="px-4 py-8 max-w-screen-2xl mx-auto">
        {viewMode === 'card' ? (
          <CardGallery
            books={filtered}
            onBookClick={handleBookClick}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        ) : (
          <BookListTable
            books={filtered}
            onBookClick={handleBookClick}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* フッター */}
      <footer className="text-center py-8 text-xs" style={{ color: 'var(--color-text-muted)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p className="gaming-font">BOOK GRIMOIRE &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">All book links lead to Amazon Japan search results.</p>
      </footer>

      {/* 詳細モーダル */}
      <BookDetailModal
        book={selectedBook}
        onClose={handleModalClose}
        isFavorite={selectedBook ? isFavorite(selectedBook.id) : false}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
