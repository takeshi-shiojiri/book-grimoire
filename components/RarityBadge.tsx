'use client';

import { RARITY_CONFIG } from '@/lib/constants';
import type { Rarity } from '@/lib/types';

interface Props {
  rarity: Rarity;
  size?: 'sm' | 'md' | 'lg';
}

export function RarityBadge({ rarity, size = 'sm' }: Props) {
  const config = RARITY_CONFIG[rarity];

  const sizeClass = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  }[size];

  // ★の数: SSR=7, SR+=6, SR=5, R=4, N=3, C=1-2
  const starCount = { SSR: 7, 'SR+': 6, SR: 5, R: 4, N: 3, C: 2 }[rarity];

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded font-bold ${sizeClass}`}
      style={{
        background: config.badgeBg,
        color: config.badgeText,
        boxShadow: `0 0 8px ${config.glowColor}`,
        letterSpacing: '-0.02em',
      }}
    >
      {'★'.repeat(starCount)}
    </span>
  );
}
