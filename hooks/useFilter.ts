'use client';

import { useState, useMemo } from 'react';
import { RARITY_ORDER } from '@/lib/constants';
import type { Book, FilterState, Attribute, Rarity } from '@/lib/types';

const DEFAULT_FILTER: FilterState = {
  attribute: 'all',
  rarity: 'all',
  sortKey: 'rarity',
  sortDir: 'desc',
};

export function useFilter(allBooks: Book[]) {
  const [filter, setFilter] = useState<FilterState>(DEFAULT_FILTER);

  const filtered = useMemo(() => {
    let result = allBooks;

    if (filter.attribute !== 'all') {
      result = result.filter(b => b.attribute === filter.attribute);
    }
    if (filter.rarity !== 'all') {
      result = result.filter(b => b.rarity === filter.rarity);
    }

    result = [...result].sort((a, b) => {
      let cmp = 0;
      if (filter.sortKey === 'rarity') {
        cmp = RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity];
      } else {
        cmp = a.id - b.id;
      }
      return filter.sortDir === 'desc' ? -cmp : cmp;
    });

    return result;
  }, [allBooks, filter]);

  function setAttribute(attr: Attribute | 'all') {
    // 同じタグを再押しで 'all' に戻す（トグル）
    setFilter(f => ({ ...f, attribute: f.attribute === attr ? 'all' : attr }));
  }
  function setRarity(rarity: Rarity | 'all') {
    // 同じタグを再押しで 'all' に戻す（トグル）
    setFilter(f => ({ ...f, rarity: f.rarity === rarity ? 'all' : rarity }));
  }
  function toggleSort(key: FilterState['sortKey']) {
    setFilter(f => ({
      ...f,
      sortKey: key,
      sortDir: f.sortKey === key && f.sortDir === 'desc' ? 'asc' : 'desc',
    }));
  }
  function resetFilter() {
    setFilter(DEFAULT_FILTER);
  }

  return { filter, filtered, setAttribute, setRarity, toggleSort, resetFilter };
}
