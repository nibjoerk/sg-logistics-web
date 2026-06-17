import roadImage from "../assets/images/hero-road.jpg";
import airImage from "../assets/images/MEDIAMAKT3L3A4254.jpg";
import seaImage from "../assets/images/Subsea7-025.jpg";
import projectImage from "../assets/images/38-Loading-sequence-1.jpg";
import warehouseImage from "../assets/images/MEDIAMAKT3L3A4305.jpg";
import valueAddedImage from "../assets/images/globus 1.jpg";

export const servicePages = {
  bilfrakt: {
    title: "Bilfrakt",
    slug: "bilfrakt",
    path: "/tjenester/bilfrakt",
    eyebrow: "Tjenester",
    seoTitle: "Bilfrakt | SG Logistics AS",
    seoDescription:
      "Fleksible bilfraktløsninger for stykkgods, partigods, fullast, ekspress og spesialtransport.",
    intro:
      "Fleksible bilfraktløsninger for stykkgods, partigods, fullast, ekspress og spesialtransport.",
    image: roadImage,
    imageAlt: "Lastebil på vei",
    lead:
      "SG Logistics hjelper bedrifter med effektive og trygge bilfraktløsninger i Norge, Norden og Europa.",
    body: [
      "Vi håndterer alt fra mindre sendinger til større partier og komplette fullastløsninger. Gjennom tett oppfølging og et sterkt transportnettverk finner vi riktig løsning for hvert oppdrag.",
      "Våre medarbeidere følger transporten gjennom hele prosessen og sørger for god kommunikasjon fra booking til levering.",
    ],
    highlights: ["Stykkgods", "Partigods", "Fullast", "Ekspress", "Spesialtransport"],
  },

  flyfrakt: {
    title: "Flyfrakt",
    slug: "flyfrakt",
    path: "/tjenester/flyfrakt",
    eyebrow: "Tjenester",
    seoTitle: "Flyfrakt | SG Logistics AS",
    seoDescription:
      "Raske globale flyfraktløsninger når tid, presisjon og oppfølging er avgjørende.",
    intro:
      "Raske globale flyfraktløsninger når tid, presisjon og oppfølging er avgjørende.",
    image: airImage,
    imageAlt: "Flyfrakt og logistikk",
    lead:
      "Når varene må raskt frem, hjelper vi deg med flyfraktløsninger tilpasset tid, kostnad og leveringsbehov.",
    body: [
      "Vi tilbyr flyfrakt gjennom et internasjonalt nettverk av samarbeidspartnere og følger opp sendingen fra booking til levering.",
      "Flyfrakt passer godt for hasteforsendelser, reservedeler, prøver og varer med høy verdi eller korte tidsfrister.",
    ],
    highlights: ["Hastefrakt", "Global dekning", "Import", "Eksport", "Dør-til-dør"],
  },

  sjofrakt: {
    title: "Sjøfrakt",
    slug: "sjofrakt",
    path: "/tjenester/sjofrakt",
    eyebrow: "Tjenester",
    seoTitle: "Sjøfrakt | SG Logistics AS",
    seoDescription:
      "Kostnadseffektive sjøfraktløsninger for import og eksport over hele verden.",
    intro:
      "Kostnadseffektive sjøfraktløsninger for import og eksport over hele verden.",
    image: seaImage,
    imageAlt: "Sjøfrakt og prosjektlast",
    lead:
      "Sjøfrakt er ofte den beste løsningen for større volumer, internasjonal handel og transport der kostnadseffektivitet er viktig.",
    body: [
      "SG Logistics tilbyr både FCL, LCL og spesialløsninger for sjøfrakt. Vi hjelper med dokumenter, koordinering og oppfølging gjennom hele transportkjeden.",
      "Med erfaring fra internasjonal logistikk sørger vi for ryddig håndtering av sendinger fra avsender til mottaker.",
    ],
    highlights: ["FCL", "LCL", "Break-bulk", "Import", "Eksport"],
  },

  prosjekt: {
    title: "Prosjekt",
    slug: "prosjekt",
    path: "/tjenester/prosjekt",
    eyebrow: "Tjenester",
    seoTitle: "Prosjektlogistikk | SG Logistics AS",
    seoDescription:
      "Planlegging og gjennomføring av krevende transportprosjekter og spesiallast.",
    intro:
      "Planlegging og gjennomføring av krevende transportprosjekter og spesiallast.",
    image: projectImage,
    imageAlt: "Prosjektlast og tung logistikk",
    lead:
      "Prosjektlogistikk krever erfaring, planlegging og tett koordinering mellom alle involverte parter.",
    body: [
      "Vi bistår med planlegging, transportopplegg, dokumentasjon og gjennomføring av krevende transportoppdrag.",
      "Dette kan omfatte spesiallast, ukurante kolli, offshore-relatert last og prosjekter der standard transportløsninger ikke er tilstrekkelige.",
    ],
    highlights: ["Spesiallast", "Prosjektstyring", "Tung last", "Koordinering", "Dokumentasjon"],
  },

  "terminal-lager": {
    title: "Terminal / Lager",
    slug: "terminal-lager",
    path: "/tjenester/terminal-lager",
    eyebrow: "Tjenester",
    seoTitle: "Terminal og lager | SG Logistics AS",
    seoDescription:
      "Terminal- og lagertjenester som gir bedre kontroll på vareflyten.",
    intro:
      "Terminal- og lagertjenester som gir bedre kontroll på vareflyten.",
    image: warehouseImage,
    imageAlt: "Terminal og lager",
    lead:
      "Vi tilbyr praktiske terminal- og lagertjenester for kunder som trenger fleksibel håndtering av varer.",
    body: [
      "Tjenestene kan omfatte lagring, omlasting, merking, ompakking, containerhåndtering og distribusjon.",
      "Dette gir kundene en mer helhetlig logistikkflyt og bedre kontroll gjennom hele verdikjeden.",
    ],
    highlights: ["Lagring", "Omlasting", "Merking", "Ompakking", "Distribusjon"],
  },

  "verdiokende-tjenester": {
    title: "Verdiøkende tjenester",
    slug: "verdiokende-tjenester",
    path: "/tjenester/verdiokende-tjenester",
    eyebrow: "Tjenester",
    seoTitle: "Verdiøkende tjenester | SG Logistics AS",
    seoDescription:
      "Fortolling, dokumenthåndtering, forsikring og logistikkrådgivning.",
    intro:
      "Tjenester som forenkler logistikkhverdagen og gir bedre kontroll.",
    image: valueAddedImage,
    imageAlt: "Global logistikk og dokumenthåndtering",
    lead:
      "Transport handler ikke bare om å flytte varer. Dokumenter, toll, forsikring og rådgivning er ofte like viktig.",
    body: [
      "SG Logistics bistår med verdiøkende tjenester som fortolling, dokumenthåndtering, forsikring og praktisk logistikkrådgivning.",
      "Målet er å gjøre transportprosessen enklere, tryggere og mer oversiktlig for kunden.",
    ],
    highlights: ["Fortolling", "Dokumenter", "Forsikring", "Rådgivning", "Oppfølging"],
  },
} as const;

export type ServicePageKey = keyof typeof servicePages;
export type ServicePage = (typeof servicePages)[ServicePageKey];

export function getServicePageBySlug(slug: string) {
  return Object.values(servicePages).find((service) => service.slug === slug);
}
