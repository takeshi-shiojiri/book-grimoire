'use client';

import { motion, AnimatePresence } from 'motion/react';
import { Trophy } from 'lucide-react';

interface Props {
  viewed: number;
  total: number;
  isComplete: boolean;
}

export function CollectionProgress({ viewed, total, isComplete }: Props) {
  const pct = Math.round((viewed / total) * 100);

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs gaming-font text-purple-300">COLLECTION</span>
        <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
          {viewed} / {total} 冊発見済み
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
              : 'linear-gradient(90deg, #7c3aed, #a855f7, #c084fc)',
            boxShadow: isComplete
              ? '0 0 10px #ffd700'
              : '0 0 8px rgba(168,85,247,0.6)',
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
              コンプリート！全ての冒険書を発見した！
            </span>
            <Trophy size={14} className="text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
