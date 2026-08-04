import type { Article } from "../data/articleTypes";
import { sanityClient, urlForImage } from "./sanity";

type SanityImage = {
  alt?: string;
  caption?: string;
  asset?: {_ref?: string};
};

type SanitySection = {
  heading?: string;
  text?: string;
  items?: string[];
  image?: SanityImage;
};

type SanityArticleDoc = {
  _id: string;
  title: string;
  slug?: {current?: string};
  category?: string;
  intro?: string;
  image?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
  body?: SanitySection[];
};

function mapImage(image: SanityImage | undefined, fallbackAlt: string) {
  if (!image?.asset) return undefined;
  return {
    src: urlForImage(image).width(1400).auto("format").url(),
    alt: image.alt?.trim() || fallbackAlt,
    ...(image.caption ? {caption: image.caption} : {}),
  };
}

function mapSanityArticle(doc: SanityArticleDoc): Article | null {
  const slug = doc.slug?.current?.trim();
  if (!slug || !doc.title) return null;

  return {
    title: doc.title,
    slug,
    href: `/kjekt-a-vite/${slug}`,
    category: doc.category?.trim() || "Annet",
    intro: doc.intro?.trim() || "",
    image: mapImage(doc.image, doc.title),
    seoTitle: doc.seoTitle?.trim() || `${doc.title} | SG Logistics AS`,
    seoDescription: doc.seoDescription?.trim() || doc.intro?.trim() || doc.title,
    body: (doc.body ?? [])
      .filter((section) => section?.heading && section?.text)
      .map((section) => ({
        heading: section.heading!,
        text: section.text!,
        ...(section.items?.length ? {items: section.items} : {}),
        ...(mapImage(section.image, section.heading!)
          ? {image: mapImage(section.image, section.heading!)}
          : {}),
      })),
  };
}

const articleProjection = `{
  _id,
  title,
  slug,
  category,
  intro,
  image,
  seoTitle,
  seoDescription,
  body[]{
    heading,
    text,
    items,
    image
  }
}`;

export async function getSanityArticles(): Promise<Article[]> {
  try {
    const docs = await sanityClient.fetch<SanityArticleDoc[]>(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc, title asc) ${articleProjection}`,
    );
    return docs.map(mapSanityArticle).filter((article): article is Article => Boolean(article));
  } catch (err) {
    console.error("Failed to fetch Sanity articles", err);
    return [];
  }
}

export async function getSanityArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const doc = await sanityClient.fetch<SanityArticleDoc | null>(
      `*[_type == "article" && slug.current == $slug][0] ${articleProjection}`,
      {slug},
    );
    return doc ? mapSanityArticle(doc) : null;
  } catch (err) {
    console.error("Failed to fetch Sanity article", slug, err);
    return null;
  }
}
