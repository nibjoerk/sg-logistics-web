/**
 * Seed Sanity with mirror copies of local Astro "Kjekt å vite" articles.
 *
 * - Title prefixed with "# " (easy to spot during review)
 * - Slug prefixed with "s-" so mirrors appear alongside Astro originals on the site
 * - Astro originals are left unchanged until a Sanity mirror is promoted to canonical
 *
 * Usage:
 *   # Prefer disabling the Sanity→Vercel webhook during bulk seed
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts --dry-run
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts --only=farlig-gods-sjofrakt
 *
 * Local images under public/ are uploaded to Sanity and attached as assets.
 */
import {createClient} from "@sanity/client";
import {randomUUID} from "node:crypto";
import {readFile} from "node:fs/promises";
import path from "node:path";
import {articles} from "../src/data/articles";
import {articleHrefFor, isAstroOnlySlug, isSanityCanonicalSlug} from "../src/data/astroOnlyArticles";
import type {Article, ArticleBlock, ArticleSectionBlock} from "../src/data/articleTypes";
import {containerpakkingStuffingEnrichment} from "./seed-enrichments/containerpakking-stuffing";
import {farligGodsEnrichment, farligGodsMeta} from "./seed-enrichments/farlig-gods";
import {farligGodsFlyEnrichment, farligGodsFlyMeta} from "./seed-enrichments/farlig-gods-flyfrakt";
import {farligGodsSjoEnrichment, farligGodsSjoMeta} from "./seed-enrichments/farlig-gods-sjofrakt";
import {
  handteringssymbolerEnrichment,
  handteringssymbolerMeta,
} from "./seed-enrichments/handteringssymboler";
import {incotermsEnrichment, incotermsMeta} from "./seed-enrichments/incoterms";
import {
  seaworthyPackingEnrichment,
  seaworthyPackingMeta,
} from "./seed-enrichments/seaworthy-packing";
import {varHistorieEnrichment, varHistorieMeta} from "./seed-enrichments/var-historie";

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || "r781ar4i";
const DATASET = process.env.PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || "";
const DRY_RUN = process.argv.includes("--dry-run");
const ONLY_SLUG = process.argv
  .find((arg) => arg.startsWith("--only="))
  ?.slice("--only=".length)
  ?.trim();

/** Hero images from custom Astro pages that are not on the article stub. */
const EXTRA_HERO_IMAGES: Record<string, {src: string; alt: string}> = {
  "containerpakking-stuffing": {
    src: "/images/articles/containerpakking-dokumentasjon.png",
    alt: "Illustrasjon av containerpakking, lastsikring og bildedokumentasjon",
  },
  "farlig-gods": farligGodsMeta.hero,
  "farlig-gods-flyfrakt": farligGodsFlyMeta.hero,
  "farlig-gods-sjofrakt": farligGodsSjoMeta.hero,
  incoterms: incotermsMeta.hero,
};

const CANONICAL_META: Record<
  string,
  {title: string; intro: string; seoTitle: string; seoDescription: string; category: string}
> = {
  "farlig-gods": farligGodsMeta,
  "farlig-gods-flyfrakt": farligGodsFlyMeta,
  "farlig-gods-sjofrakt": farligGodsSjoMeta,
  handteringssymboler: handteringssymbolerMeta,
  "seaworthy-packing": seaworthyPackingMeta,
  incoterms: incotermsMeta,
  "var-historie": varHistorieMeta,
};

const assetCache = new Map<string, string>();

const CATEGORY_MAP: Record<string, string> = {
  "Import og eksport": "Import og eksport",
  Dokumenter: "Dokumenter",
  Sjøfrakt: "Sjøfrakt",
  Flyfrakt: "Flyfrakt",
  Bilfrakt: "Bilfrakt",
  Veitransport: "Veitransport",
  Toll: "Toll",
  Pakking: "Pakking",
  Regelverk: "Regelverk",
  "Skade og avvik": "Skade og avvik",
  "Om oss": "Om oss",
  Annet: "Annet",
};

function key() {
  return randomUUID().replace(/-/g, "").slice(0, 12);
}

function textBlock(text: string, style: "normal" | "h2" | "h3" = "normal") {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: key(),
        text,
        marks: [],
      },
    ],
  };
}

function paragraphsToBlocks(text: string) {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => textBlock(part.replace(/\n/g, " "), "normal"));
}

