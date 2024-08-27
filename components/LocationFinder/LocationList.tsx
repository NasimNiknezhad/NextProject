import type { CimdataLocation } from '@/types/location-types';

type Props = { locations: CimdataLocation[] };
export default function LocationList({ locations }: Props) {
  return (
    <ul>
      {locations.map(({ title, distance }) => (
        <li key={title}>
          {title} {distance !== undefined ? `(${distance.toFixed(2)} km)` : ''}
        </li>
      ))}
    </ul>
  );
}
