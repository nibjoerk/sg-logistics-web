/**
 * Convert local Astro article body blocks into Sanity seed body blocks.
 * Keeps Sanity mirrors in lockstep with src/data/articles/*.ts.
 */
import type {ArticleBlock, ArticleCalloutBlock, ArticleSectionBlock} from "../../src/data/articleTypes";
import {
  callout,
  checklist,
  factTiles,
  infoCards,
  key,
  linkCards,
  paragraphsToBlocks,
  textBlock,
  warning,
  type Block,
} from "./_blocks";

function stripHtml(html: string): string {
  return html
    .replace(/<\/p>\s*<p>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .trim();
}

function sectionBlocks(block: ArticleSectionBlock): Block[] {
  const out: Block[] = [];
  if (block.heading) out.push(textBlock(block.heading, "h2"));
  if (block.text) out.push(...paragraphsToBlocks(block.text));
  if (block.items?.length) {
    out.push({
      _type: "checklist",
      _key: key(),
      items: block.items,
    });
  }
  if (block.links?.length) {
    out.push(
      linkCards(
        block.links.map((link) => ({
          title: link.label,
          href: link.href,
          label: link.label,
        })),
        "Les mer",
      ),
    );
  }
  if (block.image) {
    out.push({
      _type: "image",
      _key: key(),
      alt: block.image.alt,
      localSrc: block.image.src,
      ...(block.image.caption ? {caption: block.image.caption} : {}),
    });
  }
  return out;
}

function calloutFromArticle(block: ArticleCalloutBlock): Block {
  return callout(block.label || "Merk", stripHtml(block.html), block.tone);
}

export function articleBlocksToSanity(blocks: readonly ArticleBlock[]): Block[] {
  const out: Block[] = [];

  for (const block of blocks) {
    const type = block._type;

    if (!type || type === "section") {
      out.push(...sectionBlocks(block as ArticleSectionBlock));
      continue;
    }

    if (type === "callout") {
      out.push(calloutFromArticle(block));
      continue;
    }

    if (type === "checklist") {
      out.push(checklist(block.items, block.heading));
      continue;
    }

    if (type === "warning") {
      out.push(warning(block.items, block.heading || "Viktig"));
      continue;
    }

    if (type === "infoCards") {
      out.push(infoCards(block.cards, block.heading, block.columns));
      continue;
    }

    if (type === "factTiles") {
      out.push(factTiles(block.items, block.heading));
      continue;
    }

    if (type === "linkCards") {
      out.push(
        linkCards(
          block.cards.map((card) => ({
            title: card.title || card.label || card.href,
            href: card.href,
            ...(card.label ? {label: card.label} : {}),
            ...(card.text ? {text: card.text} : {}),
          })),
          block.heading || "Relaterte artikler",
        ),
      );
      continue;
    }

    if (type === "imageBlock") {
      out.push({
        _type: "image",
        _key: key(),
        alt: block.image.alt,
        localSrc: block.image.src,
        ...(block.image.caption ? {caption: block.image.caption} : {}),
      });
      continue;
    }

    if (type === "richText") {
      out.push(...paragraphsToBlocks(stripHtml(block.html)));
      continue;
    }

    if (type === "table") {
      out.push({
        _type: "table",
        _key: key(),
        ...(block.heading ? {heading: block.heading} : {}),
        ...(block.intro ? {intro: block.intro} : {}),
        columns: block.columns,
        rows: block.rows.map((cells) => ({
          _type: "row",
          _key: key(),
          cells,
        })),
        ...(block.footnote ? {footnote: block.footnote} : {}),
      });
      continue;
    }

    if (type === "faq") {
      out.push({
        _type: "faq",
        _key: key(),
        ...(block.heading ? {heading: block.heading} : {}),
        items: block.items.map((item) => ({
          _type: "faqItem",
          _key: key(),
          question: item.question,
          answer: item.answer,
        })),
      });
      continue;
    }

    if (type === "cta") {
      out.push({
        _type: "cta",
        _key: key(),
        ...(block.eyebrow ? {eyebrow: block.eyebrow} : {}),
        heading: block.heading,
        text: block.text,
        primaryLabel: block.primary.label,
        primaryHref: block.primary.href,
        ...(block.secondary
          ? {secondaryLabel: block.secondary.label, secondaryHref: block.secondary.href}
          : {}),
      });
      continue;
    }

    if (type === "tool") {
      out.push({_type: "tool", _key: key(), tool: block.tool});
      continue;
    }

    if (type === "symbolGallery") {
      out.push({
        _type: "symbolGallery",
        _key: key(),
        ...(block.heading ? {heading: block.heading} : {}),
        ...(block.intro ? {intro: block.intro} : {}),
        items: block.items.map((item) => ({
          _type: "symbol",
          _key: key(),
          title: item.title,
          ...(item.subtitle ? {subtitle: item.subtitle} : {}),
          ...(item.meaning ? {meaning: item.meaning} : {}),
          ...(item.use ? {use: item.use} : {}),
          image: {
            _type: "image",
            alt: item.image.alt,
            localSrc: item.image.src,
          },
        })),
      });
      continue;
    }
  }

  return out;
}
