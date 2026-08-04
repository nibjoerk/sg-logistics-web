import {toHTML, type PortableTextComponents} from "@portabletext/to-html";
import type {
  Article,
  ArticleBlock,
  ArticleLayout,
  ArticleLink,
  ArticleLinkCard,
  ArticleTocItem,
  ArticleToolId,
} from "../data/articleTypes";
import {getArticleBlockType, slugifyHeading} from "../data/articleTypes";
import {sanityClient, urlForImage} from "./sanity";

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

type SanityFact = {
  label?: string;
  value?: string;
};

type SanityInfoCard = {
  title?: string;
  text?: string;
  label?: string;
};

type SanityTableRow = {
  cells?: string[];
};

type SanityFaqItem = {
  question?: string;
  answer?: string;
};

type SanitySymbol = {
  image?: SanityImage;
  title?: string;
  subtitle?: string;
  meaning?: string;
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
  tone?: string;
  label?: string;
  items?: Array<string | SanityLink | SanityFact | SanityFaqItem | SanitySymbol>;
  links?: SanityLink[];
  image?: SanityImage;
  alt?: string;
  caption?: string;
  asset?: {_ref?: string};
  cards?: Array<SanityLinkCard | SanityInfoCard>;
  columns?: number | string[];
  rows?: SanityTableRow[];
  footnote?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  tool?: string;
};

type SanityArticleDoc = {
  _id: string;
  title: string;
  slug?: {current?: string};
  category?: string;
  layout?: string;
  intro?: string;
  image?: SanityImage;
  seoTitle?: string;
  seoDescription?: string;
  body?: SanityBodyBlock[];
};

const TOOLS = new Set<ArticleToolId>(["incoterms", "liability", "volumeWeight"]);
const LAYOUTS = new Set<ArticleLayout>(["standard", "guide"]);
const CALLOUT_TONES = new Set(["info", "warning", "tip"]);

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

function addHeadingIds(html: string): string {
  return html.replace(/<h2([^>]*)>([\s\S]*?)<\/h2>/gi, (_match, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
    const id = slugifyHeading(text);
    if (!id || /\sid=/.test(attrs)) return `<h2${attrs}>${inner}</h2>`;
    return `<h2${attrs} id="${id}">${inner}</h2>`;
  });
}

function paragraphsFromPlainText(text: string) {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => `<p>${escapeHtml(part).replaceAll("\n", "<br />")}</p>`)
    .join("");
}

function mapTextField(value: string | SanityPortableBlock[] | undefined): string | undefined {
  if (!value) return undefined;
  if (typeof value === "string") {
    const html = paragraphsFromPlainText(value);
    return html || undefined;
  }
  if (Array.isArray(value)) {
    const html = portableToHtml(value).trim();
    return html || undefined;
  }
  return undefined;
}

function stringItems(items: SanityBodyBlock["items"]): string[] | undefined {
  const mapped = (items ?? [])
    .filter((item): item is string => typeof item === "string" && Boolean(item.trim()))
    .map((item) => item.trim());
  return mapped.length ? mapped : undefined;
}

