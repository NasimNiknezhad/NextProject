import type { Metadata } from 'next';
import prisma from '@/prisma/db';
import classes from './petition.module.css';
import Link from 'next/link';
import Image from 'next/image';
import saveTheWhales from '@/img/save-the-whales.jpg';
import PendingSignatures from '@/components/Petition/PendingSignatures';
import PetitionForm from '@/components/Petition/PetitionForm';

/* Pages erhalten automatisch searchParams als Prop */
type Props = {
  searchParams: {
    page?: string;
    perPage?: string;
  };
};

const defaultPerPage = 1;

export const metadata: Metadata = {
  title: '🐳 Rettet die Wale - Jetzt unterschreiben!',
};

export default async function PetitionPage({
  searchParams: { page = '', perPage = '' },
}: Props) {
  /* Setzt eine Pagination um. Standardmäßig sollen z.B. nur die ersten 2
	Unterschriften angezeigt werden. Aber über den Search-Parameter page
	soll die Seite konfigurierbar sein, mit dem Parameter perPage soll man
	angeben können, dass mehr Unterschriften pro Seite sichtbar sind.
	Versucht möglichst, ungültige oder extreme Werte für page und perPage
	zu vermeiden. 
	*/

  const perPageNumber = Math.max(
    Math.min(parseInt(perPage) || defaultPerPage, 100),
    1
  );

  /* Nutzt die Methode count von prisma, um die Anzahl der approved
	Unterschriften in die Variable totalSignatures zu speichern. */
  const totalSignatures = await prisma.signature.count({
    where: {
      approved: true,
    },
  });

  const totalPageCount = Math.ceil(totalSignatures / perPageNumber);

  let pageNumber = Math.max(parseInt(page) || 1, 1);
  if (pageNumber > totalPageCount) {
    pageNumber = 1;
  }

  /* Die Ergebnisse sollen in anderer Reihenfolge aus der Datenbank kommen, älteste
Unterschriften zuerst. */
  const signatures = await prisma.signature.findMany({
    where: {
      approved: true,
    },
    take: perPageNumber,
    skip: (pageNumber - 1) * perPageNumber,
    orderBy: {
      date: 'asc',
    },
  });

  const perPageParam =
    perPageNumber !== defaultPerPage ? `&perPage=${perPageNumber}` : '';

  return (
    <>
      <h1 className={classes.heading}>Rettet die Wale!</h1>

      {/* Ein Bild mit Hilfe der Next Image-Komponente hier erstellen, mit den korrekten
Attributen, z.B. korrekte sizes-Angabe */}
      <Image
        src={saveTheWhales}
        alt="Save the Whales von Friedensreich Hundertwasser"
        className={classes.image}
        sizes="(width < 32rem) 90vw, 30rem"
        placeholder="blur"
      />

      <p className={classes.intro}>
        {/* Bittet eine KI, euch einen Text mit 100 Wörtern zu generieren, der zum Thema
passt. */}
        Wir müssen dringend handeln, um die Wale zu retten! Diese majestätischen
        Kreaturen sind durch menschliche Aktivitäten stark bedroht.
        Überfischung, Verschmutzung der Meere und der Klimawandel setzen ihnen
        zu. Wale spielen eine entscheidende Rolle im Ökosystem unserer Ozeane.
        Sie helfen bei der Regulierung des Klimas und unterstützen die Vielfalt
        des Lebens im Meer. Ohne sie würde das Gleichgewicht der
        Meereslebensräume gestört. Lasst uns zusammenstehen und die Wale
        schützen. Unterzeichnen Sie diese Petition, um Regierungen und
        Organisationen weltweit aufzufordern, Maßnahmen zum Schutz der Wale zu
        ergreifen. Jede Stimme zählt. Rettet die Wale!
      </p>
      <strong>Schon {totalSignatures} haben unterschrieben!</strong>

      {/* Nutzt das start-Attribut von ol, um die korrekten Nummern anzuzeigen.
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/ol
*/}
      <ol className={classes.list} start={(pageNumber - 1) * perPageNumber + 1}>
        {signatures.map(({ name, date, id }) => (
          <li key={id}>
            {name || 'Freund*in der Wale'} (
            <time dateTime={date.toISOString().substring(0, 10)}>
              {date.toLocaleDateString('de')}
            </time>
            )
          </li>
        ))}
      </ol>
      {/* 
			Fügt hier zwei Next-Link-Komponenten ein, mit denen man auf die jeweils nächste
			Seite navigieren kann. Der Link "Weitere" bzw. "Vorige Unterschriften" soll nur
			sichtbar sein, wenn es weitere bzw. vorige Unterschriten gibt. 
			*/}
      {totalPageCount > 1 && (
        <nav className={classes.pagination} aria-label="Pagination">
          {pageNumber > 1 && (
            <Link
              href={`/petition?page=${pageNumber - 1}${perPageParam}`}
              scroll={false}
            >
              Vorige Unterschriften
            </Link>
          )}
          {pageNumber < totalPageCount && (
            <Link
              href={`/petition?page=${pageNumber + 1}${perPageParam}`}
              scroll={false}
            >
              Nächste Unterschriften
            </Link>
          )}
        </nav>
      )}
      <PetitionForm />
      <PendingSignatures />
    </>
  );
}
