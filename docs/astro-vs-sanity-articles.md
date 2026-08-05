# Astro vs Sanity for Kjekt å vite

## Beholder i Astro (interaktive / spesialbygde sider)

Se `src/data/astroOnlyArticles.ts`:

- Containerguide
- Incoterms forklart (veiviser)
- Havnekart
- Kapelltralle / volumvekt-kalkulator
- Håndteringssymboler
- Farlig gods på vei og jernbane
- Hvor tung kan en container være på vei?
- Skade på gods (ansvarsgrense-kalkulator)

## Sanity-canonical (erstatter Astro-sidene)

- Farlig gods (oversikt) → `/kjekt-a-vite/farlig-gods`
- Farlig gods med fly → `/kjekt-a-vite/farlig-gods-flyfrakt`
- Farlig gods på sjø → `/kjekt-a-vite/farlig-gods-sjofrakt`

## Sanity-first speil (parallelt med Astro, `#` / `s-`)

Øvrige innholdssider, f.eks. containerpakking/stuffing, seaworthy packing, pakking, fortolling, HS-koder, CMR.

Seed:

```powershell
# Disable Sanity→Vercel webhook temporarily during bulk seed
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts
```
