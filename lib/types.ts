export type Rarity = 'SSR' | 'SR+' | 'SR' | 'R' | 'N' | 'C';

export type Attribute = 'fire' | 'ice' | 'thunder' | 'dark' | 'light' | 'wind';

export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;       // 1-7
  rarity: Rarity;       // ratingから自動算出
  attribute: Attribute;
  thumbnail: string | null;
  amazonUrl: string;    // 自動生成
}

export interface BookRaw {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  attribute: Attribute;
  thumbnail?: string | null;
}

export interface RarityConfig {
  label: string;
  rank: string;
  borderColor: string;
  glowColor: string;
  gradient: string;
  badgeBg: string;
  badgeText: string;
  cardClass: string;
}

export interface AttributeConfig {
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export type SortKey = 'rarity' | 'id';
export type SortDir = 'asc' | 'desc';

export interface FilterState {
  attribute: Attribute | 'all';
  rarity: Rarity | 'all';
  sortKey: SortKey;
  sortDir: SortDir;
}
