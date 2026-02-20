import type { Metadata } from 'next';
import { Noto_Sans_JP, Orbitron } from 'next/font/google';
import './globals.css';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BOOK GRIMOIRE | 冒険書ギャラリー',
  description: 'キャリア・成長・思考力を高める41冊のおすすめ書籍コレクション。カードゲーム風のリッチなUIで本と出会おう。',
  openGraph: {
    title: 'BOOK GRIMOIRE',
    description: '41冊の冒険書が、あなたを待っている',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={`${notoSansJP.variable} ${orbitron.variable}`}>
      <body
        className="antialiased"
        style={{
          fontFamily: 'var(--font-noto), "Noto Sans JP", sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
