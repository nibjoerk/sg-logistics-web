export const articles = [
  {
    slug: "incoterms",
    title: "Incoterms",
    path: "/kjekt-a-vite/incoterms",
    category: "Handelsbetingelser",
    seoTitle: "Incoterms | Kjekt å vite | SG Logistics AS",
    seoDescription:
      "Kort forklart om Incoterms og hvorfor leveringsbetingelser er viktige i internasjonal handel.",
    intro:
      "Incoterms beskriver hvem som har ansvar for kostnader, risiko og transport i en internasjonal handel.",
    body: [
      {
        heading: "Hva er Incoterms?",
        text:
          "Incoterms er standardiserte leveringsbetingelser som brukes i internasjonal handel. De avklarer blant annet når risikoen går over fra selger til kjøper, og hvem som betaler for transport, forsikring og avgifter.",
      },
      {
        heading: "Hvorfor er det viktig?",
        text:
          "Riktig bruk av Incoterms reduserer risiko for misforståelser, ekstra kostnader og forsinkelser. Betingelsene bør avklares før transporten bestilles.",
      },
    ],
  },
  {
    slug: "cmr",
    title: "CMR-fraktbrev",
    path: "/kjekt-a-vite/cmr",
    category: "Bilfrakt",
    seoTitle: "CMR-fraktbrev | Kjekt å vite | SG Logistics AS",
    seoDescription:
      "Kort forklart om CMR-fraktbrev ved internasjonal veitransport.",
    intro:
      "CMR-fraktbrevet dokumenterer internasjonal veitransport og inneholder viktig informasjon om sendingen.",
    body: [
      {
        heading: "Hva brukes CMR til?",
        text:
          "CMR brukes ved internasjonal biltransport og fungerer som dokumentasjon på transportavtalen mellom avsender, transportør og mottaker.",
      },
      {
        heading: "Hva bør kontrolleres?",
        text:
          "Avsender, mottaker, godsets art, antall kolli, vekt og eventuelle anmerkninger bør kontrolleres nøye før transporten starter.",
      },
    ],
  },
  {
    slug: "fortolling",
    title: "Fortolling",
    path: "/kjekt-a-vite/fortolling",
    category: "Toll",
    seoTitle: "Fortolling | Kjekt å vite | SG Logistics AS",
    seoDescription:
      "Kort forklart om fortolling, dokumenter og deklarering ved import og eksport.",
    intro:
      "Fortolling sikrer at varer importeres og eksporteres i tråd med gjeldende regler og dokumentasjonskrav.",
    body: [
      {
        heading: "Hva innebærer fortolling?",
        text:
          "Fortolling handler om å deklarere varer til tollmyndighetene. Det krever korrekt informasjon om varetype, verdi, opprinnelse og mottaker.",
      },
      {
        heading: "Hva trenger du?",
        text:
          "Vanlige dokumenter er handelsfaktura, pakkeliste, transportdokumenter og eventuell opprinnelsesdokumentasjon.",
      },
    ],
  },
  {
    slug: "volumvekt",
    title: "Volumvekt",
    path: "/kjekt-a-vite/volumvekt",
    category: "Prisberegning",
    seoTitle: "Volumvekt | Kjekt å vite | SG Logistics AS",
    seoDescription:
      "Kort forklart om volumvekt og hvorfor det kan påvirke fraktprisen.",
    intro:
      "Volumvekt brukes når en sending tar stor plass i forhold til faktisk vekt.",
    body: [
      {
        heading: "Hva er volumvekt?",
        text:
          "Volumvekt er en beregningsmetode som tar hensyn til hvor mye plass godset opptar. Dette er særlig relevant for flyfrakt og større, lette kolli.",
      },
      {
        heading: "Hvorfor påvirker det prisen?",
        text:
          "Transportkapasitet begrenses ofte av både vekt og volum. Derfor kan store, lette sendinger prises etter volumvekt i stedet for faktisk vekt.",
      },
    ],
  },
] as const;

export type ArticleSlug = (typeof articles)[number]["slug"];
export type Article = (typeof articles)[number];

export function getArticleBySlug(slug: string) {
  return articles.find((article) => article.slug === slug);
}
