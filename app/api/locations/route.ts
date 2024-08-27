import { NextRequest, NextResponse } from 'next/server';

/* Datenquelle:  https://github.com/zauberware/postal-codes-json-xml-csv
 */
import allLocations from '@/lib/zipcodes.de.json';

/* 
https://nextjs.org/docs/app/api-reference/functions/next-request
https://nextjs.org/docs/app/api-reference/functions/next-response
*/
export function GET(request: NextRequest) {
  const search = request.nextUrl.searchParams.get('search') ?? '';

  const locations = search.length > 1 ? getLocations(search) : [];

  // Kurze Variante, fügt automatisch Statuscode 200 und Conten-Type JSON hinzu.
  return NextResponse.json(locations);

  // Ausführliche Variante, wenn man z.B. CORS-Header setzen möchte:
  return new NextResponse(JSON.stringify(locations), {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Content-Type': 'application/json',
    },
  });
}

function getLocations(searchTerm: string) {
  /*  Datensatz filtern, zipcode ist ein String und kein Integer, da
	  PLZ mit 0 beginnen können. startsWith ist einen String-Methode, die
	  prüft, ob ein String mit einem anderen String beginnt, und entsprechend
	  true oder false zurückgibt.
	  Bei der Ortssuche wird ein Regulärer Ausdruck verwendet, um nicht nur den
	  Anfang des Strings zu suchen und dadurch auch Stadteile wie "Berlin Kreuzberg"
	  oder Orte wie "Lutherstadt Wittenberg" zu finden. 
  */

  const regExp = new RegExp(searchTerm, 'i');
  return allLocations.filter(
    ({ zipcode, place }) => zipcode.startsWith(searchTerm) || regExp.test(place)
  );
}
