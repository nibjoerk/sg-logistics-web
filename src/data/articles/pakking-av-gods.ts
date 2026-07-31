import type { Article } from "../articleTypes";

export const pakkingAvGods: Article = {
  title: "Hvordan pakke gods riktig",
  slug: "pakking-av-gods",
  href: "/kjekt-a-vite/pakking-av-gods",
  category: "Pakking",
  intro:
    "Riktig emballering gjør at godset tåler lasting, omlasting, terminalhåndtering, flyfrakt, sjøtransport og levering uten skade, forsinkelse eller ekstra kontroll.",
  seoTitle: "Hvordan pakke gods riktig | SG Logistics AS",
  seoDescription:
    "Praktisk guide til pakking av gods: pall, emballasje, merking, flyfrakt, sjø/container, væsker, temperaturfølsomt gods og kontroll før henting.",
  body: [
    {
      heading: "Start med transportmåten",
      text:
        "Gods som sendes med bil, fly, sjø eller via flere terminaler blir utsatt for ulike belastninger. Emballasjen må tåle truckhåndtering, sortering, omlasting, vibrasjoner, trykk fra annet gods, fukt og normal transportbelastning.",
      items: [
        "Velg emballasje etter vekt, verdi, form, skjørhet og transportmåte.",
        "Pakk slik at godset kan håndteres sammen med annet gods uten å skade eller bli skadet.",
        "Tenk gjennom hele transportkjeden, ikke bare første henting.",
      ],
    },
    {
      heading: "Ytre emballasje og innvendig beskyttelse",
      text:
        "Ytteremballasjen skal beskytte selve varen, mens innvendig beskyttelse skal hindre at varen beveger seg inne i emballasjen. En overlastet kartong kan sprekke, mens tomrom i esken kan føre til støt- og klemskader.",
      items: [
        "Bruk solid bølgepapp, trekasse, pallekarm eller annen emballasje som er tilpasset vekt og innhold.",
        "Fyll tomrom med papir, skum, luftputer, bobleplast eller annen støtdemping.",
        "Beskytt hjørner, kanter og utsatte flater med kantbeskyttelse eller hard emballasje.",
        "Forsegl alle åpninger og skjøter med egnet pakketape, ikke svak kontor- eller maskeringstape.",
      ],
    },
    {
      heading: "Pakking på pall",
      text:
        "Pall er ofte riktig løsning når godset er tungt, består av flere kolli eller skal håndteres med truck. Pallen må være hel, stabil og egnet for godsets vekt.",
      items: [
        "Hold godset innenfor pallens ytterkant. Utstikkende gods er en vanlig skadeårsak.",
        "Legg tyngdepunktet lavt og så sentrert som mulig.",
        "Sikre godset til pallen med strekkfilm, krympeplast, bånd eller stropper.",
        "Bruk mellomlegg eller friksjonsmatter hvis godset kan gli.",
        "Hvis pallen ikke tåler at annet gods stables oppå, må den merkes og bookes som ikke-stablebar.",
      ],
    },
    {
      heading: "Merking av gods",
      text:
        "Gods som ikke er tydelig merket kan bli forsinket eller feilsortert. Merkingen må være lett synlig og tåle håndtering gjennom hele transporten.",
      items: [
        "Fest transportetiketten på en flat og synlig side av kolliet.",
        "Sørg for at avsender, mottaker, referanse og kollinummer stemmer med booking og dokumenter.",
        "Fjern eller dekk til gamle etiketter og strekkoder.",
        "Merk skjørt gods med tydelige symboler, piler for riktig side opp og eventuell informasjon om temperatur eller forsiktig håndtering.",
      ],
    },
    {
      heading: "Flyfrakt: godset må være ready for carriage",
      text:
        "Flyfrakt stiller ekstra krav fordi godset ofte skal sikkerhetskontrolleres før avgang. Emballasje som gjør kontroll vanskelig kan gi forsinkelser, åpning av kolli, ekstra kostnader eller avvisning.",
      items: [
        "Bruk tett og ubrutt ytteremballasje slik at uvedkommende ikke kan legge noe inn i forsendelsen uten synlige spor.",
        "Ved pall bør også undersiden være lukket, for eksempel med plate under pallens grunnflate.",
        "Gods med høy tetthet, mye metall, væsker eller lukket trekasse kan være vanskelig å røntgenkontrollere.",
        "Større eller tette kolli kan kreve ETD-kontroll, visuell kontroll eller inspeksjonshull.",
        "Vurder flere mindre kolli fremfor én stor pall hvis ulike godstyper og tettheter gjør sikkerhetskontroll vanskelig.",
      ],
    },
    {
      heading: "Størrelse, vekt og volumvekt ved flyfrakt",
      text:
        "Flyfrakt begrenses av flytype, rute, lasterom og sikkerhetskontroll. Det er derfor viktig å avklare mål og vekt før booking, spesielt ved store kolli, lange varer eller tungt gods.",
      items: [
        "Oppgi alltid nøyaktig lengde, bredde, høyde og bruttovekt per kolli.",
        "Prisen beregnes ofte etter faktisk vekt eller volumvekt, avhengig av hva som er høyest.",
        "Innenriks flyfrakt kan ha strengere kollimål enn internasjonal cargo, avhengig av flytype og rute.",
        "Store, tunge eller uvanlig formede kolli bør avklares med speditør før de leveres til terminal.",
      ],
    },
    {
      heading: "Væsker, lekkasje og temperatur",
      text:
        "Væsker og temperaturfølsomt gods krever ekstra planlegging. Dårlig pakket flytende gods kan skade annet gods og utstyr, og avsender kan bli ansvarlig for følgeskader.",
      items: [
        "Bruk emballasje som er egnet for væske og tåler normal transporthåndtering.",
        "Legg inn absorberende materiale der lekkasje kan oppstå.",
        "Sikre lokk, korker og beholdere slik at de ikke åpner seg ved vibrasjon eller trykkendringer.",
        "Kuldesensitivt gods bør beskyttes med thermohette, isolasjon eller temperaturregulert transport når dette er nødvendig.",
      ],
    },
    {
      heading: "Sjøfrakt og container: tenk sikring",
      text:
        "Gods som skal med sjø eller i container må tåle lengre transporttid, bevegelser, fukt, omlasting og løft. Containeren bør kontrolleres før lasting, og godset må sikres slik at det ikke kan forskyve seg.",
      items: [
        "Kontroller at container eller lasteenhet er ren, tørr, hel og egnet før lasting.",
        "Fordel vekten jevnt og unngå tung last høyt oppe eller bare i én ende.",
        "Sikre godset mot glidning, tipping og forskyvning med stengning, surring, kiler, luftputer eller annet egnet utstyr.",
        "Fjern løse deler, avkapp, emballasjerester og annet som kan bli liggende som fremmedlegemer.",
        "Pass på at gods ikke stikker ut eller kan hekte seg fast i løfteutstyr, dører, tak eller annet gods.",
      ],
      links: [
        {
          href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
          label: "Les mer om containerpakking og stuffing",
        },
      ],
    },
    {
      heading: "Seaworthy packing: når vanlig emballasje ikke er nok",
      text:
        "Ved sjøtransport kan godset utsettes for fukt, salt luft, kondens, temperatursvingninger, lang transporttid og røff håndtering. Seaworthy packing betyr at emballasjen er valgt og bygget for disse belastningene, enten godset sendes som FCL, LCL eller annen sjøfrakt.",
      items: [
        "Bruk robuste ytre materialer, for eksempel trekasser, kraftig kartong, kompositt eller spesialkasser.",
        "Beskytt mot fukt og korrosjon med plastliner, barrierefolie, tørremiddel eller korrosjonsbeskyttelse der det trengs.",
        "Sørg for innvendig avstiving, skum, bracing eller blokkering slik at varen ikke beveger seg.",
        "Bruk kraftig lukking, stropping og forsegling som tåler lang transport og omlasting.",
        "Ved treemballasje må krav som ISPM 15 vurderes ved eksport.",
      ],
      links: [
        {
          href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
          label: "Les mer om containerpakking og seaworthy packing",
        },
      ],
    },
    {
      heading: "Farlig gods må pakkes etter eget regelverk",
      text:
        "Hvis varen er farlig gods, holder det ikke med vanlig god emballasje. Avsender må sikre korrekt klassifisering, godkjent emballasje, merking, dokumentasjon og eventuelle begrensninger for transportmåten.",
      items: [
        "Kontroller sikkerhetsdatabladets punkt 14 før booking.",
        "Bruk korrekt UN-nummer, fareseddel, emballeringsgruppe og godsbetegnelse der dette kreves.",
        "Avklar om varen kan sendes med bil, sjø eller fly før den pakkes og leveres.",
        "Ikke book farlig gods som ordinært gods.",
      ],
      links: [
        {
          href: "/kjekt-a-vite/farlig-gods",
          label: "Les mer om farlig gods",
        },
      ],
    },
    {
      heading: "Sjekkliste før henting",
      text:
        "En enkel kontroll før sjåføren kommer reduserer risikoen for skade, stopp på terminal og ekstra kostnader.",
      items: [
        "Er emballasjen hel, lukket og tilpasset godsets vekt og form?",
        "Er tomrom fylt, og er varen beskyttet mot støt, trykk, fukt og temperatur?",
        "Er pall stabil, innenfor pallkant og sikret mot forskyvning?",
        "Er alle kolli tydelig merket med riktig mottaker, referanse og kollinummer?",
        "Er mål, vekt og antall kolli likt i booking, fraktbrev og pakkliste?",
        "Er det avklart om godset er farlig gods, flyrestriksjon, ikke-stablebart eller temperaturfølsomt?",
      ],
    },
  ],
};
