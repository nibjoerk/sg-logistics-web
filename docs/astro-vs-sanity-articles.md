# Astro vs Sanity for Kjekt å vite

## Beholder i Astro (egne sider under `src/pages/kjekt-a-vite/`)

Se `ASTRO_ONLY_SLUGS` i `src/data/astroOnlyArticles.ts`:

- Containerguide
- Havnekart
- Kapelltralle / volumvekt-kalkulator
- Håndteringssymboler
- Farlig gods på vei og jernbane
- Hvor tung kan en container være på vei?

Disse seeds ikke som Sanity-speil.

**Skade på gods** og **Incoterms** bruker den generiske `[slug]`-ruten med Astro tool-blokker (kalkulator / veiviser).

## Sanity-canonical (migrert)

Se `SANITY_CANONICAL_SLUGS`:

- Incoterms forklart
- Farlig gods (oversikt / fly / sjø)

## Speil (`s-*` + `#`-tittel)

Seed-speil er **skjult** fra offentlig listing og `[slug]`-ruter. De finnes fortsatt i Sanity Studio under midlertidig seed, men skal ikke vises dobbelt på nettsiden.

Seed:

```powershell
# Disable Sanity→Vercel webhook temporarily during bulk seed
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts
```
