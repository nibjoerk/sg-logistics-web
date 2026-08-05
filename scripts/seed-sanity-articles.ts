/**
 * Seed Sanity with mirror copies of local Astro "Kjekt å vite" articles.
 *
 * - Title prefixed with "# "
 * - Slug prefixed with "s-" so they appear alongside originals
 * - Astro originals are left unchanged
 *
 * Usage:
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts
 *   SANITY_API_WRITE_TOKEN=sk... npx tsx scripts/seed-sanity-articles.ts --dry-run
 */
import {createClient} from "@sanity/client";
import {randomUUID} from "node:crypto";
import {articles} from "../src/data/articles";
import type {Article, ArticleBlock, ArticleSectionBlock} from "../src/data/articleTypes";

const PROJECT_ID = process.env.PUBLIC_SANITY_PROJECT_ID || "r781ar4i";
const DATASET = process.env.PUBLIC_SANITY_DATASET || "production";
const TOKEN = process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_WRITE_TOKEN || "";
const DRY_RUN = process.argv.includes("--dry-run");

const CATEGORY_MAP: Record<string, string> = {
  "Import og eksport": "Import og eksport",
  Dokumenter: "Dokumenter",
  Sjøfrakt: "Sjøfrakt",
  Flyfrakt: "Flyfrakt",
  Bilfrakt: "Bilfrakt",
  Veitransport: "Bilfrakt",
  Toll: "Toll",
  Pakking: "Pakking",
  Regelverk: "Annet",
  "Skade og avvik": "Annet",
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
  const blocks: Record<string, unknown>[] = [];
  if (section.heading) blocks.push(textBlock(section.heading, "h2"));
  if (section.text) blocks.push(...paragraphsToBlocks(section.text));
  if (section.items?.length) {
    blocks.push({
      _type: "checklist",
      _key: key(),
      heading: section.heading ? `Punkter: ${section.heading}` : undefined,
      items: section.items,
    });
  }
  if (section.links?.length) {
    blocks.push({
      _type: "links",
      _key: key(),
      heading: "Relaterte lenker",
      items: section.links.map((link) => ({
        _type: "link",
        _key: key(),
        label: link.label,
        href: link.href,
      })),
    });
  }
  return blocks;
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
  if (slug === "farlig-gods") {
    return [
      {
        _type: "callout",
        _key: key(),
        tone: "info",
        label: "Kort fortalt",
        text: [
          textBlock(
            "Det finnes ikke ett regelverk som dekker alt på samme måte. Vei/jernbane, fly og sjø har egne regler. Samme vare kan derfor kreve ulik dokumentasjon, emballasje eller merking avhengig av hvordan den skal transporteres.",
          ),
        ],
      },
      textBlock("Start med produktet, ikke transporten", "h2"),
      ...paragraphsToBlocks(
        "Mange feil oppstår fordi farlig gods først oppdages når transporten allerede er booket. Start heller med produktet: Hva er varen? Har den et UN-nummer? Hvilken fareklasse har den? Er den miljøfarlig? Inneholder den batterier, gass, væske, kjemikalier eller trykkbeholdere?\n\nSikkerhetsdatabladet er ofte første sted å se, men det må være oppdatert og relevant for transport. Produktinformasjon fra produsent eller leverandør er viktig, særlig når varen er en blanding, en prøve, avfall eller utstyr med innebygde batterier.",
      ),
      textBlock("Velg riktig regelverk etter transportform", "h2"),
      ...paragraphsToBlocks(
        "Når farlig gods skal sendes internasjonalt, går det ofte gjennom flere transportledd. En sending kan for eksempel hentes med bil, sendes med sjø eller fly, og leveres videre med bil. Da må alle relevante regelverk vurderes.",
      ),
      {
        _type: "linkCards",
        _key: key(),
        heading: "Transportformer",
        cards: [
          {
            _type: "card",
            _key: key(),
            title: "Vei og jernbane",
            label: "ADR/RID",
            href: "/kjekt-a-vite/farlig-gods-pa-vei",
            text: "For gods som skal hentes eller leveres med bil, eller gå videre med jernbane. Her er transportdokument, merking, emballasje og mengderegler sentralt.",
          },
          {
            _type: "card",
            _key: key(),
            title: "Flyfrakt",
            label: "ICAO-TI / IATA",
            href: "/kjekt-a-vite/farlig-gods-flyfrakt",
            text: "For hasteforsendelser og flyfrakt. Fly har strengere krav, særlig for batterier, godkjent emballasje og Shipper's Declaration.",
          },
          {
            _type: "card",
            _key: key(),
            title: "Sjøfrakt",
            label: "IMDG",
            href: "/kjekt-a-vite/farlig-gods-sjofrakt",
            text: "For farlig gods i container, på pall, i fat, IBC eller annen emballasje som sendes med skip. Containerpakking, marine pollutants og pakkeerklæring er viktig.",
          },
        ],
      },
      textBlock("Felles sjekkliste for vareeier", "h2"),
      {
        _type: "checklist",
        _key: key(),
        items: [
          "Sjekk sikkerhetsdatabladet, særlig transportinformasjonen.",
          "Finn korrekt UN-nummer, varenavn, fareklasse og eventuell emballasjegruppe.",
          "Avklar om varen er miljøfarlig, temperaturfølsom, avfall, batteri eller tom ikke-rengjort emballasje.",
          "Bruk emballasje som er tillatt for varen, mengden og transportmåten.",
          "Merk kolli, pall, container eller annen lastbærer slik regelverket krever.",
          "Gi speditør eller transportør informasjonen før booking, ikke først ved henting.",
        ],
      },
      textBlock("Vanlige feil som gir forsinkelser", "h2"),
      {
        _type: "warning",
        _key: key(),
        heading: "Vanlige feil",
        items: [
          "Varen bookes som vanlig gods selv om den er farlig gods.",
          "Sikkerhetsdatabladet er gammelt eller mangler transportinformasjon.",
          "UN-nummer, klasse eller emballasjegruppe er feil.",
          "Batterier, aerosoler, kjemikalier eller væsker blir oversett fordi de er innebygd i produktet.",
          "Kolli er skadet, lekk eller mangler fareseddel.",
          "Man antar at regler for vei også gjelder uendret for sjø eller fly.",
        ],
      },
      textBlock("Hvordan SG Logistics kan hjelpe", "h2"),
      ...paragraphsToBlocks(
        "Vi kan hjelpe med å avklare hvilken transportform som passer, hvilken informasjon transportør eller rederi trenger, og hvordan sendingen bør forberedes. Selve klassifiseringen må likevel bygge på korrekt produktinformasjon fra vareeier.",
      ),
      {
        _type: "linkCards",
        _key: key(),
        heading: "Relaterte artikler",
        cards: [
          {_type: "card", _key: key(), title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods"},
          {_type: "card", _key: key(), title: "CMR-fraktbrev", href: "/kjekt-a-vite/cmr"},
          {
            _type: "card",
            _key: key(),
            title: "Containerpakking: stuffing og sikring",
            href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
          },
        ],
      },
    ];
  }
  return [];
}

function toSanityDoc(article: Article) {
  const mirrorSlug = `s-${article.slug}`;
  const body: Record<string, unknown>[] = [];

  const note = noteForCustomPage(article);
  if (note) body.push(note);

  const enrichment = enrichmentForSlug(article.slug);
  if (enrichment.length) {
    body.push(...enrichment);
  } else {
    for (const block of article.body) {
      if (isSection(block)) body.push(...sectionToBody(block));
    }
  }

  const tool = toolForSlug(article.slug);
  if (tool) {
    if (article.slug === "incoterms") {
      const insertAt = Math.min(3, body.length);
      body.splice(insertAt, 0, tool);
    } else {
      body.push(tool);
    }
  }

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

  const category = CATEGORY_MAP[article.category] || "Annet";

  return {
    _id: `article.mirror.${article.slug}`,
    _type: "article",
    title: `# ${article.title}`,
    slug: {_type: "slug", current: mirrorSlug},
    category,
    layout: layoutForSlug(article.slug),
    intro: article.intro,
    seoTitle: `# ${article.seoTitle}`,
    seoDescription: article.seoDescription,
    publishedAt: new Date().toISOString(),
    body,
  };
}

async function main() {
  const docs = articles.map(toSanityDoc);
  console.log(`Prepared ${docs.length} mirror articles`);
  for (const doc of docs) {
    console.log(` - ${doc.title} → /kjekt-a-vite/${doc.slug.current}`);
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

  // Create or replace each document, then publish by writing to the published id
  // Using createOrReplace on the published id publishes immediately.
  let ok = 0;
  for (const doc of docs) {
    await client.createOrReplace(doc);
    ok += 1;
    console.log(`Published ${ok}/${docs.length}: ${doc.title}`);
  }
  console.log(`\nDone. ${ok} articles published to ${PROJECT_ID}:${DATASET}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
