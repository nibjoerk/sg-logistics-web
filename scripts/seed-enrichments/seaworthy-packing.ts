/**
 * Full-body enrichment for the seaworthy-packing mirror.
 * Source: src/pages/kjekt-a-vite/sjofrakt/seaworthy-packing/index.astro
 */
import {
  callout,
  checklist,
  infoCards,
  key,
  linkCards,
  paragraphsToBlocks,
  textBlock,
  type Block,
} from "./_blocks";

export const seaworthyPackingMeta = {
  title: "Seaworthy packing: sjødyktig emballering",
  intro:
    "Sjødyktig emballering handler om å beskytte godset mot lang transporttid, fukt, kondens, korrosjon, omlasting og håndtering, enten sendingen går som FCL, LCL eller annen sjøfrakt.",
  seoTitle: "Seaworthy packing og sjødyktig emballering | SG Logistics AS",
  seoDescription:
    "Omfattende guide til sjødyktig emballering: emballasjetyper, innvendig beskyttelse, materialvalg, ISPM 15, merking og håndteringssymboler.",
  category: "Sjøfrakt",
};

const basicRules = [
  "Ikke pakk varer som ikke tåler hverandre i samme transportpakke.",
  "Hvis flere varer pakkes sammen, må de ikke kunne gnisse, slå eller presse mot hverandre.",
  "Legg alltid det tyngste godset nederst.",
  "Ikke pakk tunge og lette varer sammen hvis det kan skade lett gods.",
  "Pakk skjøre varer separat.",
  "Vurder om godset trenger beskyttelse mot fukt, uttørking, korrosjon, temperatur, sollys eller elektromagnetisk påvirkning.",
  "Sørg for at emballasjen er forsvarlig lukket og at skjøter ikke åpner seg under transport.",
];

const packageTypes = [
  {
    title: "Lett finer- eller plywoodkasse",
    text:
      "Egnet for lettere kolli, reservedeler, elektronikk, måleutstyr og annet gods som trenger beskyttelse, men ikke svært høy stivhet. Stablebarheten kan være begrenset.",
  },
  {
    title: "Lett trekasse",
    text:
      "Kan håndteres mekanisk og kan ofte gjøres stablebar. Brukes gjerne til maskineri, utstyr og enhetslast der godset trenger mer robust ytre emballasje.",
  },
  {
    title: "Tung trekasse",
    text:
      "Aktuell for tyngre maskiner, metallprodukter, elektronikk og utstyr. Materialstyrken må velges etter produktets vekt og forventet håndtering.",
  },
  {
    title: "Treramme eller rack",
    text:
      "Gir mulighet for direkte surring av produktet uten egne luker i emballasjen. Passer for gods som trenger solid bæring, men ikke nødvendigvis full værbeskyttelse.",
  },
  {
    title: "Plattform",
    text:
      "Kan være riktig for robust gods som ikke trenger lukket emballasje, eller der værbeskyttelse løses med presenning, plast eller annen tildekking.",
  },
  {
    title: "Produktspesialtilpasset emballasje",
    text:
      "For verdifullt, skjørt, tungt eller uvanlig gods bør emballasje og sikring bygges rundt produktets form, tyngdepunkt, løftepunkter og transportløp.",
  },
];

const protectionGoals = [
  "Dempe vibrasjoner og støt under transport, lasting og lossing.",
  "Holde godset fast slik at det ikke beveger seg inne i egen emballasje eller CTU.",
  "Absorbere eventuell lekkasje eller søl fra godset.",
  "Hindre skader på overflater, hjørner, kanter og sensitive komponenter.",
  "Beskytte mot fukt, vann, kondens og korrosjon.",
  "Beskytte mot temperaturvariasjoner og sollys der dette er relevant.",
];

