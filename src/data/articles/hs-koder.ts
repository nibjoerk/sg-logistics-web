import type { Article } from "../articleTypes";

export const hsKoder: Article = {
  title: "HS-koder og varenummer",
  slug: "hs-koder",
  href: "/kjekt-a-vite/hs-koder",
  category: "Toll",
  intro:
    "HS-koder, også kalt varenummer, er det internasjonale systemet for å klassifisere varer i tollbehandlingen. Riktig kode styrer toll, avgifter, restriksjoner og om frihandelsavtaler kan brukes – og henger tett sammen med opprinnelsesregler.",
  seoTitle: "HS-koder, varenummer og opprinnelsesregler | SG Logistics AS",
  seoDescription:
    "Hva HS-koder og varenummer er, hvorfor de er viktige, konsekvenser av feil kode, opprinnelsesregler, godkjent eksportør og nyttige verktøy.",
  body: [
    {
      heading: "Hva er en HS-kode?",
      text:
        "HS står for Harmonized System – det harmoniserte systemet for vareklassifisering utviklet av Verdens tollorganisasjon (WCO). Systemet er et felles «språk» for tollmyndigheter og næringsliv i det meste av verden. Når du importerer eller eksporterer, må varen plasseres under riktig nummer i tolltariffen. I Norge kalles dette vanligvis varenummer.",
      items: [
        "Tolltariffen er basert på HS-nomenklaturen og går normalt fra kapittel 1 (levende dyr) til kapittel 97 (antikviteter).",
        "De seks første sifrene er internasjonale HS-siffer og skal i utgangspunktet være like på tvers av land.",
        "I Norge brukes normalt åtte siffer. De to siste er nasjonale og kan påvirke tollsatser, statistikk og reguleringer.",
        "De fire første sifrene kalles posisjon, de to neste underposisjon. Alle åtte til sammen er varenummeret.",
      ],
    },
    {
      heading: "HS vs. norsk varenummer",
      text:
        "Mange snakker om «HS-kode» når de egentlig mener det fullstendige varenummeret i nasjonal tolltariff. I praksis:",
      items: [
        "HS-kode: ofte de seks første sifrene (internasjonalt nivå).",
        "Varenummer i Norge: normalt åtte siffer i tolltariffen.",
        "EU og andre land kan ha flere siffer utover HS-nivået. Oppgi alltid det nummeret som kreves der deklarasjonen gjøres.",
        "Eksempel fra Tolletaten: 61.09.1000 – t-skjorter av bomull.",
      ],
    },
    {
      heading: "Hvorfor er riktig varenummer viktig?",
      text:
        "Varenummeret er nøkkelen til hvordan sendingen behandles. Med riktig nummer får du korrekte toll- og avgiftsopplysninger, og du ser om det gjelder restriksjoner, lisenser, kvoter eller frihandelsfordeler. Feil nummer gir feil beslutningsgrunnlag videre i hele kjeden.",
      items: [
        "Tollavgiftssats og ofte også andre avgifter.",
        "Om varen krever tillatelse, lisens eller er underlagt eksport-/importrestriksjoner.",
        "Om frihandelsavtaler eller tollnedsettelser kan brukes.",
        "Statistikk og dokumentasjon som må stemme med faktura, pakkliste og opprinnelsesbevis.",
      ],
    },
    {
      heading: "Hvordan finner du riktig varenummer?",
      text:
        "Start med en nøyaktig varebeskrivelse: hva varen er, materialer, bruksområde, om den er komplett eller en del, og for næringsmidler også sammensetning. Deretter velger du posisjonen som beskriver varen best, og går systematisk ned i underoppdelingene. Fritekst-søk i tolltariffen er en inngang, ikke en fasit – noter til avsnitt, kapittel og posisjon må sjekkes.",
      items: [
        "Ikke kopier blindt HS-kode fra leverandørfaktura uten å kontrollere mot norsk tolltariff.",
        "Ved tvil kan du søke bindende forhåndsuttalelse (BKU) hos Tolletaten. Den er gratis og som hovedregel bindende i tre år for fremtidige sendinger.",
        "Muntlig veiledning fra Tolletaten er ikke bindende.",
      ],
    },
    {
      heading: "Hva kan skje ved feil HS-kode / varenummer?",
      text:
        "Feil klassifisering kan gi både økonomiske og operative konsekvenser. Ved bokettersyn eller kontroll kan Tolletaten etterberegne manglende toll, vurdere tilleggstollavgift eller overtredelsesgebyr, og sendingen kan bli forsinket eller stanset.",
      items: [
        "For lite toll betalt: etterberegning av differansen, eventuelt med tillegg.",
        "For mye toll betalt: unødvendige kostnader inntil feilen rettes.",
        "Feil restriksjonsvurdering: varer sendes uten nødvendig tillatelse, eller stoppes i tollkontroll.",
        "Feil bruk av frihandelsavtale: preferansetoll avslås, eller opprinnelsesdokumentasjon stemmer ikke med klassifiseringen.",
        "Forsinkelse: deklarasjonen må korrigeres, varer blir stående, og leveranse og kostnader påvirkes.",
      ],
    },
    {
      heading: "Praktiske eksempler",
      text:
        "Konsekvensene blir ofte tydeligst når to nærliggende varenummer har ulik tollsats, ulike restriksjoner eller ulik behandling under frihandelsavtaler.",
      items: [
        "Import med for lav tollsats: En vare klassifiseres under et nummer med 0 % toll, mens riktig nummer har høyere sats. Differansen kan kreves inn senere.",
        "Eksport med feil restriksjonskode: En komponent plasseres under feil posisjon og unngår lisenskrav som egentlig gjelder. Sendingen kan bli stoppet.",
        "Elektronikk vs. reservedeler: Et komplett produkt og løse deler kan høre under ulike posisjoner.",
        "Mat/landbruk: Små forskjeller i sammensetning eller bearbeiding kan gi annet varenummer og andre satser.",
        "Frihandelsfordel går tapt: Varen har riktig opprinnelse, men feil varenummer gjør at preferansetoll ikke kan brukes.",
      ],
    },
    {
      heading: "Opprinnelsesregler – mer enn «laget i»",
      text:
        "For å få lavere eller null toll under en frihandelsavtale er det ikke nok at varen er sendt fra et avtaleland. Varen må også oppfylle avtalens opprinnelsesregler. Disse reglene knyttes ofte til HS-posisjon og kan kreve at varen er helt fremstilt i avtalelandet, at ikke-opprinnelsesmaterialer er tilstrekkelig bearbeidet, eller at et bestemt verdi-/vekttap er oppfylt.",
      items: [
        "Preferanseopprinnelse dokumenteres typisk med EUR.1 / EUR-MED eller en opprinnelseserklæring på faktura eller annet handelsdokument.",
        "Uten status som godkjent eksportør kan opprinnelseserklæring normalt bare brukes når verdien av opprinnelsesproduktene i sendingen ikke overstiger 65 000 kroner.",
        "Over denne verdien må du vanligvis bruke varesertifikat EUR.1, med mindre du er godkjent eksportør.",
        "Feil HS-kode kan gjøre at du bruker feil opprinnelsesregel – og dermed utsteder et ugyldig opprinnelsesbevis.",
      ],
      links: [
        {
          href: "https://findrulesoforigin.org/en?culture=en",
          label: "Rules of Origin Facilitator – finn opprinnelsesregler",
        },
      ],
    },
    {
      heading: "Godkjent eksportør",
      text:
        "Godkjent eksportør er en autorisasjon fra Tolletaten som lar virksomheter med tilstrekkelig kunnskap om opprinnelsesreglene selv utferdige opprinnelseserklæringer uten hensyn til verdien på sendingen. Ordningen finnes i frihandelsavtalene Norge er part i, og er særlig nyttig ved jevnlig eksport av opprinnelsesvarer.",
      items: [
        "Du må ha jevnlig eksport og kunne dokumentere opprinnelsesstatus med lager-/regnskapssystem og underlagsdokumentasjon.",
        "Virksomheten må utpeke ansvarlige personer for opprinnelsesregelverket og holde seg oppdatert.",
        "Godkjente eksportører påfører autorisasjonsnummer i erklæringen og kan få fritak fra krav om fysisk signatur.",
        "Første autorisasjon gis normalt med prøveperiode. Oppbevaringsplikt for dokumentasjon er typisk fem år.",
        "Feilaktige opprinnelseserklæringer kan gi verifikasjon, tilbaketrekking av autorisasjon og at importør blir krevd for toll.",
      ],
    },
    {
      heading: "Slik reduserer du risikoen",
      text:
        "Behandle klassifisering og opprinnelse som to koblede vurderinger: først riktig varenummer, deretter riktig opprinnelsesregel og riktig bevis for den aktuelle avtalen.",
      items: [
        "Beskriv varen nøyaktig før du klassifiserer.",
        "Kontroller noter i tolltariffen, ikke bare søketreff.",
        "Sjekk om frihandelsavtale gjelder for både land og varenummer.",
        "Avklar om du trenger EUR.1 eller kan bruke opprinnelseserklæring – og om godkjent eksportør er aktuelt.",
        "Ved usikker klassifisering: vurder BKU hos Tolletaten.",
      ],
      links: [
        { href: "/kjekt-a-vite/fortolling", label: "Fortolling ved import" },
        { href: "/kjekt-a-vite/transittering", label: "Transittering" },
        { href: "/kjekt-a-vite/ata-carnet", label: "ATA-carnet" },
      ],
    },
    {
      heading: "Nyttige kilder",
      text:
        "Bruk offisielle kilder når du klassifiserer eller vurderer preferansetoll. Verktøyene under er et godt utgangspunkt, men erstatter ikke konkret vurdering av din vare og avtale.",
      items: [
        "Tolletaten: Finn riktig varenummer i tolltariffen, BKU og veiledning om frihandel/opprinnelse.",
        "WCO Harmonized System: internasjonal struktur og nomenklatur bak HS-kodene.",
        "ITC Rules of Origin Facilitator: oversikt over frihandelsavtaler, tollsatser og opprinnelsesregler per vare og landpar.",
      ],
      links: [
        {
          href: "https://www.toll.no/no/bedrift/tolltariffen-og-klassifisering/finn-riktig-varenummer-i-tolltariffen",
          label: "Tolletaten – finn riktig varenummer",
        },
        {
          href: "https://www.wcotradetools.org/en/harmonized-system",
          label: "WCO – Harmonized System",
        },
        {
          href: "https://findrulesoforigin.org/en?culture=en",
          label: "Rules of Origin Facilitator",
        },
        {
          href: "https://www.toll.no/no/bedrift/eksport/frihandel-ved-eksport/godkjende-eksportorar/",
          label: "Tolletaten – godkjent eksportør",
        },
      ],
    },
    {
      heading: "Hvordan kan vi hjelpe?",
      text:
        "SG Logistics kan bistå med praktisk dokumentkontroll, fortolling og oppfølging når varenummer, opprinnelse og restriksjoner må avklares før sendingen går.",
    },
  ],
};
