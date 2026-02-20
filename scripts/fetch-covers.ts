import fs from 'fs';
import path from 'path';

interface BookRaw {
  id: number;
  title: string;
  author: string;
  description: string;
  rating: number;
  attribute: string;
  thumbnail: string | null;
}

async function fetchGoogleBooksCover(title: string, author: string): Promise<string | null> {
  const query = encodeURIComponent(`intitle:${title} inauthor:${author}`);
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1&langRestrict=ja`;

  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const data = await res.json() as { items?: Array<{ volumeInfo?: { imageLinks?: { thumbnail?: string } } }> };
    const thumbnail = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail;
    if (!thumbnail) return null;
    // http -> https, zoom=1で少し大きめに
    return thumbnail.replace('http://', 'https://').replace('zoom=1', 'zoom=3');
  } catch {
    return null;
  }
}

async function main() {
  const booksPath = path.join(process.cwd(), 'data', 'books.json');
  const books: BookRaw[] = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));

  let updated = 0;
  let failed = 0;

  for (const book of books) {
    if (book.thumbnail) {
      console.log(`[SKIP] #${book.id} ${book.title} (already has thumbnail)`);
      continue;
    }

    const cover = await fetchGoogleBooksCover(book.title, book.author);
    if (cover) {
      book.thumbnail = cover;
      updated++;
      console.log(`[OK]   #${book.id} ${book.title}`);
    } else {
      failed++;
      console.log(`[FAIL] #${book.id} ${book.title}`);
    }

    // レート制限対策
    await new Promise(r => setTimeout(r, 300));
  }

  fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));
  console.log(`\nDone: ${updated} updated, ${failed} failed`);
}

main().catch(console.error);