function isSection(block: ArticleBlock): block is ArticleSectionBlock {
  return !block._type || block._type === "section";
}

function sectionToBody(section: ArticleSectionBlock) {
  // Keep heading + text + bullets + links as ONE section block so the site
  // renders them in a single card (same as the original Astro articles).
  if (!section.heading && !section.text && !section.items?.length && !section.links?.length && !section.image) {
    return [];
  }

  return [
    {
      _type: "section",
      _key: key(),
      ...(section.heading ? {heading: section.heading} : {}),
      ...(section.text ? {text: section.text} : {}),
      ...(section.items?.length ? {items: section.items} : {}),
      ...(section.links?.length
        ? {
            links: section.links.map((link) => ({
              _type: "link",
              _key: key(),
              label: link.label,
              href: link.href,
            })),
          }
        : {}),
      ...(section.image
        ? {
            image: {
              _type: "image",
              alt: section.image.alt,
              localSrc: section.image.src,
              ...(section.image.caption ? {caption: section.image.caption} : {}),
            },
          }
        : {}),
    },
  ];
}

function toolForSlug(slug: string): Record<string, unknown> | null {
  if (slug === "incoterms") {
    return {_type: "tool", _key: key(), tool: "incoterms"};
  }
  if (slug === "skade-pa-gods") {
    return {_type: "tool", _key: key(), tool: "liability"};
  }
  if (slug === "kapelltralle-dimensjoner-volumvekt-kalkulator") {
    return {_type: "tool", _key: key(), tool: "volumeWeight"};
  }
  return null;
}

function layoutForSlug(slug: string): "standard" | "guide" {
  const guideSlugs = new Set([
    "farlig-gods",
    "farlig-gods-pa-vei",
    "farlig-gods-flyfrakt",
    "farlig-gods-sjofrakt",
    "handteringssymboler",
    "kapelltralle-dimensjoner-volumvekt-kalkulator",
    "seaworthy-packing",
    "containerpakking-stuffing",
    "hvor-tung-kan-en-container-vaere-pa-vei",
    "pakking-av-gods",
    "hs-koder",
    "transittering",
    "ata-carnet",
    "cmr",
    "skade-pa-gods",
    "incoterms",
    "var-historie",
  ]);
  return guideSlugs.has(slug) ? "guide" : "standard";
}

function noteForCustomPage(article: Article): Record<string, unknown> | null {
  const custom = new Set([
    "farlig-gods",
    "farlig-gods-pa-vei",
    "farlig-gods-flyfrakt",
    "farlig-gods-sjofrakt",
    "handteringssymboler",
    "containerguide",
    "kapelltralle-dimensjoner-volumvekt-kalkulator",
    "seaworthy-packing",
    "containerhavner",
    "hvor-tung-kan-en-container-vaere-pa-vei",
    "containerpakking-stuffing",
  ]);
  if (!custom.has(article.slug)) return null;
  return {
    _type: "callout",
    _key: key(),
    tone: "info",
    label: "Speilversjon",
    text: [
      textBlock(
        `Dette er en Sanity-speilversjon av den originale Astro-siden (${article.href}). Originalen er beholdt. Innholdet er migrert så langt det finnes i artikkeldata; interaktive deler kan kreve verktøy-blokker eller videre redigering.`,
      ),
    ],
  };
}

function enrichmentForSlug(slug: string): Record<string, unknown>[] {
  if (slug === "containerpakking-stuffing") return containerpakkingStuffingEnrichment();
  if (slug === "incoterms") return incotermsEnrichment();
  if (slug === "farlig-gods") return farligGodsEnrichment();
  if (slug === "farlig-gods-flyfrakt") return farligGodsFlyEnrichment();
  if (slug === "farlig-gods-sjofrakt") return farligGodsSjoEnrichment();
  if (slug === "handteringssymboler") return handteringssymbolerEnrichment();
  if (slug === "seaworthy-packing") return seaworthyPackingEnrichment();
  if (slug === "var-historie") return varHistorieEnrichment();
  return [];
}

