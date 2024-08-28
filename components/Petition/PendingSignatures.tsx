import prisma from '@/prisma/db';
import SignatureToCheck from './SignatureToCheck';

export default async function PendingSignatures() {
  const signatures = await prisma.signature.findMany({
    where: {
      approved: false,
    },
  });

  if (!signatures.length) {
    return <h2>Keine ungeprüften Unterschriften</h2>;
  }

  return (
    <ul>
      {signatures.map((signature) => (
        <SignatureToCheck key={signature.id} {...signature} />
      ))}
    </ul>
  );
}
