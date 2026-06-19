# Kjekt å vite – fix

Denne branchen gjenoppretter og utvider `Kjekt å vite` etter at innhold ble redusert i tidligere pakker.

Endringer:

- Utvidet `src/data/articles.ts` med en større kunnskapsbase.
- Beholdt både `href` og `path` på artikler for kompatibilitet med eksisterende komponenter og tjenestesider.
- Forbedret `/kjekt-a-vite` med kategorinavigasjon og grupperte artikler.
- Forbedret artikkelsider med relatert innhold i sidebar.

Kategorier:

- Sjøfrakt
- Flyfrakt
- Veitransport
- Import og eksport
- Toll
- Dokumenter
- Pakking
- Forsikring

Test anbefalt:

```powershell
npm run build
```

Sjekk spesielt:

- `/kjekt-a-vite`
- `/kjekt-a-vite/containerstorrelser`
- `/kjekt-a-vite/stuffing-av-container`
- `/kjekt-a-vite/farlig-gods-flyfrakt`
- `/kjekt-a-vite/ledetider-ltl`
- `/tjenester/bilfrakt`
- `/tjenester/flyfrakt`
- `/tjenester/sjofrakt`
