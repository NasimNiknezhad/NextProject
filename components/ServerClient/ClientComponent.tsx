'use client';

import type { ReactNode } from 'react';
import ServerComponent from './ServerComponent';
// import ServerOnlyComponent from './ServerOnlyComponent';

type Props = {
  children?: ReactNode;
  slot?: ReactNode;
};

export default function ClientComponent({ children, slot }: Props) {
  const isServer = typeof window === 'undefined';

  const renderInfo = `Client-Komponente gerendert auf ${
    isServer ? 'Server' : 'Client'
  }`;

  console.log(renderInfo);

  return (
    <div style={{ color: 'orange' }}>
      ClientComponent
      {/* Server-Komponenten, die in Client-Komponenten importiert werden,
	  werden automatisch selbst zu Client-Komponenten, d.h. ihr Code
	  wird an den Browser ausgeliefert und dort auch ausgeführt. */}
      <ServerComponent />
      <div>{children}</div>
      <div>{slot}</div>
      {/*   <ServerOnlyComponent /> */}
    </div>
  );
}
