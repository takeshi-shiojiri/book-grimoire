'use client';

import { motion } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { CollectionProgress } from './CollectionProgress';

interface Props {
  totalCount: number;
  viewedCount: number;
  isComplete: boolean;
}

export function HeroSection({ totalCount, viewedCount, isComplete }: Props) {
  return (
    <section
      className="relative overflow-hidden py-20 px-4 text-center"
      style={{
        background: 'linear-gradient(180deg, #0d0d24 0%, #0a0a1a 100%)',
        borderBottom: '1px solid rgba(168,85,247,0.2)',
      }}
    >
      <ParticleBackground />

      <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
        {/* アイコン */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: 'spring', bounce: 0.4 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-2xl mx-auto"
          style={{
            background: 'linear-gradient(135deg, #4c1d95, #7c3aed)',
            boxShadow: '0 0 40px rgba(168,85,247,0.5)',
          }}
        >
          <BookOpen size={40} className="text-white" />
        </motion.div>

        {/* タイトル */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold gaming-font leading-tight">
            <span className="text-gradient-gold">BOOK</span>
            <span className="text-white"> GRIMOIRE</span>
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <Sparkles size={14} className="text-purple-400" />
            <p className="text-sm sm:text-base text-purple-300">
              41冊の冒険書が、あなたを待っている
            </p>
            <Sparkles size={14} className="text-purple-400" />
          </div>
        </motion.div>

        {/* サブテキスト */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm max-w-md mx-auto leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          キャリア・思考・マインドのヒントが詰まったセレクション。
          カードを開いて、自分だけの武器を見つけよう。
        </motion.p>

        {/* コレクション進捗 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CollectionProgress
            viewed={viewedCount}
            total={totalCount}
            isComplete={isComplete}
          />
        </motion.div>

        {/* レアリティ凡例 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-3 flex-wrap text-[10px] gaming-font"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {[
            { r: 'SSR', c: '#ffd700' },
            { r: 'SR+', c: '#a855f7' },
            { r: 'SR', c: '#3b82f6' },
            { r: 'R', c: '#22c55e' },
            { r: 'N', c: '#6b7280' },
            { r: 'C', c: '#475569' },
          ].map(({ r, c }) => (
            <span key={r} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
              {r}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
