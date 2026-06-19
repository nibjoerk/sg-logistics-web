import bilfraktImage from "../assets/images/Bilfrakt.png";
import flyfraktImage from "../assets/images/Flyfrakt.png";
import sjofraktImage from "../assets/images/Sjøfrakt.png";
import prosjektImage from "../assets/images/Prosjekt.png";
import terminalImage from "../assets/images/Terminal.png";
import verdiokendeImage from "../assets/images/verdiokende.png";

export const servicePages = [
  {
    title: "Bilfrakt",
    slug: "bilfrakt",
    path: "/tjenester/bilfrakt",
    eyebrow: "Veitransport",
    image: bilfraktImage,
    imageAlt: "SG Logistics bilfrakt på vei i norsk fjordlandskap",
    ingress: "Fleksibel veitransport for små og store sendinger i Norge og Europa.",
    cardText:
      "Dør-til-dør-løsninger for stykkgods, partigods, fullast, ekspress og spesialtransport.",
    lead:
      "SG Logistics hjelper bedrifter med veitransport som krever forutsigbarhet, tett oppfølging og praktiske løsninger.",
    seoTitle: "Bilfrakt og veitransport | SG Logistics AS",
    seoDescription:
      "Bilfrakt og veitransport i Norge og Europa: stykkgods, partigods, fullast, LTL, ekspress, import, eksport og fortolling.",
    facts: ["Stykkgods", "Partigods", "Fullast", "Ekspress"],
    infoTitle: "Typiske ledetider",
    infoItems: [
      { label: "Norge", value: "1–3 dager" },
      { label: "Europa", value: "3–7 dager" },
      { label: "Ekspress", value: "Etter avtale" },
    ],
    sections: [
      {
        icon: "🚛",
        title: "Veitransport i Norge og Europa",
        body:
          "Vi organiserer bilfrakt for små og store forsendelser, både nasjonalt og internasjonalt. Løsningen tilpasses volum, tidskrav, varetype, mottaker og krav til dokumentasjon.",
      },
      {
        icon: "📦",
        title: "Stykkgods, partigods og fullast",
        body:
          "Vi håndterer alt fra mindre kolli og paller til fullast og direktebil. Målet er å finne riktig balanse mellom pris, fremføringstid, risiko og ønsket servicenivå.",
      },
      {
        icon: "🛣️",
        title: "LTL og samlast",
        body:
          "LTL, eller samlast, betyr at sendingen deler bilkapasitet med annet gods. Dette gir ofte lavere pris, men krever mer planlegging enn direktebil.",
      },
      {
        icon: "🧾",
        title: "Import, eksport og fortolling",
        body:
          "Ved grensekryssende transport hjelper vi med dokumentasjon, koordinering og fortolling, slik at sendingen kommer videre uten unødvendige stopp.",
      },
    ],
    highlights: [
      "Stykkgods og partigods",
      "Fullast og direktebil",
      "LTL og samlast",
      "Ekspress og tidskritiske sendinger",
      "Import og eksport",
      "Fortolling og dokumentasjon",
    ],
    relatedArticles: ["ledetider-ltl", "cmr", "pakking-av-gods", "incoterms-2020"],
  },
  {
    title: "Flyfrakt",
    slug: "flyfrakt",
    path: "/tjenester/flyfrakt",
    eyebrow: "Tidskritisk logistikk",
    image: flyfraktImage,
    imageAlt: "Flyfrakt med SG Logistics cargo ved fly",
    ingress: "Rask global transport når leveringstid og presisjon er avgjørende.",
    cardText:
      "Flyfrakt, ekspress og UPS-løsninger med tett oppfølging fra booking til levering.",
    lead:
      "Flyfrakt er løsningen når fremføringstid er viktigere enn transportkostnad. Vi finner riktig balanse mellom hastighet, pris, sikkerhetskrav og pålitelighet.",
    seoTitle: "Flyfrakt | SG Logistics AS",
    seoDescription:
      "Flyfrakt, ekspress, UPS, farlig gods, kjent avsender og tidskritisk transport globalt.",
    facts: ["IATA", "UPS", "Express", "Dør-til-dør"],
    infoTitle: "Typisk levering",
    infoItems: [
      { label: "Europa", value: "1–2 dager" },
      { label: "Globalt", value: "2–5 dager" },
      { label: "Express", value: "Etter avtale" },
    ],
    sections: [
      {
        icon: "✈️",
        title: "Når tiden er avgjørende",
        body:
          "Vi hjelper med flyfrakt for hasteforsendelser, reservedeler, prøver, dokumenter og varer med stramme tidsfrister.",
      },
      {
        icon: "🌍",
        title: "Global rekkevidde",
        body:
          "Gjennom vårt nettverk kan vi koordinere flyfrakt til og fra de fleste markeder, med oppfølging av booking, dokumentasjon, sikkerhetskrav og levering.",
      },
      {
        icon: "⚠️",
        title: "Farlig gods med fly",
        body:
          "Farlig gods på fly krever korrekt klassifisering, godkjent emballasje, merking, dokumentasjon og håndtering etter gjeldende IATA-regelverk.",
      },
      {
        icon: "📐",
        title: "Pakking og volumvekt",
        body:
          "Flyfrakt må pakkes kompakt, sikkert og tydelig merket. Riktig emballering reduserer skade, forsinkelser og uventede kostnader knyttet til volumvekt.",
      },
    ],
    highlights: [
      "Tidskritiske forsendelser",
      "Import og eksport",
      "Ekspress og UPS",
      "Farlig gods etter IATA",
      "Dør-til-dør-levering",
      "Dokumentasjon og toll",
    ],
    relatedArticles: ["kjent-avsender", "farlig-gods-flyfrakt", "pakke-flyfrakt", "volumvekt"],
  },
  {
    title: "Sjøfrakt",
    slug: "sjofrakt",
    path: "/tjenester/sjofrakt",
    eyebrow: "Global sjøtransport",
    image: sjofraktImage,
    imageAlt: "SG Logistics sjøfrakt med container, lastebil og containerskip",
    ingress: "Kostnadseffektive løsninger for større volum og internasjonal vareflyt.",
    cardText:
      "FCL, LCL, break-bulk og løsninger for import, eksport, container og spesiallast.",
    lead:
      "Sjøfrakt passer godt for større volum, lavere fraktkostnader og internasjonale varestrømmer der planlegging gir stor effekt.",
    seoTitle: "Sjøfrakt | SG Logistics AS",
    seoDescription:
      "Sjøfrakt globalt: FCL, LCL, break-bulk, OOG, container, import, eksport og dokumenthåndtering.",
    facts: ["FCL", "LCL", "Break Bulk", "Container"],
    infoTitle: "Typiske løsninger",
    infoItems: [
      { label: "FCL", value: "Full container" },
      { label: "LCL", value: "Samlast" },
      { label: "40HC", value: "Ekstra høyde" },
    ],
    sections: [
      {
        icon: "🚢",
        title: "FCL, LCL og spesiallast",
        body:
          "Vi tilbyr både fulle containere, samlast og løsninger for gods som ikke passer standard transportoppsett.",
      },
      {
        icon: "📏",
        title: "Containerstørrelser",
        body:
          "De vanligste containerne er 20' standard, 40' standard og 40' high cube. Riktig container velges basert på volum, vekt, godstype og krav til lasting.",
      },
      {
        icon: "🔒",
        title: "Stuffing og sikring",
        body:
          "God stuffing handler om vektfordeling, sikring, utnyttelse av volum og beskyttelse av godset. Feil lasting kan gi skade, ekstra kostnader eller forsinkelser.",
      },
      {
        icon: "🧾",
        title: "Import og eksport",
        body:
          "Vi koordinerer sjøfrakt fra leverandør til mottaker, inkludert dokumentasjon, booking, fortolling og videre distribusjon.",
      },
    ],
    highlights: [
      "FCL – full container",
      "LCL – samlast",
      "20', 40' og 40' HC containere",
      "Break-bulk og OOG",
      "Stuffing og sikring",
      "Videre distribusjon",
    ],
    relatedArticles: ["containerstorrelser", "stuffing-av-container", "vgm", "bill-of-lading"],
  },
  {
    title: "Prosjekt",
    slug: "prosjekt",
    path: "/tjenester/prosjekt",
    eyebrow: "Kompleks logistikk",
    image: prosjektImage,
    imageAlt: "SG Logistics prosjekttransport med tung last og kran",
    ingress: "Planlegging og gjennomføring når transporten krever ekstra kontroll.",
    cardText:
      "Prosjektlogistikk, spesialtransport, charter, ruteplanlegging og praktisk oppfølging.",
    lead:
      "Prosjektlogistikk krever planlegging, koordinering og tett oppfølging. Vi hjelper med transportoppdrag som ikke passer inn i standard maler.",
    seoTitle: "Prosjektlogistikk | SG Logistics AS",
    seoDescription:
      "Prosjektlogistikk, spesialtransport, charter, ruteplanlegging, løyver og koordinering.",
    facts: ["Heavy Lift", "Charter", "OOG", "Prosjektledelse"],
    infoTitle: "Typiske oppdrag",
    infoItems: [
      { label: "Spesiallast", value: "OOG / tungt gods" },
      { label: "Planlegging", value: "Rute og løyver" },
      { label: "Koordinering", value: "Fra A til Å" },
    ],
    sections: [
      {
        icon: "🏗️",
        title: "Skreddersydde transportopplegg",
        body:
          "Vi planlegger transportløsninger basert på varetype, dimensjoner, tidsplan, løfter, rutevalg og krav til gjennomføring.",
      },
      {
        icon: "🧭",
        title: "Koordinering fra start til slutt",
        body:
          "Prosjektoppdrag krever tydelig ansvar og god kommunikasjon. Vi følger opp involverte parter gjennom hele prosessen.",
      },
      {
        icon: "🚚",
        title: "Spesialtransport og charter",
        body:
          "Ved behov organiserer vi spesialtransport, charterløsninger, løyver, følgebil og annen praktisk tilrettelegging.",
      },
    ],
    highlights: [
      "Ruteplanlegging",
      "Spesialtransport",
      "Charter",
      "Løyver og dokumentasjon",
      "Koordinering av leverandører",
      "Tett prosjektoppfølging",
    ],
    relatedArticles: ["flatrack", "open-top-container", "pakking-av-gods", "incoterms-2020"],
  },
  {
    title: "Terminal / Lager",
    slug: "terminal-lager",
    path: "/tjenester/terminal-lager",
    eyebrow: "Terminal og lager",
    image: terminalImage,
    imageAlt: "Terminal og lager med truck og pallereoler",
    ingress: "Praktisk håndtering når gods skal lagres, merkes, pakkes om eller distribueres.",
    cardText:
      "Lagring, merking, ompakking, sikring av last, containerhåndtering og distribusjon.",
    lead:
      "Terminal- og lagertjenester gir fleksibilitet når gods må mellomlagres, kontrolleres, merkes, pakkes om eller klargjøres for videre transport.",
    seoTitle: "Terminal og lager | SG Logistics AS",
    seoDescription:
      "Terminal- og lagertjenester: lagring, merking, ompakking, lastsikring, containerhåndtering og distribusjon.",
    facts: ["Lager", "Ompakking", "Merking", "Distribusjon"],
    infoTitle: "Praktiske tjenester",
    infoItems: [
      { label: "Lagring", value: "Kort og lang tid" },
      { label: "Ompakking", value: "Etter behov" },
      { label: "Distribusjon", value: "Videre utkjøring" },
    ],
    sections: [
      {
        icon: "🏬",
        title: "Praktisk godshåndtering",
        body:
          "Vi bistår med terminaltjenester når gods skal håndteres, kontrolleres, omlastes eller klargjøres for videre transport.",
      },
      {
        icon: "📦",
        title: "Lagring og distribusjon",
        body:
          "Ved behov kan gods mellomlagres og distribueres videre etter kundens plan og mottakerens behov.",
      },
      {
        icon: "🏷️",
        title: "Merking, ompakking og sikring",
        body:
          "Vi kan hjelpe med merking, ompakking, lastsikring og andre praktiske tjenester som gjør transporten enklere.",
      },
    ],
    highlights: [
      "Lagring",
      "Merking",
      "Ompakking",
      "Lastsikring",
      "Containerhåndtering",
      "Distribusjon",
    ],
    relatedArticles: ["pakking-av-gods", "stuffing-av-container", "pallestorrelser", "volumvekt"],
  },
  {
    title: "Verdiøkende tjenester",
    slug: "verdiokende-tjenester",
    path: "/tjenester/verdiokende-tjenester",
    eyebrow: "Mer enn transport",
    image: verdiokendeImage,
    imageAlt: "Fortolling, dokumenthåndtering og logistikkrådgivning",
    ingress: "Tjenestene rundt transporten som får helheten til å fungere.",
    cardText:
      "Fortolling, dokumenthåndtering, transportforsikring, konsolidering og rådgivning.",
    lead:
      "Gode logistikkløsninger handler ofte om mer enn selve transporten. Vi hjelper med tjenestene rundt som får helheten til å fungere.",
    seoTitle: "Verdiøkende tjenester | SG Logistics AS",
    seoDescription:
      "Fortolling, dokumenthåndtering, transportforsikring, konsolidering og logistikkrådgivning.",
    facts: ["Fortolling", "Forsikring", "Dokumentasjon", "Rådgivning"],
    infoTitle: "Støttetjenester",
    infoItems: [
      { label: "Toll", value: "Import / eksport" },
      { label: "Dokumenter", value: "Kontroll og flyt" },
      { label: "Rådgivning", value: "Bedre løsninger" },
    ],
    sections: [
      {
        icon: "🧾",
        title: "Fortolling og dokumentasjon",
        body:
          "Vi hjelper med dokumenter, tollbehandling og praktisk håndtering av import og eksport.",
      },
      {
        icon: "🛡️",
        title: "Forsikring og risikoreduksjon",
        body:
          "Ved behov kan vi bistå med transportforsikring og rådgivning rundt ansvar, vilkår og dokumentasjon.",
      },
      {
        icon: "📊",
        title: "Konsolidering og rådgivning",
        body:
          "Vi ser helheten i vareflyten og kan bidra med konsolidering, forbedringer og mer effektive transportopplegg.",
      },
    ],
    highlights: [
      "Fortolling",
      "Dokumenthåndtering",
      "Transportforsikring",
      "Konsolidering",
      "EU VAT og rådgivning",
      "Logistikkforbedringer",
    ],
    relatedArticles: ["fortolling", "incoterms-2020", "eori", "eur1"],
  },
] as const;

export type ServicePage = (typeof servicePages)[number];

export const getServiceBySlug = (slug: string) =>
  servicePages.find((service) => service.slug === slug);
