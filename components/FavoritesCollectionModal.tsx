'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, Heart, Sparkles } from 'lucide-react';
import { RARITY_CONFIG } from '@/lib/constants';
import { RarityBadge } from './RarityBadge';
import type { Book } from '@/lib/types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  favoriteBooks: Book[];
  onBookClick: (book: Book) => void;
}

export function FavoritesCollectionModal({ isOpen, onClose, favoriteBooks, onBookClick }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Escキーで閉じる
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // スクロールロック
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            ref={overlayRef}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
          >
            {/* モーダル本体 */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #0d0d24 0%, #0a0a1a 100%)',
                border: '1.5px solid rgba(236,72,153,0.4)',
                boxShadow: '0 0 60px rgba(236,72,153,0.25), 0 0 120px rgba(168,85,247,0.1)',
              }}
              initial={{ opacity: 0, scale: 0.85, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            >
              {/* ヘッダー */}
              <div
                className="flex-none flex items-center justify-between px-6 py-4"
                style={{ borderBottom: '1px solid rgba(236,72,153,0.2)' }}
              >
                <div className="flex items-center gap-2">
                  <Heart size={16} className="fill-current text-pink-400" />
                  <span className="gaming-font text-base text-pink-400">MY FAVORITES</span>
                  <span
                    className="ml-2 text-xs px-2 py-0.5 rounded-full gaming-font"
                    style={{
                      background: 'rgba(236,72,153,0.15)',
                      border: '1px solid rgba(236,72,153,0.3)',
                      color: '#f9a8d4',
                    }}
                  >
                    {favoriteBooks.length} 冊
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-1.5 transition-colors hover:bg-white/10"
                  aria-label="閉じる"
                >
                  <X size={18} className="text-white/60" />
                </button>
              </div>

              {/* コンテンツ */}
              <div className="flex-1 overflow-y-auto px-6 py-5">
                {favoriteBooks.length === 0 ? (
                  /* 空の状態 */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-20 gap-4"
                  >
                    <Heart size={48} className="text-pink-400/30" />
                    <p className="text-sm text-center" style={{ color: 'var(--color-text-muted)' }}>
                      まだお気に入りがありません。<br />
                      カードの ♥ ボタンを押してコレクションを作ろう！
                    </p>
                  </motion.div>
                ) : (
                  /* カードグリッド */
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    <AnimatePresence mode="popLayout">
                      {favoriteBooks.map((book, i) => (
                        <CollectionCard
                          key={book.id}
                          book={book}
                          index={i}
                          onClick={() => { onClose(); onBookClick(book); }}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {/* フッター */}
              {favoriteBooks.length > 0 && (
                <div
                  className="flex-none flex items-center justify-center gap-1.5 py-3 text-xs"
                  style={{
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  <Sparkles size={11} className="text-purple-400" />
                  <span>カードをクリックすると詳細を見られます</span>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* コレクション内の小カード */
function CollectionCard({ book, index, onClick }: { book: Book; index: number; onClick: () => void }) {
  const config = RARITY_CONFIG[book.rarity];

  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.7, rotate: -5 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.7 }}
      transition={{ delay: index * 0.03, type: 'spring', stiffness: 300, damping: 22 }}
      whileHover={{ y: -6, scale: 1.06, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
      className="relative rounded-xl overflow-hidden cursor-pointer text-left"
      style={{
        background: config.gradient,
        border: `1.5px solid ${config.borderColor}`,
        boxShadow: `0 4px 16px ${config.glowColor}`,
        aspectRatio: '2/3',
      }}
      onClick={onClick}
      aria-label={book.title}
    >
      {/* 書影 */}
      {book.thumbnail ? (
        <Image
          src={book.thumbnail}
          alt={book.title}
          fill
          className="object-cover"
          sizes="120px"
          unoptimized
        />
      ) : (
        <div
          className="w-full h-full flex items-center justify-center p-2"
          style={{ background: config.gradient }}
        >
          <p
            className="text-center text-[10px] font-medium leading-tight line-clamp-4"
            style={{ color: config.borderColor }}
          >
            {book.title}
          </p>
        </div>
      )}

      {/* 下部グラデーション + バッジ */}
      <div
        className="absolute inset-x-0 bottom-0 h-2/5"
        style={{
          background: `linear-gradient(to top, ${config.gradient.match(/#[0-9a-f]+/i)?.[0] ?? '#0a0a1a'}dd, transparent)`,
        }}
      />
      <div className="absolute top-1 left-1">
        <RarityBadge rarity={book.rarity} size="sm" />
      </div>

      {/* ハートマーク（お気に入り済みマーカー） */}
      <div className="absolute bottom-1.5 right-1.5">
        <Heart size={10} className="fill-current text-pink-400 drop-shadow" />
      </div>
    </motion.button>
  );
}
