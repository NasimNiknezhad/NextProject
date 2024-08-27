import type { Metadata } from 'next';
import Link from 'next/link';

// https://nextjs.org/docs/app/api-reference/file-conventions/not-found

export const metadata: Metadata = {
  title: '404 - Nicht gefunden 🤷',
};

export default function NotFound() {
  return (
    <main className="default-layout">
      <h1>Zu dieser URL wurde leider nichts gefunden 🤷</h1>

      <p>Versuchen Sie es doch mit einem der folgenden Links:</p>
      <ul>
        <li>
          <Link href="/">Startseite</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/shop">Produktübersicht</Link>
        </li>
      </ul>
    </main>
  );
}
