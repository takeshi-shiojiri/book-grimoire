'use client';

import { useState, useEffect } from 'react';
import {
  Briefcase, Sparkles, BookMarked,
  RotateCcw, SortAsc, SortDesc, LayoutGrid, List,
} from 'lucide-react';
import { ATTRIBUTE_CONFIG, RARITY_CONFIG, ATTRIBUTES, RARITIES } from '@/lib/constants';
import type { Attribute, Rarity, FilterState } from '@/lib/types';

const ICON_MAP = { Briefcase, Sparkles, BookMarked } as const;

// レア度ごとの★数
const RARITY_STARS: Record<Rarity, string> = {
  SSR: '★★★★★★★',
  'SR+': '★★★★★★',
  SR: '★★★★★',
  R: '★★★★',
  N: '★★★',
  C: '★★',
};

export type ViewMode = 'card' | 'list';

interface Props {
  filter: FilterState;
  onAttribute: (a: Attribute | 'all') => void;
  onRarity: (r: Rarity | 'all') => void;
  onSort: (key: FilterState['sortKey']) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

export function FilterBar({
  filter, onAttribute, onRarity, onSort, onReset, totalCount, filteredCount,
  viewMode, onViewModeChange,
}: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="sticky top-0 z-30 border-b border-white/5 px-4 py-3 space-y-3 transition-colors duration-300"
      style={{
        background: scrolled
          ? 'rgba(10, 10, 26, 0.97)'
          : 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.5)' : 'none',
      }}
    >
      {/* 1行目: 分類フィルタ + 表示切り替え */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs gaming-font text-purple-300 mr-1">分類</span>
          <button
            onClick={() => onAttribute('all')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
              filter.attribute === 'all'
                ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.6)]'
                : 'bg-white/5 text-white/50 hover:bg-white/10'
            }`}
          >
            ALL
          </button>
          {ATTRIBUTES.map(attr => {
            const conf = ATTRIBUTE_CONFIG[attr];
            const Icon = ICON_MAP[conf.icon as keyof typeof ICON_MAP];
            const active = filter.attribute === attr;
            return (
              <button
                key={attr}
                onClick={() => onAttribute(attr)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all"
                style={{
                  color: active ? '#fff' : conf.color,
                  background: active ? conf.color : conf.bgColor,
                  border: `1px solid ${active ? conf.color : conf.borderColor}`,
                  boxShadow: active ? `0 0 12px ${conf.color}80` : 'none',
                }}
              >
                <Icon size={12} />
                {conf.name}
              </button>
            );
          })}
        </div>

        {/* 表示切り替えボタン */}
        <div
          className="flex items-center rounded-lg overflow-hidden shrink-0"
          style={{ border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <button
            onClick={() => onViewModeChange('card')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-all ${
              viewMode === 'card'
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-white/40 hover:bg-white/5'
            }`}
            title="カード表示"
          >
            <LayoutGrid size={13} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`inline-flex items-center gap-1 px-3 py-1.5 text-xs transition-all ${
              viewMode === 'list'
                ? 'bg-purple-600 text-white'
                : 'bg-transparent text-white/40 hover:bg-white/5'
            }`}
            title="一覧表示"
          >
            <List size={13} />
          </button>
        </div>
      </div>

      {/* 2行目: おすすめ度フィルタ + ソート */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs gaming-font text-purple-300 mr-1">おすすめ度</span>
          <button
            onClick={() => onRarity('all')}
            className={`px-3 py-1 rounded text-xs font-bold gaming-font transition-all ${
              filter.rarity === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            ALL
          </button>
          {RARITIES.map(r => {
            const conf = RARITY_CONFIG[r];
            const active = filter.rarity === r;
            return (
              <button
                key={r}
                onClick={() => onRarity(r)}
                className="px-2.5 py-1 rounded text-xs font-bold transition-all"
                style={{
                  color: active ? conf.badgeText : conf.borderColor,
                  background: active ? conf.badgeBg : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active ? conf.borderColor : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: active ? `0 0 10px ${conf.glowColor}` : 'none',
                  letterSpacing: '-0.03em',
                }}
              >
                {RARITY_STARS[r]}
              </button>
            );
          })}
        </div>

        {/* ソートボタン */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onSort('rarity')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
              filter.sortKey === 'rarity' ? 'bg-purple-600/50 text-purple-200' : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {filter.sortKey === 'rarity' && filter.sortDir === 'desc' ? <SortDesc size={12} /> : <SortAsc size={12} />}
            おすすめ順
          </button>
          <button
            onClick={() => onSort('id')}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs transition-all ${
              filter.sortKey === 'id' ? 'bg-purple-600/50 text-purple-200' : 'bg-white/5 text-white/40 hover:bg-white/10'
            }`}
          >
            {filter.sortKey === 'id' && filter.sortDir === 'desc' ? <SortDesc size={12} /> : <SortAsc size={12} />}
            番号順
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            title="フィルターをリセット"
          >
            <RotateCcw size={12} />
          </button>

          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {filteredCount}/{totalCount}冊
          </span>
        </div>
      </div>
    </div>
  );
}
