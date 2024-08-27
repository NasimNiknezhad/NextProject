import { getFormattedPrice } from '@/lib/helpers';
import type { Product } from '@/types/shop-types';
import Link from 'next/link';

/* Pick ist ein Hilfstyp, mit dem man sich auch einem Typ nur
bestimmte Eigenschaften herauspicken kann. Hier z.B. sinnvoll,
weil wir einige Eigenschaften von Product gar nicht benötigen,
sie aber immer übergeben müssten, wenn wir Product direkt als
Prop-Typ nehmen würden.
https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys
*/
type Props = Pick<Product, 'id' | 'image' | 'price' | 'title'>;

export default function ProductTeaser({ id, image, price, title }: Props) {
  return (
    <article className="product-teaser">
      <h2 className="product-teaser__title capitalize">
        <Link href={`/shop/${id}`}>{title}</Link>
      </h2>
      <strong>{getFormattedPrice(price * 100)}</strong>
      <img className="product-teaser__image" src={image} alt="" />
    </article>
  );
}
