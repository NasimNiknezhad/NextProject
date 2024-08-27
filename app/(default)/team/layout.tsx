import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  description: 'Unser starkes Team',
};

type Props = {
  children: ReactNode;
};
export default function TeamLayout({ children }: Props) {
  return (
    <>
      {children}
      <strong>Wir suchen Verstärkung!</strong>
    </>
  );
}
