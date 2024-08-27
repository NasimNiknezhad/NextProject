import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team',
};

export default function TeamPage() {
  return (
    <div>
      <h1>Team</h1>
      <ul>
        <li>
          <Link href="/team/lisa">Lisa</Link>
        </li>
        <li>
          <Link href="/team/ken">Ken</Link>
        </li>
      </ul>
    </div>
  );
}
