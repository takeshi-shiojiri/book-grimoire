'use client';

import { useState, useEffect, useCallback } from 'react';
import { getViewedIds, addViewedId } from '@/lib/collection';

export function useCollection(totalCount: number) {
  const [viewedIds, setViewedIds] = useState<Set<number>>(new Set());
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const ids = getViewedIds();
    setViewedIds(ids);
  }, []);

  const markViewed = useCallback((id: number) => {
    setViewedIds(prev => {
      if (prev.has(id)) return prev;
      const next = addViewedId(id);
      if (next.size === totalCount) {
        setIsComplete(true);
      }
      return new Set(next);
    });
  }, [totalCount]);

  return { viewedIds, markViewed, isComplete, viewedCount: viewedIds.size };
}
