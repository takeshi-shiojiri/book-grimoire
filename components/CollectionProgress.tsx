'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Heart, Trophy } from 'lucide-react';

interface Props {
  favoriteCount: number;
  total: number;
  isComplete: boolean;
}

export function CollectionProgress({ favoriteCount, total, isComplete }: Props) {
  const pct = total > 0 ? Math.round((favoriteCount / total) * 100) : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-1.5">
        <span className="inline-flex items-center gap-1 text-xs gaming-font text-pink-400">
          <Heart size={11} className="fill-current" />
          FAVORITES
        </span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {favoriteCount} / {total} 冊
        </span>
      </div>

      {/* プログレスバー */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.1)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            background: isComplete
              ? 'linear-gradient(90deg, #ffd700, #ff8c00, #ffd700)'
              : 'linear-gradient(90deg, #ec4899, #f43f5e, #fb7185)',
            boxShadow: isComplete
              ? '0 0 10px #ffd700'
              : '0 0 8px rgba(236,72,153,0.6)',
          }}
        />
      </div>

      {/* コンプリート演出 */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-center gap-2 mt-2"
          >
            <Trophy size={14} className="text-yellow-400" />
            <span className="text-xs gaming-font text-gradient-gold">
              全冊お気に入り登録完了！
            </span>
            <Trophy size={14} className="text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
