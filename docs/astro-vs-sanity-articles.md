# Astro vs Sanity for Kjekt å vite

## Beholder i Astro (interaktive / spesialbygde sider)

Se `src/data/astroOnlyArticles.ts`:

- Containerguide
- Incoterms forklart (veiviser)
- Havnekart
- Kapelltralle / volumvekt-kalkulator
- Håndteringssymboler
- Farlig gods-sidene
- Hvor tung kan en container være på vei?
- Skade på gods (ansvarsgrense-kalkulator)

Disse seeds ikke som Sanity-speil, og `s-*`-speil skjules i listing.

## Sanity-first (innholdsnære guider)

Øvrige artikler (f.eks. containerpakking/stuffing, seaworthy packing, pakking, fortolling, HS-koder, CMR, …) redigeres i Sanity med **guide**-layout (TOC + panel) så nært Astro-uttrykket som praktisk.

Seed:

```powershell
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts
```
