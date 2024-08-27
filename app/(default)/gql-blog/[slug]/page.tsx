import type { SingleBlogPostGql } from '@/types/blog-types';
import request, { gql } from 'graphql-request';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

export const revalidate = 600;

const WP_GRAPHQL_BASE = process.env.WP_GRAPHQL_BASE!;

type Props = {
  params: {
    slug: string;
  };
};

export default async function SingleBlogPage({ params: { slug } }: Props) {
  const { title, date, content, featuredImage } = await getPostData(slug);

  const imageData = featuredImage?.node;

  return (
    <div>
      <header>
        <h1>{title}</h1>
        <time dateTime={date.substring(0, 10)}>
          {new Date(date).toLocaleDateString('de')}
        </time>
      </header>
      {/* Bild, falls Bilddaten vorhanden, mit der Image-Komponente darstellen */}

      {imageData && (
        <Image
          className="full-width-image"
          src={imageData.guid}
          alt={imageData.altText}
          {...imageData.mediaDetails}
        />
      )}
      {/* Hier den content in einem div darstellen */}
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}

/* Daten des zum Slug passenden Beitrags laden. Falls kein Beitrag gefunden
wurde, die not-found-Seite anzeigen.
*/
async function getPostData(slug: string) {
  const query = gql`{
		post(id: "${slug}", idType: SLUG) {
		  title
		  date
		  content
		  featuredImage {
			node {
			  altText
			  guid
			  mediaDetails {
				height
				width
			  }
			}
		  }
		}
	  }
	`;

  const { post } = (await request(WP_GRAPHQL_BASE, query)) as {
    post: SingleBlogPostGql;
  };

  if (!post) {
    notFound();
  }

  return post;
}

/* Dynamisch den Titel in Metadaten einfügen */

export async function generateMetadata({
  params: { slug },
}: Props): Promise<Metadata> {
  const { title } = await getPostData(slug);

  return {
    title,
  };
}

/* Mit dieser Funktion können alle Werte von slug, die aktuell bekannt sind,
schon vorab an Next mitgeteilt werden, so dass die Seiten für diese Slugs
schon beim build erzeugt werden können, und nicht dynamisch beim ersten Aufrufen
des Slugs (mit Wartezeit) erzeugt werden müssen.
https://nextjs.org/docs/app/api-reference/functions/generate-static-params
*/
export async function generateStaticParams() {
  const query = gql`
    {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  const response = (await request(WP_GRAPHQL_BASE, query)) as {
    posts: { nodes: { slug: string }[] };
  };

  return response.posts.nodes.map(({ slug }) => ({ slug }));
}
