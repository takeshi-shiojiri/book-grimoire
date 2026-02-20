const STORAGE_KEY = 'book-gallery-viewed';

export function getViewedIds(): Set<number> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw) as number[]) : new Set();
  } catch {
    return new Set();
  }
}

export function addViewedId(id: number): Set<number> {
  const viewed = getViewedIds();
  viewed.add(id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...viewed]));
  } catch {
    // localStorage unavailable
  }
  return viewed;
}

export function clearViewed(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }
}