function mapLegacySection(block: SanityBodyBlock): ArticleBlock | null {
  const heading = block.heading?.trim();
  const text = typeof block.text === "string" ? block.text.trim() : undefined;
  const items = stringItems(block.items);
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

  if (type === "callout") {
    const html = mapTextField(block.text);
    if (!html) return null;
    const tone = CALLOUT_TONES.has(block.tone || "")
      ? (block.tone as "info" | "warning" | "tip")
      : "info";
    return {
      _type: "callout",
      tone,
      ...(block.label?.trim() ? {label: block.label.trim()} : {}),
      html,
    };
  }

  if (type === "checklist") {
    const items = stringItems(block.items);
    if (!items) return null;
    return {
      _type: "checklist",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      items,
    };
  }

  if (type === "warning") {
    const items = stringItems(block.items);
    if (!items) return null;
    return {
      _type: "warning",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      items,
    };
  }

  if (type === "infoCards") {
    const cards = (block.cards ?? [])
      .map((card) => {
        const title = card.title?.trim();
        const text = card.text?.trim();
        if (!title || !text) return null;
        return {
          title,
          text,
          ...(card.label?.trim() ? {label: card.label.trim()} : {}),
        };
      })
      .filter((card): card is NonNullable<typeof card> => Boolean(card));
    if (!cards.length) return null;
    const columns = block.columns === 3 ? 3 : 2;
    return {
      _type: "infoCards",
      columns,
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      cards,
    };
  }

  if (type === "factTiles") {
    const items = (block.items ?? [])
      .map((item) => {
        if (!item || typeof item === "string") return null;
        const label = "label" in item ? item.label?.trim() : undefined;
        const value = "value" in item ? item.value?.trim() : undefined;
        if (!label || !value) return null;
        return {label, value};
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    if (!items.length) return null;
    return {
      _type: "factTiles",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      items,
    };
  }

  if (type === "table") {
    const columns = Array.isArray(block.columns)
      ? block.columns.map((col) => String(col).trim()).filter(Boolean)
      : [];
    const rows = (block.rows ?? [])
      .map((row) => (row.cells ?? []).map((cell) => String(cell ?? "").trim()))
      .filter((row) => row.some(Boolean));
    if (!columns.length || !rows.length) return null;
    return {
      _type: "table",
      columns,
      rows,
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      ...(block.intro?.trim() ? {intro: block.intro.trim()} : {}),
      ...(block.footnote?.trim() ? {footnote: block.footnote.trim()} : {}),
    };
  }

  if (type === "faq") {
    const items = (block.items ?? [])
      .map((item) => {
        if (!item || typeof item === "string") return null;
        const question = "question" in item ? item.question?.trim() : undefined;
        const answer = "answer" in item ? item.answer?.trim() : undefined;
        if (!question || !answer) return null;
        return {question, answer};
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    if (!items.length) return null;
    return {
      _type: "faq",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      items,
    };
  }

  if (type === "cta") {
    const heading = block.heading?.trim();
    const primaryLabel = block.primaryLabel?.trim();
    const primaryHref = block.primaryHref?.trim();
    if (!heading || !primaryLabel || !primaryHref) return null;
    const secondaryLabel = block.secondaryLabel?.trim();
    const secondaryHref = block.secondaryHref?.trim();
    return {
      _type: "cta",
      heading,
      ...(typeof block.text === "string" && block.text.trim()
        ? {text: block.text.trim()}
        : {}),
      primary: {label: primaryLabel, href: primaryHref},
      ...(secondaryLabel && secondaryHref
        ? {secondary: {label: secondaryLabel, href: secondaryHref}}
        : {}),
    };
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
    const cards = mapCards(block.cards as SanityLinkCard[] | undefined);
    if (!cards) return null;
    return {
      _type: "linkCards",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      ...(block.intro?.trim() ? {intro: block.intro.trim()} : {}),
      cards,
    };
  }

  if (type === "symbolGallery") {
    const items = (block.items ?? [])
      .map((item) => {
        if (!item || typeof item === "string" || !("title" in item)) return null;
        const title = item.title?.trim();
        const image = mapImage(item.image, title || "Symbol");
        if (!title || !image) return null;
        return {
          image,
          title,
          ...(item.subtitle?.trim() ? {subtitle: item.subtitle.trim()} : {}),
          ...(item.meaning?.trim() ? {meaning: item.meaning.trim()} : {}),
        };
      })
      .filter((item): item is NonNullable<typeof item> => Boolean(item));
    if (!items.length) return null;
    return {
      _type: "symbolGallery",
      ...(block.heading?.trim() ? {heading: block.heading.trim()} : {}),
      ...(block.intro?.trim() ? {intro: block.intro.trim()} : {}),
      items,
    };
  }

  if (type === "tool") {
    const tool = block.tool?.trim();
    if (!tool || !TOOLS.has(tool as ArticleToolId)) return null;
    return {_type: "tool", tool: tool as ArticleToolId};
  }

  if (type === "section" || (!type && (block.heading || block.text))) {
    return mapLegacySection(block);
  }

  return null;
}

function mapBody(blocks: SanityBodyBlock[] | undefined): ArticleBlock[] {
  const result: ArticleBlock[] = [];
  let richBuffer: SanityPortableBlock[] = [];

  const flushRich = () => {
    if (!richBuffer.length) return;
    const html = addHeadingIds(portableToHtml(richBuffer).trim());
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

function buildToc(body: ArticleBlock[]): ArticleTocItem[] {
  const toc: ArticleTocItem[] = [];
  const seen = new Set<string>();

  const push = (label: string) => {
    const base = slugifyHeading(label);
    if (!base) return;
    let id = base;
    let i = 2;
    while (seen.has(id)) {
      id = `${base}-${i}`;
      i += 1;
    }
    seen.add(id);
    toc.push({id, label});
  };

  for (const block of body) {
    const type = getArticleBlockType(block);
    if (type === "richText" && block._type === "richText") {
      for (const match of block.html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)) {
        const label = match[1].replace(/<[^>]+>/g, "").trim();
        if (label) push(label);
      }
      continue;
    }
    if ("heading" in block && block.heading?.trim()) {
      if (
        type === "section" ||
        type === "checklist" ||
        type === "warning" ||
        type === "infoCards" ||
        type === "factTiles" ||
        type === "table" ||
        type === "faq" ||
        type === "links" ||
        type === "linkCards" ||
        type === "symbolGallery"
      ) {
        push(block.heading.trim());
      }
    }
  }

  return toc;
}

function mapSanityArticle(doc: SanityArticleDoc): Article | null {
  const slug = doc.slug?.current?.trim();
  if (!slug || !doc.title) return null;

  const layout = LAYOUTS.has(doc.layout as ArticleLayout)
    ? (doc.layout as ArticleLayout)
    : "standard";
  const body = mapBody(doc.body);

  return {
    title: doc.title,
    slug,
    href: `/kjekt-a-vite/${slug}`,
    category: doc.category?.trim() || "Annet",
    layout,
    intro: doc.intro?.trim() || "",
    image: mapImage(doc.image, doc.title),
    seoTitle: doc.seoTitle?.trim() || `${doc.title} | SG Logistics AS`,
    seoDescription: doc.seoDescription?.trim() || doc.intro?.trim() || doc.title,
    body,
    ...(layout === "guide" ? {toc: buildToc(body)} : {}),
  };
}

const articleProjection = `{
  _id,
  title,
  slug,
  category,
  layout,
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

export {paragraphsFromPlainText, addHeadingIds, buildToc};
