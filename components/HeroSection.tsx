'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Sparkles } from 'lucide-react';
import { ParticleBackground } from './ParticleBackground';
import { CollectionProgress } from './CollectionProgress';

const ADVICE_MESSAGES = [
  '💡 1冊を完璧に読もうとしなくていい。気になった章だけ読むだけで、十分に価値がある。',
  '🌱 本は読み切ることより、1つのヒントを持ち帰ることの方が大事。「刺さった一行」で十分。',
  '☕ 全部メモしようとしなくていい。読んでいる途中に「なるほど」と感じた瞬間が、すでにあなたの武器になっている。',
];

interface Props {
  totalCount: number;
  favoriteCount: number;
  isComplete: boolean;
}

export function HeroSection({ totalCount, favoriteCount, isComplete }: Props) {
  const [adviceIndex, setAdviceIndex] = useState(0);

  // ランダムで1つ選ぶ（初回マウント時のみ）
  useEffect(() => {
    setAdviceIndex(Math.floor(Math.random() * ADVICE_MESSAGES.length));
  }, []);

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

        {/* お気に入り進捗 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <CollectionProgress
            favoriteCount={favoriteCount}
            total={totalCount}
            isComplete={isComplete}
          />
        </motion.div>

        {/* 読書アドバイスメッセージ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto max-w-sm rounded-xl px-4 py-3 text-xs text-left leading-relaxed"
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            color: 'rgba(200,185,240,0.9)',
          }}
        >
          {ADVICE_MESSAGES[adviceIndex]}
        </motion.div>
      </div>
    </section>
  );
}
