import type {
  Article,
  ArticleBlock,
  ArticleLinkCard,
  ArticleToolId,
} from "../data/articleTypes";
import { sanityClient, urlForImage } from "./sanity";

type SanityImage = {
  alt?: string;
  caption?: string;
  asset?: {_ref?: string};
};

type SanityLink = {
  label?: string;
  href?: string;
};

type SanityLinkCard = {
  title?: string;
  href?: string;
  label?: string;
  text?: string;
};

type SanityBodyBlock = {
  _type?: string;
  _key?: string;
  heading?: string;
  text?: string;
  intro?: string;
  items?: string[];
  links?: SanityLink[];
  image?: SanityImage;
  cards?: SanityLinkCard[];
  tool?: string;
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
  body?: SanityBodyBlock[];
};

const TOOLS = new Set<ArticleToolId>(["incoterms", "liability"]);

function mapImage(image: SanityImage | undefined, fallbackAlt: string) {
  if (!image?.asset) return undefined;
  return {
    src: urlForImage(image).width(1400).auto("format").url(),
    alt: image.alt?.trim() || fallbackAlt,
    ...(image.caption ? {caption: image.caption} : {}),
  };
}

function mapLinks(links: SanityLink[] | undefined) {
  const mapped = (links ?? [])
    .filter((link) => link?.label?.trim() && link?.href?.trim())
    .map((link) => ({
      label: link.label!.trim(),
      href: link.href!.trim(),
    }));
  return mapped.length ? mapped : undefined;
}

function mapCards(cards: SanityLinkCard[] | undefined): ArticleLinkCard[] | undefined {
  const mapped = (cards ?? [])
    .filter((card) => card?.title?.trim() && card?.href?.trim())
    .map((card) => ({
      title: card.title!.trim(),
      href: card.href!.trim(),
      ...(card.label?.trim() ? {label: card.label.trim()} : {}),
      ...(card.text?.trim() ? {text: card.text.trim()} : {}),
    }));
  return mapped.length ? mapped : undefined;
}

function mapBodyBlock(block: SanityBodyBlock): ArticleBlock | null {
  const type = block._type || "section";

  if (type === "imageBlock") {
    const image = mapImage(block.image, "Artikkelbilde");
    return image ? {_type: "imageBlock", image} : null;
  }

  if (type === "linkCards") {
    const cards = mapCards(block.cards);
    if (!cards) return null;
    return {
      _type: "linkCards",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      ...(block.intro?.trim() ? {intro: block.intro.trim()} : {}),
      cards,
    };
  }

  if (type === "tool") {
    const tool = block.tool?.trim();
    if (!tool || !TOOLS.has(tool as ArticleToolId)) return null;
    return {_type: "tool", tool: tool as ArticleToolId};
  }

  if (!block.heading?.trim() || !block.text?.trim()) return null;

  return {
    _type: "section",
    heading: block.heading.trim(),
    text: block.text.trim(),
    ...(block.items?.length ? {items: block.items} : {}),
    ...(mapLinks(block.links) ? {links: mapLinks(block.links)} : {}),
    ...(mapImage(block.image, block.heading.trim())
      ? {image: mapImage(block.image, block.heading.trim())}
      : {}),
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
      .map(mapBodyBlock)
      .filter((block): block is ArticleBlock => Boolean(block)),
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
    _type,
    _key,
    heading,
    text,
    intro,
    items,
    links[]{label, href},
    image,
    cards[]{title, label, href, text},
    tool
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
