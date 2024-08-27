import type { BlogPostRest } from '@/types/blog-types';
import Link from 'next/link';

type Props = BlogPostRest;
export default function BlogTeaserRest({ title, slug, date, excerpt }: Props) {
  return (
    <article>
      <Link href={`/blog/${slug}`}>
        <h2>{title.rendered}</h2>
      </Link>
      <time dateTime={date.substring(0, 10)}>
        {new Date(date).toLocaleDateString('de')}
      </time>
      <div dangerouslySetInnerHTML={{ __html: excerpt.rendered }} />
    </article>
  );
}
