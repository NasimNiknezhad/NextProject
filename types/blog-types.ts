export type BlogPostRest = {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  featured_media: number;
};

export type BlogImageRest = {
  guid: { rendered: string };
  alt_text: string;
  media_details: {
    width: number;
    height: number;
  };
};

type BlogPostBaseGql = {
  title: string;
  date: string;
};

export type BlogPostTeaserGql = BlogPostBaseGql & {
  slug: string;
  excerpt: string;
};

export type SingleBlogPostGql = BlogPostBaseGql & {
  content: string;
  featuredImage?: {
    node: BlogImageGql;
  };
};

export type BlogImageGql = {
  altText: string;
  guid: string;
  mediaDetails: {
    height: number;
    width: number;
  };
};
