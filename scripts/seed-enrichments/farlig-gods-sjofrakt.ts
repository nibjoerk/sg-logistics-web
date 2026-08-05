import {
  callout,
  checklist,
  factTiles,
  infoCards,
  linkCards,
  paragraphsToBlocks,
  textBlock,
  warning,
  type Block,
} from "./_blocks";

export const farligGodsSjoMeta = {
  title: "Farlig gods på sjø: hva må vareeier vite?",
  intro:
    "IMDG-koden regulerer farlig gods som sendes med skip. For vareeier handler det viktigste om å gi riktige opplysninger, bruke riktig emballasje, merke godset tydelig og pakke containeren trygt.",
  seoTitle: "Farlig gods på sjø for vareeiere | SG Logistics AS",
  seoDescription:
    "Praktisk IMDG-guide for vareeiere som skal sende farlig gods med sjøfrakt: dokumentasjon, merking, containerpakking, miljøfare og adskillelse av gods.",
  category: "Sjøfrakt",
  hero: {
    src: "/images/articles/farlig-gods-sjo-imdg-container.png",
    alt: "Illustrasjon av farlig gods i container for sjøfrakt",
  },
};

export function farligGodsSjoEnrichment(): Block[] {
  return [
    callout(
      "Viktig",
      "Denne artikkelen er en praktisk oppsummering for vareeiere, basert på Sjøfartsdirektoratets veiledning og IMDG Code Amendment 42-24. Amendment 42-24 kunne brukes frivillig fra 1. januar 2025 og trådte i kraft 1. januar 2026. Artikkelen erstatter ikke IMDG-koden, sikkerhetsdatablad, rederiets krav eller konkret vurdering av den enkelte sending.",
      "warning",
    ),
    textBlock("Faguttrykk kort forklart", "h2"),
    ...paragraphsToBlocks(
      "Noen uttrykk brukes på engelsk i sjøfrakt. Her er de viktigste begrepene kort forklart:",
    ),
    factTiles([
      {label: "IMDG", value: "International Maritime Dangerous Goods Code. Regelverket for farlig gods i pakket form på sjø."},
      {label: "IBC", value: "Intermediate Bulk Container. En større transportbeholder, ofte rundt 1000 liter."},
      {label: "Proper shipping name", value: "Det offisielle engelske transportnavnet som skal brukes i dokumentasjonen."},
      {label: "Marine pollutant", value: "Et stoff som er skadelig for det marine miljøet og derfor må merkes og dokumenteres særskilt."},
      {label: "CTU", value: "Cargo Transport Unit. Fellesbetegnelse for container, kjøretøy, trailer eller annen lasteenhet."},
      {label: "Placard", value: "Stor fareseddel på container eller annen lasteenhet, slik at faren er synlig utenfra."},
      {
        label: "Packing certificate",
        value: "Pakkeerklæring som bekrefter at farlig gods er pakket og sikret riktig i container eller kjøretøy.",
      },
      {label: "MARPOL", value: "Internasjonal konvensjon som blant annet regulerer forurensning fra skip."},
    ]),
    textBlock("Hvilket regelverk gjelder?", "h2"),
    ...paragraphsToBlocks(
      "IMDG står for International Maritime Dangerous Goods Code. Det er regelverket som brukes når farlig gods sendes som stykkgods, på pall, i fat, i IBC eller i container med skip.\n\nReglene henger sammen med SOLAS, som gjelder sikkerhet til sjøs, og MARPOL, som blant annet gjelder miljøfare. Bulkvarer, flytende gasser og radioaktiv last kan ha egne tilleggskrav. Denne artikkelen gjelder først og fremst pakket farlig gods.",
    ),
    textBlock("Vareeiers ansvar før sjøfrakt", "h2"),
    ...paragraphsToBlocks(
      "Rederi og skip må vite hva som tas om bord, men de kan ikke klassifisere varen på vegne av vareeier uten riktig produktinformasjon. Som avsender må du derfor sørge for at varen er riktig beskrevet, pakket, merket og dokumentert før den leveres til transport.\n\nSjøfartsdirektoratet peker også på at farlig og skadelig last må vurderes før den tas om bord, og at skipet skal ha riktig dokumentasjon tilgjengelig.",
    ),
    infoCards(
      [
        {
          title: "Avklare om varen er farlig gods på sjø",
          text:
            "Start med sikkerhetsdatabladet og transportinformasjonen. En vare kan være farlig gods, miljøskadelig for sjø, eller begge deler.",
        },
        {
          title: "Bruke riktig navn og klasse",
          text:
            "UN-nummer, varenavn, fareklasse, eventuell tilleggsfare og emballasjegruppe må stemme med det som faktisk sendes.",
        },
        {
          title: "Velge riktig emballasje",
          text:
            "Emballasje, større beholdere som IBC, tank eller annen beholder må være tillatt for varen og mengden, og må være hel, lukket og egnet for sjøtransport.",
        },
        {
          title: "Merke kolli og container",
          text:
            "Kolli, overpack og container må merkes riktig. Feil merking kan føre til at lasten stoppes i havn.",
        },
        {
          title: "Dokumentere korrekt",
          text:
            "Sjøfrakt krever riktige opplysninger i transportdokumentet, og ofte en egen pakkeerklæring når farlig gods pakkes i container.",
        },
        {
          title: "Avklare plassering og adskillelse",
          text:
            "Noen varer må holdes unna andre varer, matvarer eller bestemte områder om bord. Dette må avklares før booking.",
        },
      ],
      undefined,
      2,
    ),
    textBlock("Dokumentasjon og farlig gods-erklæring", "h2"),
    ...paragraphsToBlocks(
      "Ved sjøfrakt må farlig gods beskrives riktig i transportdokumentet. I praksis brukes ofte Multimodal Dangerous Goods Form eller en tilsvarende farlig gods-erklæring. Dokumentet skal stemme med sikkerhetsdatabladet, merkingen på kolliene, merkingen på containeren og det som faktisk er lastet.",
    ),
    checklist(
      [
        "UN-nummer med bokstavene UN foran",
        "Korrekt varenavn på engelsk",
        "Fareklasse og eventuell tilleggsfare",
        "Emballasjegruppe der dette er relevant",
        "Antall og type kolli, samt total mengde farlig gods",
        "Om varen er miljøskadelig for sjø",
        "Flammepunkt for relevante brannfarlige væsker",
        "Eventuelle unntak eller forenklede regler, for eksempel begrenset mengde",
        "Containernummer når godset er pakket i container",
        "Nødtelefon eller kontaktperson som kjenner varens egenskaper",
      ],
      "Opplysninger som bør avklares",
    ),
    ...paragraphsToBlocks(
      "Feil eller mangelfull dokumentasjon kan føre til at containeren blir avvist ved terminal, holdt tilbake i havn eller ombooket til senere avgang. For enkelte laster kan det også være behov for forhåndsgodkjenning fra rederi eller terminal.",
    ),
    textBlock("Containerpakking og pakkeerklæring", "h2"),
    ...paragraphsToBlocks(
      "Når farlig gods pakkes i container eller annen CTU, er selve pakkingen en del av sikkerheten. Containeren skal tåle sjøtransport, omlasting og bevegelse i sjøgang. Lasten må sikres slik at kolli ikke kan forskyve seg, falle, punkteres eller skade hverandre.\n\nVed farlig gods i container kreves det normalt en container/vehicle packing certificate. Den bekrefter blant annet at containeren er egnet, at kolli er kontrollert, at godset er riktig plassert og sikret, og at merking og placards er korrekt.",
    ),
    checklist(
      [
        "Containeren er ren, tørr og egnet for lasten.",
        "Kolli er kontrollert for skade, lekkasje og korrekt merking før de pakkes inn.",
        "Godset er plassert og sikret slik at det tåler sjøtransport.",
        "Varer som ikke kan stå sammen, er holdt adskilt.",
        "Faresedler, merker og store faresedler på containeren er synlige og korrekte.",
        "Eventuelle kjøleenheter, ventilasjon eller temperaturkrav er avklart.",
      ],
      "Dette bør kontrolleres før containeren lukkes",
    ),
    textBlock("Særskilt viktig ved sjøfrakt", "h2"),
    ...paragraphsToBlocks(
      "Sjøtransport skiller seg fra vei og fly ved at containeren kan være lenge underveis, stå på dekk, utsettes for temperatur, fukt, salt miljø og mange omlastinger. Små feil i emballasje, sikring eller adskillelse fra annet gods kan få store konsekvenser.",
    ),
    infoCards(
      [
        {
          title: "Miljøskadelig gods",
          text:
            "Noen stoffer kan skade livet i sjøen ved utslipp. Da må dette fremgå av dokumentasjon og merking.",
        },
        {
          title: "Plassering om bord",
          text:
            "Noen typer farlig gods kan ha krav til hvor de kan stå på skipet, for eksempel på dekk eller under dekk.",
        },
        {
          title: "Adskillelse",
          text:
            "Noen stoffer kan reagere farlig med hverandre. Derfor kan de måtte holdes unna hverandre i containeren eller om bord.",
        },
        {
          title: "Flere transportledd",
          text:
            "Containeren skal ofte også gå på vei, bane eller terminal. Da må andre regler også vurderes, ikke bare IMDG.",
        },
      ],
      undefined,
      2,
    ),
    warning(
      [
        "Et stoff kan være både farlig gods og skadelig for det marine miljøet (marine pollutant).",
        "Dette påvirker dokumentasjon, merking og hvordan lasten håndteres ved uhell eller utslipp.",
      ],
      "Miljøfare må ikke glemmes",
    ),
    textBlock("Før du booker sjøtransport", "h2"),
    ...paragraphsToBlocks(
      "Farlig gods bør avklares før booking, ikke når containeren står på terminal. Rederi og terminal trenger tid til å kontrollere om lasten kan aksepteres, hvordan den skal stues, og om den kan kombineres med annen last på samme skip.",
    ),
    checklist([
      "Send sikkerhetsdatablad og IMDG-klassifisering før booking.",
      "Oppgi UN-nummer, varenavn, klasse, emballasjegruppe, mengde og emballasjetype.",
      "Avklar om varen er miljøskadelig for sjø.",
      "Oppgi om godset sendes etter forenklede regler, er avfall, krever temperaturkontroll eller er tom ikke-rengjort emballasje.",
      "Oppgi om containeren pakkes av vareeier, terminal, leverandør eller annen tredjepart.",
      "Avklar om det trengs pakkeerklæring for containeren.",
      "Send bilder ved tvil om emballasje, merking, skade, pallering eller sikring.",
      "Vent med innlevering til speditør/rederi har bekreftet at sendingen kan aksepteres.",
    ]),
    callout(
      "SG Logistics kan hjelpe",
      "Vi kan bistå med praktisk avklaring før booking, dialog med rederi og kontroll av hvilken informasjon som trengs. Klassifisering og produktdata må likevel komme fra vareeier, produsent eller fagkyndig rådgiver.",
    ),
    linkCards([
      {title: "Containerpakking: stuffing og sikring", href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing"},
      {title: "Farlig gods på vei og jernbane", href: "/kjekt-a-vite/farlig-gods-pa-vei"},
      {title: "Farlig gods med fly", href: "/kjekt-a-vite/farlig-gods-flyfrakt"},
    ]),
  ];
}