function toSanityDoc(article: Article) {
  const canonical = isSanityCanonicalSlug(article.slug);
  const meta = CANONICAL_META[article.slug];
  const mirrorSlug = canonical ? article.slug : `s-${article.slug}`;
  // Always prefix titles with "# " during migration so Sanity docs are easy to spot
  // in Studio and on the site. Remove the prefix when promoting a finished article.
  const baseTitle = meta?.title || article.title;
  const title = baseTitle.startsWith("# ") ? baseTitle : `# ${baseTitle}`;
  const body: Record<string, unknown>[] = [];

  const enrichment = enrichmentForSlug(article.slug);
  const hasEnrichment = enrichment.length > 0;
  if (hasEnrichment) {
    body.push(...enrichment);
  } else {
    const note = noteForCustomPage(article);
    if (note) body.push(note);
    for (const block of article.body) {
      if (isSection(block)) body.push(...sectionToBody(block));
    }
  }

  const hasToolAlready = body.some((block) => block._type === "tool");
  const tool = toolForSlug(article.slug);
  if (tool && !hasToolAlready) {
    if (article.slug === "incoterms") {
      const insertAt = Math.min(3, body.length);
      body.splice(insertAt, 0, tool);
    } else {
      body.push(tool);
    }
  }

  // Keep a link back to the Astro original only for thin stub mirrors.
  // Full enrichments should stand alone for side-by-side comparison.
  if (!canonical && !hasEnrichment) {
    body.push({
      _type: "links",
      _key: key(),
      heading: "Original Astro-side",
      items: [
        {
          _type: "link",
          _key: key(),
          label: `Åpne original: ${article.title}`,
          href: article.href,
        },
      ],
    });
  }

  const category = meta?.category || CATEGORY_MAP[article.category] || "Annet";
  const hero = article.image || EXTRA_HERO_IMAGES[article.slug];

  return {
    _id: `article.mirror.${article.slug}`,
    _type: "article",
    title,
    slug: {_type: "slug", current: mirrorSlug},
    category,
    layout: layoutForSlug(article.slug),
    intro: meta?.intro || article.intro,
    ...(hero
      ? {
          image: {
            _type: "image",
            alt: hero.alt,
            localSrc: hero.src,
          },
        }
      : {}),
    seoTitle: meta?.seoTitle || (canonical ? article.seoTitle : `# ${article.seoTitle}`),
    seoDescription: meta?.seoDescription || article.seoDescription,
    publishedAt: new Date().toISOString(),
    body,
  };
}

type SanityClient = ReturnType<typeof createClient>;

async function uploadLocalImage(client: SanityClient, localSrc: string): Promise<string> {
  const normalized = localSrc.startsWith("/") ? localSrc : `/${localSrc}`;
  const cached = assetCache.get(normalized);
  if (cached) return cached;

  const absolute = path.join(process.cwd(), "public", normalized.replace(/^\//, ""));
  const buffer = await readFile(absolute);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(absolute),
  });
  assetCache.set(normalized, asset._id);
  console.log(`  uploaded ${normalized} → ${asset._id}`);
  return asset._id;
}

async function materializeImageField(
  client: SanityClient,
  image: Record<string, unknown> | undefined,
): Promise<Record<string, unknown> | undefined> {
  if (!image) return undefined;
  const localSrc = typeof image.localSrc === "string" ? image.localSrc : undefined;
  if (!localSrc) return image;

  const ref = await uploadLocalImage(client, localSrc);
  const next: Record<string, unknown> = {
    _type: "image",
    asset: {_type: "reference", _ref: ref},
  };
  if (typeof image.alt === "string") next.alt = image.alt;
  if (typeof image.caption === "string") next.caption = image.caption;
  return next;
}

async function materializeDocImages(client: SanityClient, doc: Record<string, unknown>) {
  if (doc.image && typeof doc.image === "object") {
    doc.image = await materializeImageField(client, doc.image as Record<string, unknown>);
  }

  const body = Array.isArray(doc.body) ? doc.body : [];
  for (const block of body) {
    if (!block || typeof block !== "object") continue;
    const item = block as Record<string, unknown>;
    if (item._type === "image" || item.localSrc) {
      const materialized = await materializeImageField(client, item);
      if (materialized) {
        Object.keys(item).forEach((k) => delete item[k]);
        Object.assign(item, materialized);
        if (!item._key) item._key = key();
        item._type = item._type || "image";
      }
    }
    if (item.image && typeof item.image === "object") {
      item.image = await materializeImageField(client, item.image as Record<string, unknown>);
    }
    if (Array.isArray(item.items)) {
      for (const nested of item.items) {
        if (!nested || typeof nested !== "object") continue;
        const nestedItem = nested as Record<string, unknown>;
        if (nestedItem.image && typeof nestedItem.image === "object") {
          nestedItem.image = await materializeImageField(
            client,
            nestedItem.image as Record<string, unknown>,
          );
        }
      }
    }
  }
}

