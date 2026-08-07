# Astro vs Sanity for Kjekt å vite

## Målbilde

1. **Nå (sammenligning):** Alle Astro-sider og alle Sanity-artikler (inkl. `#`-titler og `s-*`-slugs) er synlige på nettsiden, slik at innholdet kan sammenlignes.
2. **Når Sanity er like god:** Fjern Astro-versjonen, fjern `#` fra tittelen og `s-` fra slug i Sanity, og legg slug inn i `SANITY_CANONICAL_SLUGS`.

## Beholder i Astro (egne sider under `src/pages/kjekt-a-vite/`)

Se `ASTRO_ONLY_SLUGS` i `src/data/astroOnlyArticles.ts`:

- Containerguide
- Havnekart (containerhavner)
- Havner i Bangkok
- Kapelltralle / volumvekt-kalkulator
- Håndteringssymboler
- Farlig gods på vei og jernbane
- Hvor tung kan en container være på vei?

Disse seeds ikke som Sanity-speil (interaktiv UI).

## Sanity-canonical (migrert)

Se `SANITY_CANONICAL_SLUGS`:

- Incoterms forklart
- Farlig gods (oversikt / fly / sjø)

Disse har vanlig tittel og slug uten `s-`. Sanity er kilde på nettsiden.

## Speil (`s-*` + `#`-tittel)

Seed lager midlertidige Sanity-kopier av lokale artikler:

- Tittel: `# CMR-fraktbrev`
- Slug: `s-cmr` → URL `/kjekt-a-vite/s-cmr`

Speilene **vises på nettsiden** sammen med Astro-originalene under migrering.

### Når du er fornøyd med en Sanity-versjon

1. I Sanity Studio: fjern `# ` fra tittelen, endre slug fra `s-cmr` til `cmr`.
2. I koden: legg slug inn i `SANITY_CANONICAL_SLUGS`.
3. Fjern lokal stub i `src/data/articles.ts` (og eventuell dedikert Astro-side).
4. Kjør seed på nytt eller oppdater dokumentet manuelt; slett eventuelt gammelt `s-*`-dokument.

Seed:

```powershell
# Disable Sanity→Vercel webhook temporarily during bulk seed
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts
```
