import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return <main className="default-layout">{children}</main>;
}
