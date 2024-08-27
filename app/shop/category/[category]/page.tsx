import ProductTeaser from '@/components/ProductTeaser';
import type { Product } from '@/types/shop-types';
import type { Metadata } from 'next';
import { capitalize } from 'es-toolkit';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    category: string;
  };
};
export default async function CategoryPage({ params: { category } }: Props) {
  const response = await fetch(
    `https://fakestoreapi.com/products/category/${category}`,
    {
      cache: 'force-cache',
    }
  );

  const products = (await response.json()) as Product[];

  if (!products.length) {
    notFound();
  }

  return (
    <div>
      <h1 className="capitalize">{decodeURI(category)}</h1>
      <div className="product-teasers grid">
        {products.map((product) => (
          <ProductTeaser key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}

export async function generateMetadata({
  params: { category },
}: Props): Promise<Metadata> {
  return {
    title: decodeURI(category).split(' ').map(capitalize).join(' '),
  };
}
