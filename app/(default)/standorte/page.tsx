import LocationFinder from '@/components/LocationFinder/LocationFinder';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Standorte',
};

export default function StandortePage() {
  return (
    <>
      <h1>Standorte</h1>
      <LocationFinder />
    </>
  );
}
