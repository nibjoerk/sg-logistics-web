# Astro vs Sanity for Kjekt å vite

## Beholder i Astro (interaktive / spesialbygde sider)

Se `src/data/astroOnlyArticles.ts`:

- Containerguide
- Havnekart
- Kapelltralle / volumvekt-kalkulator
- Håndteringssymboler
- Farlig gods på vei og jernbane
- Hvor tung kan en container være på vei?
- Skade på gods (ansvarsgrense-kalkulator)

Disse seeds ikke som Sanity-speil, og `s-*`-speil skjules i listing.

## Sanity-canonical (migrert fra Astro)

Se `SANITY_CANONICAL_SLUGS` i `src/data/astroOnlyArticles.ts`:

- **Incoterms forklart** (`/kjekt-a-vite/incoterms`) — innhold i Sanity; veiviser/termvelger rendres fortsatt som Astro tool-blokk
- Farlig gods (oversikt) → `/kjekt-a-vite/farlig-gods`
- Farlig gods med fly → `/kjekt-a-vite/farlig-gods-flyfrakt`
- Farlig gods på sjø → `/kjekt-a-vite/farlig-gods-sjofrakt`

Seed bruker kanonisk slug (uten `s-`-prefiks) og `#`-tittel droppes.

## Sanity-first (innholdsnære guider / speil)

Øvrige artikler (f.eks. containerpakking/stuffing, seaworthy packing, pakking, fortolling, HS-koder, CMR, …) redigeres i Sanity med **guide**-layout (TOC + panel) så nært Astro-uttrykket som praktisk. Speil bruker fortsatt `s-*` + `#` til de eventuelt migreres kanonisk.

Seed:

```powershell
# Disable Sanity→Vercel webhook temporarily during bulk seed
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts
```

Preferer å skru av Sanity→Vercel-webhook under bulk-seed.
