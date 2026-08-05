export type ArticleImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ArticleLink = {
  href: string;
  label: string;
};

export type ArticleLinkCard = {
  title?: string;
  href: string;
  label?: string;
  text?: string;
};

export type ArticleToolId = "incoterms" | "liability" | "volumeWeight";

export type ArticleLayout = "standard" | "guide";

export type ArticleTocItem = {
  id: string;
  label: string;
};

/** Local articles may omit `_type`; missing type is treated as section. */
export type ArticleSectionBlock = {
  _type?: "section";
  heading?: string;
  text?: string;
  items?: string[];
  links?: ArticleLink[];
  image?: ArticleImage;
};

export type ArticleRichTextBlock = {
  _type: "richText";
  html: string;
};

export type ArticleImageBlock = {
  _type: "imageBlock";
  image: ArticleImage;
};

export type ArticleCalloutBlock = {
  _type: "callout";
  tone: "info" | "warning" | "tip";
  label?: string;
  html: string;
};

export type ArticleChecklistBlock = {
  _type: "checklist";
  heading?: string;
  items: string[];
};

export type ArticleWarningBlock = {
  _type: "warning";
  heading?: string;
  items: string[];
};

export type ArticleInfoCardsBlock = {
  _type: "infoCards";
  heading?: string;
  columns: 2 | 3;
  cards: Array<{
    title: string;
    text: string;
    label?: string;
  }>;
};

export type ArticleFactTilesBlock = {
  _type: "factTiles";
  heading?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
};

export type ArticleTableBlock = {
  _type: "table";
  heading?: string;
  intro?: string;
  columns: string[];
  rows: string[][];
  footnote?: string;
};

export type ArticleFaqBlock = {
  _type: "faq";
  heading?: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

export type ArticleCtaBlock = {
  _type: "cta";
  heading: string;
  text?: string;
  primary: ArticleLink;
  secondary?: ArticleLink;
};

export type ArticleLinksBlock = {
  _type: "links";
  heading?: string;
  items: ArticleLink[];
};

export type ArticleLinkCardsBlock = {
  _type: "linkCards";
  heading?: string;
  intro?: string;
  cards: ArticleLinkCard[];
};

export type ArticleSymbolGalleryBlock = {
  _type: "symbolGallery";
  heading?: string;
  intro?: string;
  items: Array<{
    image: ArticleImage;
    title: string;
    subtitle?: string;
    meaning?: string;
  }>;
};

export type ArticleToolBlock = {
  _type: "tool";
  tool: ArticleToolId;
};

export type ArticleBlock =
  | ArticleSectionBlock
  | ArticleRichTextBlock
  | ArticleImageBlock
  | ArticleCalloutBlock
  | ArticleChecklistBlock
  | ArticleWarningBlock
  | ArticleInfoCardsBlock
  | ArticleFactTilesBlock
  | ArticleTableBlock
  | ArticleFaqBlock
  | ArticleCtaBlock
  | ArticleLinksBlock
  | ArticleLinkCardsBlock
  | ArticleSymbolGalleryBlock
  | ArticleToolBlock;

/** @deprecated kept for local article section shape compatibility */
export type ArticleRelatedPage = ArticleLinkCard & {title: string};

export type Article = {
  title: string;
  slug: string;
  href: string;
  category: string;
  layout?: ArticleLayout;
  intro: string;
  image?: {
    src: string;
    alt: string;
  };
  calloutImage?: ArticleImage;
  calloutImages?: ArticleImage[];
  seoTitle: string;
  seoDescription: string;
  body: ArticleBlock[];
  toc?: ArticleTocItem[];
};

export function getArticleBlockType(block: ArticleBlock): NonNullable<ArticleBlock["_type"]> | "section" {
  return block._type ?? "section";
}

export function slugifyHeading(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 64);
}
