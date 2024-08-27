/* Kann in Dateien importiert werden, die garantiert (z.B. aus Sicherheitsgründen)
nur auf dem Server ausgeführt werden darf. Wirft einen Fehler, wenn
diese Komponente in eine Client-Komponente importiert wird. */
import 'server-only';

export default function ServerOnlyComponent() {
  /* Eine Komponente, die hier entweder eine Node-Schnittstelle
	nutzt, die im Browser nicht existiert, oder z.B. einen geheimen
	API-Key oder einen Datenbankzugang enthält, der nicht an den
	Browser gesendet werden darf. */

  const isServer = typeof window === 'undefined';

  const renderInfo = `ServerOnly-Komponente gerendert auf ${
    isServer ? 'Server' : 'Client (Browser)'
  }`;

  console.log(renderInfo);

  return (
    <div>
      <strong style={{ color: 'brown' }}>ServerOnly-Komponente</strong>{' '}
    </div>
  );
}
