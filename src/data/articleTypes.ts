export type ArticleBlock = {
  heading: string;
  text: string;
};

export type Article = {
  title: string;
  slug: string;
  href: string;
  category: string;
  intro: string;
  seoTitle: string;
  seoDescription: string;
  body: ArticleBlock[];
};
