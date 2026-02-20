'use client';

import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { RARITY_CONFIG } from '@/lib/constants';
import { RarityBadge } from './RarityBadge';
import { AttributeIcon } from './AttributeIcon';
import type { Book } from '@/lib/types';

interface Props {
  books: Book[];
  onBookClick: (book: Book) => void;
  favoriteIds: Set<number>;
  onToggleFavorite: (id: number) => void;
}

export function BookListTable({ books, onBookClick, favoriteIds, onToggleFavorite }: Props) {
  if (books.length === 0) {
    return (
      <div className="text-center py-20" style={{ color: 'var(--color-text-muted)' }}>
        <div className="text-4xl mb-4">🔍</div>
        <p className="text-sm">条件に一致する書籍が見つかりません</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto rounded-xl" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300 w-10">#</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300 w-12">表紙</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300">タイトル</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300 hidden sm:table-cell">著者</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300 hidden md:table-cell">分類</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300">おすすめ度</th>
            <th className="px-3 py-3 text-left text-xs gaming-font text-purple-300 hidden lg:table-cell">ひとこと</th>
            <th className="px-3 py-3 text-center text-xs gaming-font text-purple-300 w-10">♥</th>
          </tr>
        </thead>
        <tbody>
          <AnimatePresence>
            {books.map((book, idx) => {
              const config = RARITY_CONFIG[book.rarity];
              const fav = favoriteIds.has(book.id);
              return (
                <motion.tr
                  key={book.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className="cursor-pointer transition-colors"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLTableRowElement).style.background = 'rgba(168,85,247,0.06)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLTableRowElement).style.background = 'transparent';
                  }}
                  onClick={() => onBookClick(book)}
                >
                  {/* # */}
                  <td className="px-3 py-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {book.id}
                  </td>

                  {/* 表紙サムネ */}
                  <td className="px-3 py-2">
                    <div
                      className="relative w-8 h-12 rounded overflow-hidden shrink-0"
                      style={{ border: `1px solid ${config.borderColor}40` }}
                    >
                      {book.thumbnail ? (
                        <Image
                          src={book.thumbnail}
                          alt={book.title}
                          fill
                          className="object-cover"
                          unoptimized
                          sizes="32px"
                        />
                      ) : (
                        <div
                          className="w-full h-full flex items-center justify-center text-[10px]"
                          style={{ background: config.gradient, color: config.borderColor }}
                        >
                          📚
                        </div>
                      )}
                    </div>
                  </td>

                  {/* タイトル */}
                  <td className="px-3 py-3">
                    <div className="font-bold leading-tight" style={{ color: 'var(--color-text-primary)' }}>
                      {book.title}
                    </div>
                    {/* スマホ時: 著者をここに表示 */}
                    <div className="text-xs mt-0.5 sm:hidden" style={{ color: 'var(--color-text-muted)' }}>
                      {book.author}
                    </div>
                  </td>

                  {/* 著者（sm以上） */}
                  <td className="px-3 py-3 hidden sm:table-cell text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {book.author}
                  </td>

                  {/* 分類（md以上） */}
                  <td className="px-3 py-3 hidden md:table-cell">
                    <AttributeIcon attribute={book.attribute} size={11} showLabel />
                  </td>

                  {/* おすすめ度（★バッジ） */}
                  <td className="px-3 py-3">
                    <RarityBadge rarity={book.rarity} size="sm" />
                  </td>

                  {/* ひとこと（lg以上、最初の40字） */}
                  <td className="px-3 py-3 hidden lg:table-cell text-xs max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="line-clamp-2">{book.description}</span>
                  </td>

                  {/* お気に入り */}
                  <td className="px-3 py-3 text-center">
                    <button
                      className="rounded-full p-1.5 transition-transform hover:scale-125 active:scale-95"
                      style={{ background: 'rgba(255,255,255,0.05)' }}
                      onClick={e => {
                        e.stopPropagation();
                        onToggleFavorite(book.id);
                      }}
                      aria-label={fav ? 'お気に入りを外す' : 'お気に入りに追加'}
                    >
                      <Heart
                        size={14}
                        className={fav ? 'fill-current text-pink-400' : 'text-white/30'}
                      />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
