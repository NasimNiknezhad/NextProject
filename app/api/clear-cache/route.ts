import { revalidatePath } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

/* 
https://nextjs.org/docs/app/building-your-application/routing/route-handlers

https://nextjs.org/docs/app/api-reference/functions/next-request
https://nextjs.org/docs/app/api-reference/functions/next-response

Statuscodes:
https://de.wikipedia.org/wiki/HTTP-Statuscode
*/

/* 
Aufruf der URL /api/clear-cache?secret=123&path=/(default)/blog
leert den Cache für die Inhalte, die dem path-Parameter entsprechenden
entsprechen. Die URL kann manuell aufgerufen
werden, in den meisten CMS-Systemen kann man aber auch angeben,
dass die URL bei jedem Speichervorgang, also bei jeder Änderung
von Inhalte automatisch aufgerufen wird.
Achtung: path muss dem Pfad im Dateisystem ab dem app-Ordner
angeben oder der URL ab der Domain entsprechen:
"/(default)/blog" oder "/blog"
"/shop/[id]" oder "/shop/123"

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
https://nextjs.org/docs/app/api-reference/functions/revalidatePath

Alternativ könnte man auch einen oder mehrere fetch-Aufrufe mit einem
tag, also einem Schlagwort versehen, und dann mit revalidateTag
löschen.
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching-caching-and-revalidating#on-demand-revalidation
https://nextjs.org/docs/app/api-reference/functions/revalidateTag
*/

export function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const secret = request.nextUrl.searchParams.get('secret');

  if (!path) {
    return NextResponse.json({ message: 'Wrong Path' }, { status: 400 });
  }

  /* 
  1. CACHE_SECRET mit Wert 123 in .env speichern.
  2. Den Search-Parameter secret aus der URL auslesen und mit CACHE_SECRET vergleichen
  3. Wenn der Wert nicht übereinstimmt, eine Response mit der Message 'Wrong Secret' und
  einem passenden Statuscode zurücksenden.
  */

  if (secret !== process.env.CACHE_SECRET) {
    return NextResponse.json({ message: 'Wrong Secret' }, { status: 401 });
  }

  revalidatePath(path, 'layout');

  // Kurze Variante, fügt automatisch Statuscode 200 und Conten-Type JSON hinzu.
  return NextResponse.json({
    message: `Cache for path ${path} cleared`,
    now: new Date().toTimeString(),
  });

  // Ausführliche Variante, wenn man z.B. CORS-Header setzen möchte:
  /*   return new NextResponse(
    JSON.stringify({
      now: new Date().toTimeString(),
    }),
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Content-Type': 'application/json',
      },
    }
  ); */
}
