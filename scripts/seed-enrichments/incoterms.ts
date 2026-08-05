/**
 * Canonical Sanity enrichment for Incoterms.
 * Interactive veiviser + termvelger stay as Astro tool blocks rendered from CMS.
 */
import {callout, key, linkCards, section, warning, type Block} from "./_blocks";

export const incotermsMeta = {
  title: "Incoterms forklart",
  intro:
    "Incoterms® 2020 avklarer levering, risikoovergang, transport, forsikring og fortolling mellom selger og kjøper. Bruk veiviseren for å snevre inn riktig term, og termvelgeren for detaljer.",
  seoTitle: "Incoterms forklart | SG Logistics AS",
  seoDescription:
    "Incoterms 2020: interaktiv veiviser, termvelger, risiko vs kostnad, forsikring CIF/CIP og vanlige fallgruver ved import og eksport.",
  category: "Import og eksport",
  hero: {
    src: "/images/articles/incoterms-veiviser.png",
    alt: "Incoterms-veiviser oversikt fra SG Logistics",
  },
};

export function incotermsEnrichment(): Block[] {
  return [
    callout(
      "Kort fortalt",
      "Incoterms® 2020 er ICC sine internasjonale leveringsbetingelser. De må tas inn i kontrakten uttrykkelig, og regulerer praktiske plikter – ikke pris, betaling eller eiendomsrett. Bruk alltid term + sted + «Incoterms® 2020».",
    ),
    section({
      heading: "Hva er Incoterms?",
      text:
        "Incoterms er internasjonale leveringsbetingelser fra International Chamber of Commerce (ICC). De er ikke lovpålagte, og må tas inn i kontrakten uttrykkelig. De regulerer praktiske plikter som levering, risiko, transport, forsikring, dokumenter, eksport/import, emballasje og kostnader – men ikke pris, betaling, eiendomsrett eller konsekvenser av kontraktsbrudd.",
      items: [
        "11 regler i Incoterms® 2020: EXW, FCA, FAS, FOB, CFR, CIF, CPT, CIP, DAP, DPU og DDP.",
        "Sju kan brukes for alle transportmidler. FAS, FOB, CFR og CIF er bare for sjø- og innlandsvanntransport.",
        "Ved containerfrakt er FCA, CPT eller CIP ofte mer treffsikkert enn FOB/CIF.",
      ],
    }),
    section({
      heading: "Skriv alltid sted og versjon",
      text:
        "En Incoterms-klausul bør være presis. Bruk alltid riktig term, navngitt sted eller havn, og henvis til Incoterms® 2020. Ved C-termer er dette ekstra viktig, fordi kostnadspunkt og risikopunkt ikke ligger samme sted.",
      items: [
        "Eksempel: FCA Breivika Industriveg 63, Ålesund, Norway, Incoterms® 2020.",
        "Eksempel: DAP mottakers adresse, Marseille, France, Incoterms® 2020.",
        "Unngå bare å skrive FOB, CIF eller DAP uten sted.",
      ],
    }),
    {
      _type: "tool",
      _key: key(),
      tool: "incoterms",
    },
    section({
      heading: "Risiko og kostnader er ikke alltid samme punkt",
      text:
        "Den som betaler frakten har ikke nødvendigvis risikoen hele veien. Ved C-termer betaler selger transporten til avtalt bestemmelsessted, mens risikoen går over tidligere – når godset leveres til transportør eller lastes om bord.",
      items: [
        "CFR og CIF: selger betaler sjøfrakt til bestemmelseshavn, risiko går over i avgangshavn.",
        "CPT og CIP: selger betaler frakt til avtalt sted, risiko går over ved overlevering til transportør.",
        "DAP, DPU og DDP: risiko ligger normalt hos selger frem til godset er gjort tilgjengelig på avtalt sted.",
      ],
      image: {
        src: "/images/articles/incoterms-ansvarsmatrise.png",
        alt: "Ansvarsmatrise for Incoterms 2020",
        caption: "Klikk på matrisen for å se ansvar og kostnadsfordeling i full størrelse.",
      },
    }),
    section({
      heading: "Forsikring: CIF og CIP skiller seg ut",
      text:
        "Bare CIF og CIP pålegger selger å tegne transportforsikring. CIF krever normalt minimumsdekning etter Institute Cargo Clauses (C). CIP krever bredere dekning etter Institute Cargo Clauses (A), normalt minst kontraktspris pluss 10 %. Ved andre termer må partene selv avklare forsikring.",
      image: {
        src: "/images/articles/marine-cargo-clauses.png",
        alt: "Oversikt over risikoer dekket av Institute Cargo Clauses A, B og C",
        caption: "Klikk for å se forskjellen mellom Institute Cargo Clauses (A), (B) og (C) i full størrelse.",
      },
    }),
    section({
      heading: "Vanlige fallgruver",
      text:
        "Mange konflikter oppstår fordi leveringssted, risikopunkt eller kostnadsfordeling er uklart. Avklar derfor term før pris gis og før transport bestilles.",
      items: [
        "Å bruke FOB eller CIF på containerforsendelser uten å vurdere FCA, CPT eller CIP.",
        "Å velge EXW når kjøper ikke kan eksportklarere i selgers land.",
        "Å velge DDP uten å avklare hvem som skal stå som importør, og hvordan innførsels-mva. skal håndteres.",
        "Å tro at «frakt inkludert» betyr at selger har risikoen helt frem.",
        "Å glemme terminalkostnader, lossing eller importklarering i avtalen.",
      ],
      image: {
        src: "/images/articles/incoterms-veiviser.png",
        alt: "Incoterms-veiviser oversikt fra SG Logistics",
        caption: "Oversikt over veiviserlogikken. Klikk for å se bildet i full størrelse.",
      },
    }),
    warning(
      [
        "Skriv alltid term, sted og Incoterms® 2020 i kontrakten.",
        "Avklar forsikring eksplisitt når du ikke bruker CIF eller CIP.",
        "Ved containerfrakt: vurder FCA/CPT/CIP før FOB/CIF.",
      ],
      "Husk før du booker",
    ),
    linkCards([
      {title: "Fortolling", href: "/kjekt-a-vite/fortolling"},
      {title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods"},
      {title: "CMR-fraktbrev", href: "/kjekt-a-vite/cmr"},
    ]),
  ];
}
