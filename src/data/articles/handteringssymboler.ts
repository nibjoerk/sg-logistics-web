import type {Article} from "../articleTypes";

const symbols = [
  {
    number: "1",
    title: "Centre of gravity",
    norwegian: "Tyngdepunkt",
    src: "/images/articles/iso780/centre-of-gravity.png",
    meaning: "Viser hvor tyngdepunktet ligger på et kolli som håndteres som én enhet.",
    use: "Særlig viktig på tungt eller ustabilt gods. Bør plasseres slik at løftepersonell kan se hvor lasten balanserer før løft.",
  },
  {
    number: "2",
    title: "Sling here",
    norwegian: "Løft her",
    src: "/images/articles/iso780/sling-here.png",
    meaning: "Viser hvor løftestropper skal plasseres.",
    use: "Brukes på tunge kolli som skal løftes med kran eller stropper. Symbolene bør stå på to motstående sider og vise sikre løftepunkter.",
  },
  {
    number: "3",
    title: "Fragile, handle with care",
    norwegian: "Skjørt gods",
    src: "/images/articles/iso780/fragile-handle-with-care.png",
    meaning: "Innholdet er skjørt og må håndteres forsiktig.",
    use: "Bør bare brukes når innholdet faktisk trenger ekstra varsom håndtering utover vanlig emballasjebeskyttelse.",
  },
  {
    number: "4",
    title: "Use no hand hooks",
    norwegian: "Bruk ikke kroker",
    src: "/images/articles/iso780/use-no-hooks.png",
    meaning: "Håndkroker skal ikke brukes ved håndtering.",
    use: "Aktuelt for sekker, baller, tekstiler, kartonger eller annen emballasje som kan punkteres eller rives av kroker.",
  },
  {
    number: "5",
    title: "Do not use hand truck here",
    norwegian: "Ikke bruk sekketralle her",
    src: "/images/articles/iso780/do-not-use-hand-truck-here.png",
    meaning: "Håndtruck eller sekketralle skal ikke settes mot denne siden.",
    use: "Brukes når én side av kolliet ikke tåler punktbelastning, vipping eller trykk fra håndtruck.",
  },
  {
    number: "6",
    title: "Use no forks",
    norwegian: "Bruk ikke gafler",
    src: "/images/articles/iso780/use-no-forks.png",
    meaning: "Kolliet skal ikke håndteres eller flyttes med gaffeltruck eller annet gaffelutstyr.",
    use: "Aktuelt når gafler kan skade emballasjen, punktere produktet eller gi feil løftepunkt. Bruk alternativ løftemetode.",
  },
  {
    number: "7",
    title: "Do not clamp as indicated",
    norwegian: "Ikke klem her",
    src: "/images/articles/iso780/do-not-clamp-as-indicated.png",
    meaning: "Kolliet skal ikke gripes med klemmer på den angitte siden.",
    use: "Aktuelt for gods som kan skades av klemtruck eller sidepress på bestemte flater.",
  },
  {
    number: "8",
    title: "Clamp as indicated",
    norwegian: "Klem her",
    src: "/images/articles/iso780/clamp-as-indicated.png",
    meaning: "Klemmer skal plasseres på angitte sider ved bruk av klemtruck.",
    use: "Bør bare brukes på emballasje som er konstruert for klemhåndtering. Symbolet skal hjelpe føreren å gripe på riktig sted.",
  },
  {
    number: "9",
    title: "Do not roll",
    norwegian: "Må ikke rulles",
    src: "/images/articles/iso780/do-not-roll.png",
    meaning: "Kolliet skal ikke rulles eller vendes rundt.",
    use: "Viktig for varer som må stå stabilt, har væsker, skjeve tyngdepunkt eller innvendige komponenter som kan skades.",
  },
  {
    number: "10",
    title: "Keep away from rain",
    norwegian: "Holdes tørt",
    src: "/images/articles/iso780/keep-away-from-rain.png",
    meaning: "Kolliet skal holdes unna regn og lagres/transporteres tørt.",
    use: "Brukes på fuktfølsomt gods, papir, elektronikk, tekstiler, emballasje som svekkes av vann eller gods med korrosjonsrisiko.",
  },
  {
    number: "11",
    title: "Keep away from sunlight",
    norwegian: "Beskyttes mot sollys",
    src: "/images/articles/iso780/keep-away-from-sunlight.png",
    meaning: "Kolliet skal ikke utsettes for direkte sollys.",
    use: "Aktuelt for varer eller emballasje som kan skades av UV-lys, varmeoppbygging eller direkte sol.",
  },
  {
    number: "12",
    title: "Protect from radioactive sources",
    norwegian: "Beskyttes mot radioaktive kilder",
    src: "/images/articles/iso780/protect-from-radioactive-sources.png",
    meaning: "Innholdet kan skades eller bli ubrukelig av ioniserende stråling.",
    use: "Relevant for spesielt sensitivt gods der stråling kan påvirke innholdets egenskaper.",
  },
  {
    number: "13",
    title: "This way up",
    norwegian: "Denne siden opp",
    src: "/images/articles/iso780/this-way-up.png",
    meaning: "Viser korrekt oppreist posisjon under transport og lagring.",
    use: "Bør plasseres nær øvre hjørner på stående sider. Ved enhetslast må symbolene fortsatt være synlige etter samlasting.",
  },
  {
    number: "14",
    title: "Temperature limits",
    norwegian: "Temperaturgrenser",
    src: "/images/articles/iso780/temperature-limit.png",
    meaning: "Kolliet skal lagres, transporteres og håndteres innenfor angitte temperaturgrenser.",
    use: "Brukes bare når godset faktisk krever temperaturkontroll. Temperaturverdier må fylles inn tydelig.",
  },
  {
    number: "15",
    title: "Stacking limit by mass",
    norwegian: "Stablingsgrense etter vekt",
    src: "/images/articles/iso780/stacking-limit-by-mass.png",
    meaning: "Viser maksimal vekt som kan stables oppå nederste kolli.",
    use: "Brukes for å hindre klemskader og for å gjøre terminal- og lagerhåndtering sikrere.",
  },
  {
    number: "16",
    title: "Stacking limit by number",
    norwegian: "Stablingsgrense etter antall",
    src: "/images/articles/iso780/stacking-limit-by-number.png",
    meaning: "Viser maksimalt antall like kolli som kan stables oppå nederste kolli.",
    use: "Tallet gjelder antall kolli oppå nederste kolli, ikke inkludert kolliet nederst.",
  },
  {
    number: "17",
    title: "Do not stack",
    norwegian: "Må ikke stables",
    src: "/images/articles/iso780/do-not-stack.png",
    meaning: "Kolliet skal ikke stables, og ingen last skal plasseres oppå kolliet.",
    use: "Brukes når innhold, emballasje eller form ikke tåler last ovenfra. Bør kombineres med tydelig bookinginformasjon om ikke-stablebart gods.",
  },
] as const;

