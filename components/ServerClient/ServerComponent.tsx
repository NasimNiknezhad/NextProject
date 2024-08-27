export default function ServerComponent() {
  const isServer = typeof window === 'undefined';

  const renderInfo = `Server-Komponente gerendert auf ${
    isServer ? 'Server' : 'Client'
  }`;

  console.log(renderInfo);

  return <div style={{ color: 'blue' }}>ServerComponent</div>;
}