async function main() {
  // Astro-only interactive pages are skipped, except those with full Sanity enrichments
  // that should still appear as reviewable s-* mirrors during migration.
  const seedableAstroOnly = new Set(["handteringssymboler"]);
  let sourceArticles = articles.filter(
    (article) => !isAstroOnlySlug(article.slug) || seedableAstroOnly.has(article.slug),
  );
  if (ONLY_SLUG) {
    sourceArticles = sourceArticles.filter((article) => article.slug === ONLY_SLUG);
    if (!sourceArticles.length) {
      console.error(`No seedable article matched --only=${ONLY_SLUG}`);
      process.exit(1);
    }
  }
  const skipped = articles.length - sourceArticles.length;
  const docs = sourceArticles.map(toSanityDoc);
  console.log(
    `Prepared ${docs.length} mirror articles${ONLY_SLUG ? ` (--only=${ONLY_SLUG})` : ` (skipped ${skipped} Astro-only pages)`}`,
  );
  for (const doc of docs) {
    const slug = (doc.slug as {current?: string}).current;
    const hasImage = Boolean(doc.image);
    const body = Array.isArray(doc.body) ? doc.body : [];
    const types = body.map((block) => (block as {_type?: string})._type || "unknown");
    const gallery = body.find((block) => (block as {_type?: string})._type === "symbolGallery") as
      | {items?: unknown[]}
      | undefined;
    const enrichmentNote = types.includes("symbolGallery")
      ? ` [enrichment: ${types.length} blocks, ${gallery?.items?.length ?? 0} symbols]`
      : types.includes("callout") && types[0] === "callout"
        ? ` [body: ${types.join(", ")}]`
        : ` [body: ${types.join(", ")}]`;
    console.log(
      ` - ${doc.title} → ${articleHrefFor(slug || "", String(doc.category || ""))}${hasImage ? " [hero]" : ""}${enrichmentNote}`,
    );
  }

  if (DRY_RUN) {
    console.log("\nDry run only. No writes.");
    return;
  }

  if (!TOKEN) {
    console.error(`
Missing Sanity write token.

Create one in Sanity:
  manage.sanity.io → project r781ar4i → API → Tokens → Add API token (Editor)

Then run:
  SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts
`);
    process.exit(1);
  }

  const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: "2025-01-01",
    token: TOKEN,
    useCdn: false,
  });

  let ok = 0;
  for (const doc of docs) {
    const slug = (doc.slug as {current?: string}).current;
    if (slug) {
      // Remove any other docs that share this slug (manual Studio copies, old seeds).
      const duplicates = await client.fetch<Array<{_id: string}>>(
        `*[_type == "article" && slug.current == $slug && _id != $id]{_id}`,
        {slug, id: doc._id},
      );
      for (const dup of duplicates) {
        await client.delete(dup._id);
        console.log(`Deleted duplicate ${dup._id} (slug ${slug})`);
      }
    }

    await materializeDocImages(client, doc);
    await client.createOrReplace(doc);
    ok += 1;
    console.log(`Published ${ok}/${docs.length}: ${doc.title}`);
  }

  // Migration mode: mirrors use s-*. Remove bare-slug docs left from when these
  // were temporarily Sanity-canonical (createOrReplace above writes s-* on the
  // stable article.mirror.* ids).
  for (const slug of [
    "incoterms",
    "farlig-gods",
    "farlig-gods-flyfrakt",
    "farlig-gods-sjofrakt",
  ]) {
    if (isSanityCanonicalSlug(slug)) continue;
    const leftover = await client.fetch<Array<{_id: string}>>(
      `*[_type == "article" && slug.current == $slug]{_id}`,
      {slug},
    );
    for (const doc of leftover) {
      await client.delete(doc._id);
      console.log(`Deleted leftover bare-slug doc ${doc._id} (slug ${slug})`);
    }
  }

  console.log(`\nDone. ${ok} articles published to ${PROJECT_ID}:${DATASET}`);
  console.log(`Uploaded ${assetCache.size} unique image asset(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
