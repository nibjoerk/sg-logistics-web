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
  title: string;
  href: string;
  label?: string;
  text?: string;
};

export type ArticleToolId = "incoterms" | "liability";

/** Local articles may omit `_type`; missing type is treated as section. */
export type ArticleSectionBlock = {
  _type?: "section";
  heading: string;
  text: string;
  items?: string[];
  links?: ArticleLink[];
  image?: ArticleImage;
};

export type ArticleImageBlock = {
  _type: "imageBlock";
  image: ArticleImage;
};

export type ArticleLinkCardsBlock = {
  _type: "linkCards";
  heading?: string;
  intro?: string;
  cards: ArticleLinkCard[];
};

export type ArticleToolBlock = {
  _type: "tool";
  tool: ArticleToolId;
};

export type ArticleBlock =
  | ArticleSectionBlock
  | ArticleImageBlock
  | ArticleLinkCardsBlock
  | ArticleToolBlock;

/** @deprecated kept for local article section shape compatibility */
export type ArticleRelatedPage = ArticleLinkCard;

export type Article = {
  title: string;
  slug: string;
  href: string;
  category: string;
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
};

export function getArticleBlockType(block: ArticleBlock): ArticleBlock["_type"] | "section" {
  return block._type ?? "section";
}
