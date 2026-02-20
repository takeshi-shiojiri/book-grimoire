'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { RARITY_CONFIG } from '@/lib/constants';
import { RarityBadge } from './RarityBadge';
import { AttributeIcon } from './AttributeIcon';
import type { Book } from '@/lib/types';

interface Props {
  book: Book;
  onClick: (book: Book) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: number) => void;
}

export function BookCard({ book, onClick, isFavorite, onToggleFavorite }: Props) {
  const config = RARITY_CONFIG[book.rarity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.25 }}
      whileHover={{ y: -8, scale: 1.03 }}
      className={`relative cursor-pointer rounded-xl overflow-hidden select-none ${config.cardClass}`}
      style={{
        background: config.gradient,
        border: `1.5px solid ${config.borderColor}`,
        boxShadow: `0 4px 24px ${config.glowColor}`,
      }}
      onClick={() => onClick(book)}
    >
      {/* お気に入りボタン（右上） */}
      <button
        className="absolute top-2 right-2 z-10 rounded-full p-1 transition-transform hover:scale-125 active:scale-95"
        style={{
          background: 'rgba(0,0,0,0.4)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite?.(book.id);
        }}
        aria-label={isFavorite ? 'お気に入りを外す' : 'お気に入りに追加'}
      >
        <Heart
          size={14}
          className={isFavorite ? 'fill-current text-pink-400' : 'text-white/50'}
        />
      </button>

      {/* カード上部: 書影 */}
      <div className="relative w-full" style={{ aspectRatio: '2/3' }}>
        {book.thumbnail ? (
          <Image
            src={book.thumbnail}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            unoptimized
          />
        ) : (
          <PlaceholderCover book={book} />
        )}

        {/* レアリティグラデーションオーバーレイ（下部フェード） */}
        <div
          className="absolute inset-x-0 bottom-0 h-16"
          style={{
            background: `linear-gradient(to top, ${config.gradient.match(/#[0-9a-f]+/i)?.[0] ?? '#0a0a1a'}, transparent)`,
          }}
        />

        {/* レアリティバッジ（左上）: ★のみ */}
        <div className="absolute top-2 left-2">
          <RarityBadge rarity={book.rarity} size="sm" />
        </div>
      </div>

      {/* カード下部: テキスト情報 */}
      <div className="p-3 space-y-1.5">
        <h3 className="text-sm font-bold leading-tight line-clamp-2" style={{ color: 'var(--color-text-primary)' }}>
          {book.title}
        </h3>
        <p className="text-xs truncate" style={{ color: 'var(--color-text-muted)' }}>
          {book.author}
        </p>
        <div className="flex items-center justify-between pt-1">
          <AttributeIcon attribute={book.attribute} size={12} showLabel />
        </div>
      </div>
    </motion.div>
  );
}

function PlaceholderCover({ book }: { book: Book }) {
  const config = RARITY_CONFIG[book.rarity];
  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center p-4 gap-3"
      style={{ background: config.gradient }}
    >
      <div
        className="text-4xl opacity-30"
        style={{ color: config.borderColor }}
      >
        📚
      </div>
      <p
        className="text-center text-xs font-medium leading-tight line-clamp-4"
        style={{ color: config.borderColor }}
      >
        {book.title}
      </p>
    </div>
  );
}
