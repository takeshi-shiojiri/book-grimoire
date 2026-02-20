'use client';

import {
  Flame, Snowflake, Zap, Moon, Sun, Wind,
  ArrowUpDown, RotateCcw, SortAsc, SortDesc,
} from 'lucide-react';
import { ATTRIBUTE_CONFIG, RARITY_CONFIG, ATTRIBUTES, RARITIES } from '@/lib/constants';
import type { Attribute, Rarity, FilterState } from '@/lib/types';

const ICON_MAP = { Flame, Snowflake, Zap, Moon, Sun, Wind } as const;

interface Props {
  filter: FilterState;
  onAttribute: (a: Attribute | 'all') => void;
  onRarity: (r: Rarity | 'all') => void;
  onSort: (key: FilterState['sortKey']) => void;
  onReset: () => void;
  totalCount: number;
  filteredCount: number;
}

export function FilterBar({
  filter, onAttribute, onRarity, onSort, onReset, totalCount, filteredCount,
}: Props) {
  return (
    <div className="sticky top-0 z-30 glass border-b border-white/5 px-4 py-3 space-y-3">
      {/* 属性フィルタ */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs gaming-font text-purple-300 mr-1">属性</span>
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
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all`}
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

      {/* レアリティフィルタ + ソート */}
      <div className="flex items-center gap-2 flex-wrap justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs gaming-font text-purple-300 mr-1">レア</span>
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
                className={`px-2.5 py-1 rounded text-xs font-bold gaming-font transition-all`}
                style={{
                  color: active ? conf.badgeText : conf.borderColor,
                  background: active ? conf.badgeBg : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${active ? conf.borderColor : 'rgba(255,255,255,0.1)'}`,
                  boxShadow: active ? `0 0 10px ${conf.glowColor}` : 'none',
                }}
              >
                {r}
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
            レア順
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

          {/* カウント */}
          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
            {filteredCount}/{totalCount}冊
          </span>
        </div>
      </div>
    </div>
  );
}
