'use client';

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { X, ShoppingCart, Star } from 'lucide-react';
import { RARITY_CONFIG } from '@/lib/constants';
import { RarityBadge } from './RarityBadge';
import { AttributeIcon } from './AttributeIcon';
import type { Book } from '@/lib/types';

interface Props {
  book: Book | null;
  onClose: () => void;
}

export function BookDetailModal({ book, onClose }: Props) {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (!book) return;
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [book, handleKeyDown]);

  return (
    <AnimatePresence>
      {book && (
        <>
          {/* 背景オーバーレイ */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* モーダル本体 */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative w-full max-w-2xl rounded-2xl overflow-hidden"
              style={{
                background: RARITY_CONFIG[book.rarity].gradient,
                border: `2px solid ${RARITY_CONFIG[book.rarity].borderColor}`,
                boxShadow: `0 0 60px ${RARITY_CONFIG[book.rarity].glowColor}, 0 25px 50px rgba(0,0,0,0.8)`,
              }}
            >
              {/* 閉じるボタン */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="閉じる"
              >
                <X size={20} />
              </button>

              <div className="flex flex-col sm:flex-row">
                {/* 左: 書影 */}
                <div className="relative w-full sm:w-48 shrink-0" style={{ aspectRatio: '2/3' }}>
                  {book.thumbnail ? (
                    <Image
                      src={book.thumbnail}
                      alt={book.title}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: RARITY_CONFIG[book.rarity].gradient }}
                    >
                      <span className="text-5xl opacity-40">📚</span>
                    </div>
                  )}

                  {/* ホログラフィックオーバーレイ（SSR） */}
                  {book.rarity === 'SSR' && (
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.3) 50%, transparent 75%)',
                        backgroundSize: '200% 200%',
                        animation: 'holographic 3s linear infinite',
                      }}
                    />
                  )}
                </div>

                {/* 右: テキスト情報 */}
                <div className="flex-1 p-6 flex flex-col gap-4 min-h-0">
                  {/* バッジ */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <RarityBadge rarity={book.rarity} size="md" />
                    <AttributeIcon attribute={book.attribute} size={14} showLabel />
                  </div>

                  {/* タイトル・著者 */}
                  <div>
                    <h2 className="text-xl font-bold leading-tight mb-1" style={{ color: 'var(--color-text-primary)' }}>
                      {book.title}
                    </h2>
                    <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
                      {book.author}
                    </p>
                  </div>

                  {/* おすすめ度 */}
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < book.rating ? 'fill-current' : 'opacity-20'}
                        style={{ color: RARITY_CONFIG[book.rarity].borderColor }}
                      />
                    ))}
                    <span className="text-xs ml-1" style={{ color: 'var(--color-text-muted)' }}>
                      おすすめ度 {book.rating}/7
                    </span>
                  </div>

                  {/* おすすめポイント */}
                  <p className="text-sm leading-relaxed flex-1 overflow-y-auto max-h-48" style={{ color: 'var(--color-text-primary)', opacity: 0.9 }}>
                    {book.description}
                  </p>

                  {/* Amazonリンク */}
                  <a
                    href={book.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold transition-all hover:brightness-110 active:scale-95"
                    style={{
                      background: RARITY_CONFIG[book.rarity].badgeBg,
                      color: RARITY_CONFIG[book.rarity].badgeText,
                      boxShadow: `0 4px 16px ${RARITY_CONFIG[book.rarity].glowColor}`,
                    }}
                  >
                    <ShoppingCart size={16} />
                    Amazonで見る
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
