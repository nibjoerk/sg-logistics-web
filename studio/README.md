# Sanity Studio (SG Logistics)

Redigeringsgrensesnitt for innhold. Knyttet til prosjekt `r781ar4i`, dataset `production`.

## Start lokalt

```powershell
cd C:\Projects\NewWEB\studio
git pull
npm install
npm run dev
```

Åpne URL-en som vises (vanligvis http://localhost:3333) og logg inn med samme Sanity-konto.

> Tips: Hold prosjektet utenfor OneDrive hvis Studio mister fokus eller lastes på nytt mens du skriver.

## Deploy Studio (viktig)

Hosted Studio på sanity.io/sanity.studio speiler **ikke** automatisk schema fra Git. Etter schema-endringer:

```powershell
cd C:\Projects\NewWEB\studio
git pull
npm install
npm run deploy
```

Da oppdateres f.eks. `https://sg-logistics.sanity.studio`.

## Mister fokus / «kastet ut» mens du skriver?

1. Sørg for at du kjører Studio fra oppdatert `studio/` (`git pull` + `npm install` + restart `npm run dev`).
2. Kjør migrering som flater ut gamle callout-blokker (nested rich text → ren tekst):

```powershell
cd C:\Projects\NewWEB
$env:SANITY_API_WRITE_TOKEN="..."   # Editor-token
npx tsx scripts/migrate-callout-text.ts
```

3. I Studio: **Discard changes** på artikkelen hvis den har et ødelagt utkast, deretter hard refresh.
4. Deploy hosted Studio (`npm run deploy`) så sanity.io matcher localhost.

## Live nettside uten rebuild

CMS-artikler (`/kjekt-a-vite/*`, `/om-oss/[slug]`) hentes live fra Sanity. Publish i Studio skal synes etter hard refresh uten ny Vercel-build.

Valgfri full rebuild via webhook krever `CMS_DEPLOY_ON_PUBLISH=1` (se `.env.example`).

## Webhook (valgfritt)

Når artikler publiseres/endres i Sanity, kan Vercel rebuildes via webhook:

1. **Vercel** → Project → Settings → Git → **Deploy Hooks**  
   - Name: `sanity-rebuild`  
   - Branch: `main`  
   - Create → kopier URL → sett som `VERCEL_DEPLOY_HOOK_URL`

2. **Vercel env:**  
   - `SANITY_REVALIDATE_SECRET` = en tilfeldig streng  
   - `SANITY_API_READ_TOKEN` eller `SANITY_API_WRITE_TOKEN` med **Editor**-tilgang (brukes til debounce-lås)
   - `CMS_DEPLOY_ON_PUBLISH=1` hvis rebuild skal være på

3. **Sanity** → Project → API → **Webhooks** → Create  
   - Name: `vercel-rebuild`  
   - URL: `https://sg-logistics-web.vercel.app/api/cms/rebuild`  
   - Dataset: `production`  
   - Trigger: Create, Update, Delete  
   - Filter: `_type == "article"`  
   - **HTTP secret** / Signature secret: samme som `SANITY_REVALIDATE_SECRET`

### Mange deploys på en gang?

Sanity sender **ett webhook-kall per dokument**. Seed/bulk-publish kan derfor starte mange Vercel-jobs. `/api/cms/rebuild` debouncer deploy (override med `CMS_REBUILD_DEBOUNCE_MS`). Under bulk-seed: disable webhook midlertidig.

## Første innholdstype

- **Artikkel** (`article`) — klar til bruk under Content → Artikkel
