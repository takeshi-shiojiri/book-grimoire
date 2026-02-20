'use client';

import { useState, useEffect, useCallback } from 'react';

const KEY = 'book-gallery-favorites';

function getFavoriteIds(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function saveFavoriteIds(ids: Set<number>): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(Array.from(ids)));
  } catch {
    // ignore
  }
}

export function useFavorites(totalCount: number) {
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setFavoriteIds(getFavoriteIds());
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      saveFavoriteIds(next);
      return next;
    });
  }, []);

  const isFavorite = useCallback((id: number) => favoriteIds.has(id), [favoriteIds]);

  const isComplete = favoriteIds.size >= totalCount;

  return { favoriteIds, toggleFavorite, isFavorite, favoriteCount: favoriteIds.size, isComplete };
}