const internalProtection = [
  "Bolte produktet til bunnstrukturen når det er mulig og forsvarlig.",
  "Unngå tomrom mellom produkt og emballasje. Hulrom kan gi støt, klemskade og bevegelse.",
  "Legg beskyttende materiale mellom produkt og emballasje slik at de ikke gnisser mot hverandre.",
  "Fest støtte- og sikringsmateriale i solide flater, ikke i svake deler av emballasjen.",
  "Sørg for at plattform eller pall er større enn produktets ytterkontur, slik at produktet ikke tar første støt.",
  "Merk tydelig dersom produkt eller emballasje ikke er stablebar.",
];

const materials = [
  {
    title: "Tre og kryssfiner",
    text:
      "Robust, lett å bearbeide og godt egnet til kasser, rammer, plattformer og støtteverk. Ved internasjonal eksport må ISPM 15 vurderes for treemballasje og dunnage.",
  },
  {
    title: "Plast, folie og liner",
    text:
      "Nyttig som fuktbarriere og omslag, men bør brukes bevisst. Der det finnes gode alternativer, bør materialbruk og avfall vurderes.",
  },
  {
    title: "Papp og papirbasert materiale",
    text:
      "Kan være godt egnet som innvendig beskyttelse og mellomlegg, men må beskyttes mot fukt hvis transporten krever det.",
  },
  {
    title: "Dunnage bags",
    text:
      "Kan fylle hulrom og støtte lette kolli, men må ikke brukes mot dører, harde skarpe flater eller på en måte som gir gnissing og skade.",
  },
];

const markingInfo = [
  "Produkttype eller produktkode. Unngå unødvendig detaljert informasjon på tyveriutsatt gods.",
  "Om godset er farlig gods, skjørt, fuktfølsomt, temperaturfølsomt eller bedervelig.",
  "Avsender, mottaker, referanse og kollinummer.",
  "Vekt, tyngdepunkt og mål: lengde, bredde og høyde.",
  "Informasjon om surring, støtte, løftepunkter og håndtering.",
  "Om kolliet er stablebart eller ikke.",
];

const senderChecklist = [
  "Er emballasjen dimensjonert for hele reisen, inkludert terminal, sjø, omlasting og lagring?",
  "Er produktet sikret inne i emballasjen, ikke bare emballasjen sikret utenpå?",
  "Er fukt, kondens, korrosjon og temperatur vurdert?",
  "Er emballasjen sterk nok til løft, stabling, surring og normal håndtering?",
  "Er treemballasje og dunnage vurdert mot ISPM 15?",
  "Er merking, vekt, mål, tyngdepunkt og håndteringssymboler tydelige?",
  "Er gammel merking fjernet dersom emballasjen brukes om igjen?",
];

