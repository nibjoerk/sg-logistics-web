# Sanity Studio (SG Logistics)

Redigeringsgrensesnitt for innhold. Knyttet til prosjekt `r781ar4i`, dataset `production`.

## Start lokalt

```powershell
cd C:\Projects\NewWEB\studio
npm install
npm run dev
```

Åpne URL-en som vises (vanligvis http://localhost:3333) og logg inn med samme Sanity-konto.

## Deploy Studio (valgfritt)

```powershell
npm run deploy
```

Da får dere Studio på f.eks. `https://sg-logistics.sanity.studio`.

## Auto-rebuild av nettsiden

Når artikler publiseres/endres i Sanity, trigges Vercel via webhook:

1. **Vercel** → Project → Settings → Git → **Deploy Hooks**  
   - Name: `sanity-rebuild`  
   - Branch: `main`  
   - Create → kopier URL → sett som `VERCEL_DEPLOY_HOOK_URL`

2. **Vercel env:** `SANITY_REVALIDATE_SECRET` = en tilfeldig streng

3. **Sanity** → Project → API → **Webhooks** → Create  
   - Name: `vercel-rebuild`  
   - URL: `https://sg-logistics-web.vercel.app/api/cms/rebuild`  
   - Dataset: `production`  
   - Trigger: Create, Update, Delete  
   - Filter: `_type == "article"`  
   - **HTTP secret** / Signature secret: samme som `SANITY_REVALIDATE_SECRET`  
   - Projection (valgfritt): `{_id,_type,"slug":slug.current}`

Etter Publish skal et nytt Vercel-deployment starte automatisk.

## Første innholdstype

- **Artikkel** (`article`) — klar til bruk under Content → Artikkel
