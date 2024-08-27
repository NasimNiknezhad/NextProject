import Link from 'next/link';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};
export default function MemberLayout({ children }: Props) {
  return (
    <>
      <div>
        <Link href="/team">Zurück zur Team-Seite</Link>
      </div>
      {children}
    </>
  );
}
