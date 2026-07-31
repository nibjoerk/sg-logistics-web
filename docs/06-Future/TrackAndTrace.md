# Track & Trace

Fase 1: egen side `/sporing` der kunden velger forsendelsestype og åpner
relevant ekstern sporingsportal.

## Støttede typer

| Type | Referanse | Portal |
|------|-----------|--------|
| LTL | Fraktbrevnummer | transportsiden.no (Timpex) |
| Flyfrakt | AWB (3 siffer = flyselskap) | Flyselskapets cargo-portal |
| UPS | Tracking number | ups.com/track |
| FCL | Booking / B/L / container | Maersk, MSC, Hapag-Lloyd, CMA CGM |
| LCL | Bookingnummer | ecuworldwide.com |

FTL støttes ikke i fase 1.

## FCL-gjenkjenning

Containernummer (4 bokstaver + 7 siffer):

1. **Lokal mapping** av eier-prefiks (3-bokstavs BIC-eier + 4-bokstavs ISO-kode)
   for Maersk, MSC, Hapag-Lloyd og CMA CGM.
2. **BIC BoxTech API** (`GET /api/v2.0/codes/{bicCode}`) via vår proxy
   `/api/bic-owner?container=…` når lokal mapping ikke treffer.
3. **Leasingselskap** (Triton, Textainer, …): unit inquiry for utstyrs-/leasestatus.
   Triton støtter deep-link. Dette er *ikke* forsendelsessporing – for det
   må rederi velges manuelt.
4. Ellers velges rederi manuelt i dropdown.

BIC-koden er de fire første bokstavene (f.eks. `MAEU` = eier `MAE` + kategori `U`).

### Sporingsportaler (hovedrederier)

| Rederi | Hva de ber om | Merknad |
|--------|---------------|---------|
| Maersk | Ocean cargo: B/L **eller** container | B/L = 9 tegn; container = 4+7. Strip `MAEU` for B/L |
| MSC | Container/B/L **eller** booking (radio) | Ett søkefelt |
| Hapag-Lloyd | Egne sider for container vs booking/B/L | B/L-felt preutfylt med `HLCU` |
| CMA CGM | Ett felt: container / shipment ref / my ref | Eksempel `ABCD1234567` |

Merk: containereier (BIC) er ikke alltid det operative rederiet ved leasede
containere. Dropdown forblir tilgjengelig som fallback.

### BIC API-oppsett

1. Registrer gratis på [app.bic-boxtech.org/sign-up](https://app.bic-boxtech.org/sign-up)
2. Sett miljøvariabler (lokalt i `.env`, i produksjon i Vercel):

```
BIC_USERNAME=din@epost.no
BIC_PASSWORD=ditt-passord
```

Dokumentasjon: [Identify who owns a given BIC Code](https://docs.bic-boxtech.org/api/identify-who-owns-a-given-bic-code)

## Neste fase (ikke implementert)

- UPS API i stedet for redirect
- TMS-integrasjon: innloggede kunder ser egne sendinger
- Flere flyselskap med direkte sporingslenker
- FTL-sporing
