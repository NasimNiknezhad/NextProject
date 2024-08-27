import ClientComponent from '@/components/ServerClient/ClientComponent';
import ServerComponent from '@/components/ServerClient/ServerComponent';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

//import ClientOnlyComponent from '@/components/ServerClient/ClientOnlyComponent';

/* dynamic ist die Next-Version von React.lazy, damit wird der JS-Code
für die Komponente erst dann geladen, wenn diese tatsächlich dargestellt wird,
was z.B. sinnvoll ist, wenn eine größere Komponente nur manchmal
nach einer User-Aktion angezeigt wird. Das allein verhindert aber NICHT, 
dass das HTML schon auf dem Server gerendert wird. Wenn man das verhindern
möchte, weil der Code nur im Browser funktioniert (z.B. auf window oder document
zugreift), muss man zusätzlich die ssr-Option (Server-Side-Rendering) auf false setzen. */

const ClientOnlyComponent = dynamic(
  () => import('@/components/ServerClient/ClientOnlyComponent'),
  { ssr: false }
);

export const metadata: Metadata = {
  title: 'Client & Server',
};

export default function ClientServerPage() {
  return (
    <div>
      <h1>Client & Server</h1>
      <ServerComponent />
      <ClientComponent slot={<ServerComponent />}>
        <ServerComponent />
      </ClientComponent>
      <ClientOnlyComponent />
    </div>
  );
}