/** Full article content shared by Astro seed enrichment and the s-* mirror overlay. */
export const handteringssymboler: Article = {
  title: "Håndteringssymboler på gods",
  slug: "handteringssymboler",
  href: "/kjekt-a-vite/handteringssymboler",
  category: "Pakking",
  layout: "guide",
  intro:
    "Håndteringssymboler gjør at viktige instruksjoner kan forstås på tvers av språk, transportmåter og terminaler. De er relevante for bilfrakt, sjøfrakt, flyfrakt og lagring.",
  seoTitle: "Håndteringssymboler på gods | SG Logistics AS",
  seoDescription:
    "Guide til ISO 780-symboler på emballasje: hva symbolene betyr, når de bør brukes, og hvordan de bør plasseres på kolli.",
  body: [
    {
      _type: "callout",
      tone: "info",
      label: "Kort sagt",
      html: "<p>Symbolene skal fortelle hvordan kolliet skal håndteres og lagres. De er et supplement til god emballasje, ikke en erstatning for riktig pakking.</p>",
    },
    {
      heading: "Hva er ISO 780?",
      text:
        "ISO 780 beskriver grafiske symboler for håndtering og lagring av distribusjonspakker. Formålet er at avsenders instruksjoner skal kunne forstås selv når godset går gjennom land, terminaler og aktører med ulike språk.\n\nStandarden gjelder generelle transport- og lagringssymboler for emballerte kolli. Den dekker ikke spesifikke regler for farlig gods. Farlig gods må merkes etter egne regelverk i tillegg.",
    },
    {
      _type: "infoCards",
      columns: 2,
      cards: [
        {
          title: "Brukes når det er nødvendig",
          text:
            "ISO 780-symboler skal formidle viktige håndteringsinstruksjoner, men pakken bør ikke dekkes med unødvendige symboler. For mange merker kan gjøre budskapet uklart.",
        },
        {
          title: "Symboler erstatter ikke god emballasje",
          text:
            "Et symbol gir informasjon til den som håndterer godset, men det garanterer ikke riktig behandling. Emballasje, innvendig beskyttelse og sikring må fortsatt tåle normal transport.",
        },
        {
          title: "Symbolene må være synlige",
          text:
            "Merkingen må plasseres der terminal, sjåfør, truckfører eller mottaker faktisk ser den før godset løftes, flyttes, stables eller lagres.",
        },
        {
          title: "Unngå forveksling med farlig gods",
          text:
            "ISO 780-symboler bør normalt være svarte. Unngå rød, oransje og gul bruk som kan forveksles med faresedler eller annen merking av farlig gods.",
        },
      ],
    },
    {
      heading: "Slik bør symbolene brukes",
      text: "Følg disse praktiske reglene for merking av kolli:",
    },
    {
      _type: "checklist",
      items: [
        "Bruk tydelige trykte, malte eller stensilerte symboler, eventuelt etiketter som sitter godt gjennom hele transporten.",
        "Bruk kontrastbakgrunn, helst hvit, dersom sort symbol ikke synes godt på emballasjen.",
        "Vanlige symbolhøyder er 100, 150 eller 200 mm, men størrelsen må tilpasses kolliets størrelse og synlighet.",
        "Plasser symbolene på sidene der de gir praktisk mening. Noen symboler bør stå på flere sider.",
        "Fjern gamle symboler og etiketter når emballasje brukes om igjen.",
        "Håndskrevne forbudstegn kan være akseptabelt i enkelte situasjoner, men bør bare brukes når budskapet fortsatt blir tydelig.",
      ],
    },
    {
      _type: "symbolGallery",
      heading: "Symboloversikt",
      intro: "Under finner du ISO 780-symbolene med praktisk forklaring fra et avsenderperspektiv.",
      items: symbols.map((symbol) => ({
        title: symbol.norwegian,
        subtitle: `ISO 780 nr. ${symbol.number} · ${symbol.title}`,
        meaning: symbol.meaning,
        use: symbol.use,
        image: {
          src: symbol.src,
          alt: `${symbol.title} håndteringssymbol`,
        },
      })),
    },
    {
      _type: "checklist",
      heading: "Sjekkliste før godset sendes",
      items: [
        "Er symbolene nødvendige, og gir de konkret verdi for håndteringen?",
        "Er symbolene store nok, synlige og plassert på riktig side av kolliet?",
        "Er kolliet pakket slik at det tåler normal håndtering selv om symbolet ikke blir fulgt perfekt?",
        "Er gamle etiketter og symboler fjernet?",
        "Er farlig gods merket etter eget regelverk, ikke bare med ISO 780-symboler?",
      ],
    },
    {
      _type: "linkCards",
      heading: "Relaterte artikler",
      cards: [
        {title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods"},
        {title: "Seaworthy packing", href: "/kjekt-a-vite/sjofrakt/seaworthy-packing"},
        {
          title: "Containerpakking og stuffing",
          href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
        },
      ],
    },
  ],
};

/** Sanity mirror used on /kjekt-a-vite/s-handteringssymboler during migration review. */
export const handteringssymbolerMirror: Article = {
  ...handteringssymboler,
  title: `# ${handteringssymboler.title}`,
  slug: "s-handteringssymboler",
  href: "/kjekt-a-vite/s-handteringssymboler",
  seoTitle: `# ${handteringssymboler.seoTitle}`,
};
