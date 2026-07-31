# Interaktivt sjøkart med containerhavner

Status: Parkert inntil videre.

Vi har bygget en første versjon av et interaktivt kart for containerhavner under sjøfrakt, men datagrunnlaget viste seg å være mer komplekst enn først antatt. WPI/UNLOCODE alene gir for mange feil, både falske positive og manglende relevante containerhavner.

## Viktige læringspunkter

- BIC/SMDG er nyttig for terminalnivå fordi det gir konkrete containerterminaler, terminalkoder og koordinater.
- WPI-koordinater peker ofte på et generelt havneområde, ikke selve containerterminalen.
- FreightAPIs virker som en lovende betalt kilde for carrierdekning per havn.
- FreightAPIs sin Maersk-liste rapporterte 541 havner over 22 sider. Free-planen rakk bare en delvis uthenting.
- FreightAPIs bruker noen egne/alternative LOCODE-varianter, så alias-normalisering er nødvendig.

## Eksisterende arbeid

- `scripts/generate-world-ports.cjs` genererer WPI/SMDG-basert datasett.
- `scripts/fetch-freightapis-carrier-ports.cjs` kan hente havner per carrier fra FreightAPIs.
- `scripts/match-freightapis-ports.cjs` matcher FreightAPIs-data mot vårt havnedatasett med UN/LOCODE, alias, navn/land og kontrollert Lat/Lon-nærhet.
- `scripts/sources/container-port-verification.json` inneholder kurateringer, aliaser og terminaloverstyringer.

## Husk til senere

FreightAPIs bør vurderes først dersom arbeidet tas opp igjen. Det kan gi et bedre grunnlag for å svare på hvilke havner som betjenes av Maersk, MSC, Hapag-Lloyd og CMA CGM, men vi må avklare lisens, komplett uthenting og hvordan data kan vises på en offentlig nettside.
