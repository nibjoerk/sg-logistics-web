export type ArticleBlock = {
  heading: string;
  text: string;
  items?: string[];
  links?: {
    href: string;
    label: string;
  }[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
};

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
  calloutImage?: {
    src: string;
    alt: string;
    caption?: string;
  };
  calloutImages?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  seoTitle: string;
  seoDescription: string;
  body: ArticleBlock[];
};
