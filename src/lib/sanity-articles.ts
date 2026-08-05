import {toHTML, type PortableTextComponents} from "@portabletext/to-html";
import type {
  Article,
  ArticleBlock,
  ArticleLink,
  ArticleLinkCard,
  ArticleToolId,
} from "../data/articleTypes";
import {hasSanityReadToken, sanityClient, urlForImage} from "./sanity";

type SanityImage = {
  _type?: string;
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

type SanityPortableSpan = {
  _type?: string;
  _key?: string;
  text?: string;
  marks?: string[];
};

type SanityMarkDef = {
  _type?: string;
  _key?: string;
  href?: string;
};

type SanityPortableBlock = {
  _type: "block";
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: SanityPortableSpan[];
  markDefs?: SanityMarkDef[];
};

type SanityBodyBlock = {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: SanityPortableSpan[];
  markDefs?: SanityMarkDef[];
  heading?: string;
  text?: string | SanityPortableBlock[];
  intro?: string;
  label?: string;
  tone?: string;
  items?: Array<string | SanityLink>;
  links?: SanityLink[];
  image?: SanityImage;
  alt?: string;
  caption?: string;
  asset?: {_ref?: string};
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

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href) || href.startsWith("mailto:") || href.startsWith("tel:");
}

function mapImage(image: SanityImage | undefined, fallbackAlt: string) {
  if (!image?.asset) return undefined;
  return {
    src: urlForImage(image).width(1400).auto("format").url(),
    alt: image.alt?.trim() || fallbackAlt,
    ...(image.caption ? {caption: image.caption} : {}),
  };
}

function mapLinks(links: SanityLink[] | undefined): ArticleLink[] | undefined {
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
    .filter((card) => card?.href?.trim())
    .map((card) => {
      const href = card.href!.trim();
      const title = card.title?.trim();
      const label = card.label?.trim();
      return {
        href,
        ...(title ? {title} : {}),
        ...(label ? {label} : {}),
        ...(card.text?.trim() ? {text: card.text.trim()} : {}),
        ...(!title && !label ? {title: href} : {}),
      };
    });
  return mapped.length ? mapped : undefined;
}

const portableComponents: Partial<PortableTextComponents> = {
  marks: {
    link: ({children, value}) => {
      const href = typeof value?.href === "string" ? value.href.trim() : "";
      if (!href) return children;
      const external = isExternalHref(href);
      const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : "";
      return `<a href="${escapeHtml(href)}"${attrs}>${children}</a>`;
    },
  },
};

function portableToHtml(blocks: SanityPortableBlock[]) {
  if (!blocks.length) return "";
  return toHTML(blocks as never, {components: portableComponents});
}

function paragraphsFromPlainText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part).replaceAll("\n", "<br />")}</p>`)
    .join("");
}

function mapLegacySection(block: SanityBodyBlock): ArticleBlock | null {
  const heading = block.heading?.trim();
  const text = typeof block.text === "string" ? block.text.trim() : undefined;
  const items = block.items?.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
  const links = mapLinks(block.links);
  const image = mapImage(block.image, heading || "Artikkelbilde");

  if (!heading && !text && !items?.length && !links && !image) return null;

  return {
    _type: "section",
    ...(heading ? {heading} : {}),
    ...(text ? {text} : {}),
    ...(items?.length ? {items} : {}),
    ...(links ? {links} : {}),
    ...(image ? {image} : {}),
  };
}

function portableOrPlainText(value: string | SanityPortableBlock[] | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") return value.trim() || undefined;
  const html = portableToHtml(value).trim();
  return html || undefined;
}

function mapCustomBlock(block: SanityBodyBlock): ArticleBlock | null {
  const type = block._type;

  if (type === "image" || type === "imageBlock") {
    const imageSource =
      type === "image"
        ? {
            asset: block.asset,
            alt: block.alt,
            caption: block.caption,
          }
        : block.image;
    const image = mapImage(imageSource, "Artikkelbilde");
    return image ? {_type: "imageBlock", image} : null;
  }

  if (type === "links") {
    const items = mapLinks(block.items as SanityLink[] | undefined) ?? mapLinks(block.links);
    if (!items) return null;
    return {
      _type: "links",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      items,
    };
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

  // Newer Studio blocks (callout/checklist/warning) — degrade gracefully on main.
  if (type === "callout") {
    const html = portableOrPlainText(block.text);
    if (!html) return null;
    if (html.startsWith("<")) {
      return {_type: "richText", html};
    }
    return {
      _type: "section",
      ...(block.label?.trim() ? {heading: block.label.trim()} : {}),
      text: html,
    };
  }

  if (type === "checklist" || type === "warning") {
    const items = block.items?.filter((item): item is string => typeof item === "string" && Boolean(item.trim()));
    if (!items?.length && !block.heading?.trim()) return null;
    return {
      _type: "section",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      ...(items?.length ? {items} : {}),
    };
  }

  if (type === "section" || (!type && (block.heading || block.text))) {
    if (typeof block.text !== "string" && Array.isArray(block.text)) {
      const html = portableOrPlainText(block.text);
      return html?.startsWith("<")
        ? {_type: "richText", html}
        : mapLegacySection({...block, text: html});
    }
    return mapLegacySection(block);
  }

  return null;
}

function mapBody(blocks: SanityBodyBlock[] | undefined): ArticleBlock[] {
  const result: ArticleBlock[] = [];
  let richBuffer: SanityPortableBlock[] = [];

  const flushRich = () => {
    if (!richBuffer.length) return;
    const html = portableToHtml(richBuffer).trim();
    if (html) result.push({_type: "richText", html});
    richBuffer = [];
  };

  for (const block of blocks ?? []) {
    if (block._type === "block") {
      richBuffer.push(block as SanityPortableBlock);
      continue;
    }
    flushRich();
    const mapped = mapCustomBlock(block);
    if (mapped) result.push(mapped);
  }
  flushRich();
  return result;
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
    body: mapBody(doc.body),
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
  body[]
}`;

export async function getSanityArticles(): Promise<Article[]> {
  try {
    const docs = await sanityClient.fetch<SanityArticleDoc[]>(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc, title asc) ${articleProjection}`,
    );
    if (docs.length === 0 && !hasSanityReadToken()) {
      console.warn(
        "[sanity] Fant 0 artikler. Uten SANITY_API_READ_TOKEN returnerer et privat dataset tomt resultat.",
      );
    }
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

export {paragraphsFromPlainText};
