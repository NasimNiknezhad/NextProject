import type { CimdataLocation, LatLng } from '@/types/location-types';
import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
// @ts-expect-error
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
type Props = {
  zoom: number;
  center: LatLng;
  locations?: CimdataLocation[];
};
export default function Map({ zoom, center, locations = [] }: Props) {
  /* Achtung: Die zoom und center-Props von MapContainer werden nur für die
	erste Darstellung der Karte verwendet, wenn sie sich später ändern, 
	hat das keine Auswirkung auf die Karte! */
  return (
    <MapContainer zoom={zoom} center={center} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup>
        {locations.map(({ title, latLng }) => (
          <Marker key={title} position={latLng}>
            <Popup>
              <strong>{title}</strong>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
      <MapController zoom={zoom} center={center} />
    </MapContainer>
  );
}

/* 
1. zoom und center als Props an MapController übergeben
2. zoom und center mit useEffect beobachten und im Effekt
die Methode setView auf map anwenden.
(https://leafletjs.com/reference.html#map-methods-for-modifying-map-state)
*/

type MapControllerProps = Pick<Props, 'center' | 'zoom'>;

function MapController({ zoom, center }: MapControllerProps) {
  /* map enthält die Leaflet-Instanz. */
  const map = useMap();

  /* Hier werden Methoden der Leaflet-Bibliothek verwendet, ganz unabhängig
        von React!
       https://leafletjs.com/reference.html#map-methods-for-modifying-map-state
        (Achtung: Da map.setView() das map-Objekt zurückgibt, müssen wir bei der Callback-
        Funktion in useEffect geschweifte Klammern verwenden, um die automatische Rückgabe
        bei einzeiligen Pfeilfunktionen zu vermeiden. React würde sonst map für die 
        "Aufräum-Funktion" des Effekts halten und als Funktion aufrufen, was zum Absturz 
        des Programms führen würde.)
        */
  useEffect(() => {
    map.setView(center, zoom);
  }, [zoom, center, map]);

  return null;
}
