# Astro vs Sanity for Kjekt å vite

## Målbilde

1. **Nå (sammenligning):** Astro/local beholder vanlige URL-er. Alle Sanity-kopier vises som `#`-titler med `s-*`-slug, slik at begge kan sammenlignes.
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

Disse seeds normalt ikke som Sanity-speil (interaktiv UI), unntatt **håndteringssymboler**.

## Sanity-canonical

`SANITY_CANONICAL_SLUGS` er **tom under migrering**. Da overskriver ikke Sanity Astro på samme slug.

Eksempel under migrering:

| Versjon | URL |
|---|---|
| Astro/local | `/kjekt-a-vite/farlig-gods-sjofrakt` |
| Sanity-speil | `/kjekt-a-vite/s-farlig-gods-sjofrakt` (`# …`) |

Samme mønster for Incoterms, Farlig gods og Farlig gods fly.

## Speil (`s-*` + `#`-tittel)

Seed lager Sanity-kopier med:

- Tittel: `# …`
- Slug: `s-…`

Nettsiden mapper også eksisterende bare-slug Sanity-dokumenter (tidligere canonical) om til `s-*` + `#` i listing, slik at Astro kommer tilbake på den vanlige URL-en uten å vente på re-seed.

Viktig: ikke legg inn en catch-all Vercel-redirect som stripper `s-` fra `/kjekt-a-vite/s-*`.

### Når du er fornøyd med en Sanity-versjon

1. I Sanity Studio: fjern `# ` fra tittelen, endre slug fra `s-…` til bare slug.
2. I koden: legg slug inn i `SANITY_CANONICAL_SLUGS`.
3. Fjern lokal stub / dedikert Astro-side.
4. Kjør seed / slett gammelt `s-*`-dokument.

Seed:

```powershell
$env:SANITY_API_WRITE_TOKEN="sk..."
npx tsx scripts/seed-sanity-articles.ts

# Eller én artikkel:
npx tsx scripts/seed-sanity-articles.ts --only=farlig-gods-sjofrakt
```
