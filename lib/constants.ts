import type { Rarity, Attribute, RarityConfig, AttributeConfig } from './types';

export const RARITY_ORDER: Record<Rarity, number> = {
  'SSR': 6,
  'SR+': 5,
  'SR': 4,
  'R': 3,
  'N': 2,
  'C': 1,
};

export const RATING_TO_RARITY: Record<number, Rarity> = {
  7: 'SSR',
  6: 'SR+',
  5: 'SR',
  4: 'R',
  3: 'N',
  2: 'C',
  1: 'C',
};

export const RARITY_CONFIG: Record<Rarity, RarityConfig> = {
  SSR: {
    label: '伝説',
    rank: 'SSR',
    borderColor: '#ffd700',
    glowColor: 'rgba(255,215,0,0.8)',
    gradient: 'linear-gradient(135deg, #1a1400 0%, #2a2000 40%, #1a1400 100%)',
    badgeBg: 'linear-gradient(135deg, #b8860b, #ffd700, #daa520)',
    badgeText: '#000',
    cardClass: 'card-ssr',
  },
  'SR+': {
    label: '英雄',
    rank: 'SR+',
    borderColor: '#a855f7',
    glowColor: 'rgba(168,85,247,0.7)',
    gradient: 'linear-gradient(135deg, #1a0a2e 0%, #2d1250 40%, #1a0a2e 100%)',
    badgeBg: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    badgeText: '#fff',
    cardClass: 'card-srplus',
  },
  SR: {
    label: '希少',
    rank: 'SR',
    borderColor: '#3b82f6',
    glowColor: 'rgba(59,130,246,0.5)',
    gradient: 'linear-gradient(135deg, #0a1628 0%, #102040 40%, #0a1628 100%)',
    badgeBg: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    badgeText: '#fff',
    cardClass: '',
  },
  R: {
    label: '上級',
    rank: 'R',
    borderColor: '#22c55e',
    glowColor: 'rgba(34,197,94,0.4)',
    gradient: 'linear-gradient(135deg, #071a10 0%, #0f2e1a 40%, #071a10 100%)',
    badgeBg: 'linear-gradient(135deg, #15803d, #22c55e)',
    badgeText: '#fff',
    cardClass: '',
  },
  N: {
    label: '標準',
    rank: 'N',
    borderColor: '#6b7280',
    glowColor: 'rgba(107,114,128,0.3)',
    gradient: 'linear-gradient(135deg, #111827 0%, #1f2937 40%, #111827 100%)',
    badgeBg: '#374151',
    badgeText: '#d1d5db',
    cardClass: '',
  },
  C: {
    label: '入門',
    rank: 'C',
    borderColor: '#475569',
    glowColor: 'rgba(71,85,105,0.3)',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 40%, #0f172a 100%)',
    badgeBg: '#1e293b',
    badgeText: '#94a3b8',
    cardClass: '',
  },
};

export const ATTRIBUTE_CONFIG: Record<Attribute, AttributeConfig> = {
  business: {
    name: 'ビジネス',
    icon: 'Briefcase',
    color: '#3b82f6',
    bgColor: 'rgba(59,130,246,0.15)',
    borderColor: 'rgba(59,130,246,0.4)',
  },
  selfhelp: {
    name: '自己啓発',
    icon: 'Sparkles',
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.15)',
    borderColor: 'rgba(245,158,11,0.4)',
  },
  manga: {
    name: '漫画',
    icon: 'BookMarked',
    color: '#ec4899',
    bgColor: 'rgba(236,72,153,0.15)',
    borderColor: 'rgba(236,72,153,0.4)',
  },
};

export const ATTRIBUTES: Attribute[] = ['business', 'selfhelp', 'manga'];
export const RARITIES: Rarity[] = ['SSR', 'SR+', 'SR', 'R', 'N', 'C'];
