import type { BlogPostTeaserGql } from '@/types/blog-types';
import Link from 'next/link';

type Props = BlogPostTeaserGql;
export default function BlogTeaserGql({ title, slug, date, excerpt }: Props) {
  return (
    <article>
      <Link href={`/gql-blog/${slug}`}>
        <h2>{title}</h2>
      </Link>
      <time dateTime={date.substring(0, 10)}>
        {new Date(date).toLocaleDateString('de')}
      </time>
      <div dangerouslySetInnerHTML={{ __html: excerpt }} />
    </article>
  );
}