export function seaworthyPackingEnrichment(): Block[] {
  return [
    callout(
      "Kort sagt",
      "En seaworthy transportpakke skal beskytte varen gjennom hele planlagt transportløp og samtidig gjøre godset mulig å håndtere, sikre, merke og dokumentere på en trygg måte.",
    ),
    textBlock("Hva er seaworthy packing?", "h2"),
    ...paragraphsToBlocks(
      "Seaworthy packing er emballasje som er egnet for maritim transport. Den skal kunne beskytte godset gjennom transport, omlasting og eventuell lagring, og den må tåle både mekaniske og klimatiske belastninger.\n\nGodset kan være underveis i flere uker eller måneder. Emballasjen må derfor vurderes mot varme, kulde, temperatursvingninger, sollys, fukt, luftfuktighet, tyveririsiko, håndtering og sjansen for at godset blir lagret utendørs.\n\nEn viktig fallgruve er at avsender ofte ikke styrer hvor godset plasseres i containeren eller hvor containeren plasseres om bord på skipet. Emballasjen må derfor være robust nok til å tåle mer enn den ideelle transporten.",
    ),
    textBlock("Grunnregler før du velger emballasje", "h2"),
    ...paragraphsToBlocks(
      "Emballasje bør planlegges allerede når produktet og transportløpet vurderes. Dårlig emballasje kan skade produktet, gjøre surring vanskelig og føre til reklamasjoner, forsinkelser eller avvisning.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: basicRules,
    },
    textBlock("Emballasjetyper for sjøtransport", "h2"),
    ...paragraphsToBlocks(
      "Riktig emballasjetype avhenger av vekt, størrelse, skjørhet, fuktfølsomhet, verdi, stablebarhet og hvordan godset skal håndteres.",
    ),
    infoCards(packageTypes, undefined, 2),
    textBlock("Innvendig beskyttelse", "h2"),
    ...paragraphsToBlocks(
      "Det er ikke nok at ytteremballasjen er sterk. Produktet må også holdes på plass inne i emballasjen. Støttemateriale kan være treverk, kartong, tape, plastfolie, skum, bobleplast, papir, dunnage bags eller annet egnet fyllmateriale.",
    ),
    checklist(protectionGoals, "Målet med innvendig beskyttelse"),
    {
      _type: "checklist",
      _key: key(),
      items: internalProtection,
    },
    textBlock("Materialvalg, gjenbruk og ISPM 15", "h2"),
    ...paragraphsToBlocks(
      "Unødvendig emballasje bør unngås av økonomiske og miljømessige grunner. Samtidig er underemballering ofte mer skadelig enn overemballering, fordi skade på gods gir ny produksjon, ny transport, reklamasjon og avfall.",
    ),
    infoCards(materials, undefined, 2),
    ...paragraphsToBlocks(
      "Ved bruk av treemballasje til eksport må ISPM 15 vurderes. Kravet gjelder blant annet paller, plattformer, kasser, rammer, tromler, dunnage, plank og bord av råtre. Industrielt bearbeidede trebaserte materialer som kryssfiner, sponplate og fiberplate kan være unntatt, men dette må vurderes konkret.",
    ),
    textBlock("Merking og viktig lastinformasjon", "h2"),
    ...paragraphsToBlocks(
      "Merking må være tydelig, stor nok, godt festet og synlig fra siden av kolliet. Hvis emballasje brukes på nytt, skal gamle etiketter og merker fjernes.",
    ),
    {
      _type: "checklist",
      _key: key(),
      items: markingInfo,
    },
    ...paragraphsToBlocks(
      "Merkingen skal gjøre at terminal, transportør og mottaker ikke må gjette hva godset tåler, hvordan det skal løftes, om det kan stables eller om det krever spesiell beskyttelse.",
    ),
    textBlock("Internasjonale håndteringssymboler", "h2"),
    ...paragraphsToBlocks(
      "Håndteringssymboler bør følge etablerte internasjonale symboler, for eksempel ISO 780 og symboler omtalt i CTU Code. Bruk symboler når tekst alene ikke er tilstrekkelig, og sørg for at merkingen er synlig på kolliet.",
    ),
    callout(
      "Se egen symbolguide",
      "Vi har samlet symbolene og forklaringene i en egen artikkel om håndteringssymboler på gods.",
      "tip",
    ),
    linkCards(
      [
        {
          title: "Håndteringssymboler på gods",
          href: "/kjekt-a-vite/handteringssymboler",
          label: "ISO 780",
          text: "Se symbolene, betydningen og praktiske råd for merking av kolli.",
        },
      ],
      "Symbolguide",
    ),
    checklist(senderChecklist, "Sjekkliste for avsender"),
    callout(
      "Praktisk råd",
      "Dokumenter emballering og sikring med bilder. Det gjør det lettere å lære av avvik og gir bedre grunnlag ved skade, reklamasjon eller forsikringssak.",
      "tip",
    ),
    linkCards(
      [
        {
          title: "Containerpakking og stuffing",
          href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
        },
        {title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods"},
        {title: "Håndteringssymboler", href: "/kjekt-a-vite/handteringssymboler"},
      ],
      "Relaterte artikler",
    ),
  ];
}
