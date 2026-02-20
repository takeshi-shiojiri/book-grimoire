'use client';

import { Briefcase, Sparkles, BookMarked } from 'lucide-react';
import { ATTRIBUTE_CONFIG } from '@/lib/constants';
import type { Attribute } from '@/lib/types';

const ICON_MAP = { Briefcase, Sparkles, BookMarked } as const;

interface Props {
  attribute: Attribute;
  size?: number;
  showLabel?: boolean;
}

export function AttributeIcon({ attribute, size = 14, showLabel = false }: Props) {
  const config = ATTRIBUTE_CONFIG[attribute];
  const IconComponent = ICON_MAP[config.icon as keyof typeof ICON_MAP];

  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-xs font-medium"
      style={{
        color: config.color,
        background: config.bgColor,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      <IconComponent size={size} />
      {showLabel && <span>{config.name}</span>}
    </span>
  );
}
