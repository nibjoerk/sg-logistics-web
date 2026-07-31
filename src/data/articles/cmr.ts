import type { Article } from "../articleTypes";

export const cmr: Article = {
  title: "CMR-fraktbrev",
  slug: "cmr",
  href: "/kjekt-a-vite/cmr",
  category: "Dokumenter",
  intro: "CMR er et sentralt transportdokument ved internasjonal veitransport, og viser hvem som sender, hvem som mottar, hva som fraktes og hvilke vilkår som gjelder.",
  image: {
    src: "/images/articles/cmr-fraktbrev.png",
    alt: "Eksempel på utfylt CMR-fraktbrev",
  },
  seoTitle: "CMR-fraktbrev | SG Logistics AS",
  seoDescription: "Hva CMR-fraktbrev er, når det brukes, hvilke opplysninger som må med og hvordan vareeier bør kontrollere dokumentet før internasjonal veitransport.",
  body: [
    {
      heading: "Hva er CMR?",
      text:
        "CMR-fraktbrev brukes ved internasjonal veitransport. Dokumentet bygger på CMR-konvensjonen og er tatt inn i norsk rett gjennom vegfraktloven. Fraktbrevet dokumenterer transportavtalen og følger normalt godset fra avsender til mottaker.",
    },
    {
      heading: "Når brukes CMR-fraktbrev?",
      text:
        "CMR er særlig aktuelt når gods sendes med bil mellom land. Det brukes også ofte som praktisk transportdokument når en sending inngår i en større transportkjede, for eksempel der veitransport kombineres med sjø eller fly.",
      items: [
        "Ved internasjonal biltransport.",
        "Når avsender, mottaker, transportør og vareinformasjon må dokumenteres tydelig.",
        "Når toll, terminaler eller mottaker trenger et transportdokument som følger godset.",
      ],
    },
    {
      heading: "Hvilke opplysninger skal med?",
      text:
        "Vegfraktloven beskriver hvilke opplysninger et internasjonalt bilfraktbrev skal inneholde. NDLA viser blant annet til at CMR-formularet dekker de obligatoriske opplysningene gjennom faste rubrikker.",
      items: [
        "Sted og dato for utfylling.",
        "Navn og adresse til avsender, mottaker og fraktfører.",
        "Sted og dato for overtakelse av godset, samt bestemmelsessted.",
        "Godsbeskrivelse, pakningsmåte, antall kolli, merker og nummer.",
        "Bruttovekt eller annen mengdeangivelse, for eksempel volum.",
        "Instrukser om tollbehandling, kostnader, vedlegg og eventuelle særskilte vilkår.",
      ],
    },
    {
      heading: "Slik fylles de viktigste feltene ut",
      text:
        "CMR-skjema kan variere noe i layout, men hovedinnholdet er det samme. Bruk rubrikkene som en sjekkliste og kontroller at opplysningene samsvarer med faktura, pakkliste, booking og faktisk gods.",
      items: [
        "Rubrikk 1 - avsender: skriv fullt firmanavn, adresse og land. Dette bør stemme med faktura og eksportdokumenter.",
        "Rubrikk 2 - mottaker: skriv mottakers navn, adresse og land. Hvis leveringsadressen er en annen enn mottakeradressen, må leveringsadressen komme tydelig frem.",
        "Rubrikk 3 og 4 - henting og levering: oppgi sted og dato for overtakelse av godset, samt utleveringssted/bestemmelsessted.",
        "Rubrikk 5 - merker og nummer: fyll inn kollimerking, referanser, pallnummer eller andre merker som gjør godset identifiserbart.",
        "Rubrikk 6-8 - kolli, emballasje og godsbeskrivelse: oppgi antall kolli, emballasjetype og vanlig betegnelse på varen. Ved farlig gods må korrekt transportbetegnelse brukes.",
        "Rubrikk 9 og 10 - mengde: oppgi mål, volum eller annen mengdeangivelse der det er relevant, og bruttovekt i kg per varelinje.",
        "Rubrikk 11 - avsenders instrukser: bruk feltet til nødvendige opplysninger om tollbehandling, leveringsvilkår, referanser eller andre praktiske instrukser.",
        "Rubrikk 12 og 13 - særlige avtaler eller forbehold: fylles ut dersom det finnes spesielle vilkår, vedlegg eller forbehold fra transportør.",
        "Rubrikk 14 - frakt og kostnader: brukes der fraktbeløp, tillegg, etterkrav eller kostnadsfordeling skal fremgå.",
        "Rubrikk 15 - fraktfører: skriv navn og adresse på transportør/fraktfører.",
        "Rubrikk 16-18 - sted, dato og signaturer: avsender og fraktfører signerer ved overtakelse. Mottaker kvitterer ved levering og bør notere dato og eventuelle synlige avvik.",
      ],
    },
    {
      heading: "Hvorfor må informasjonen være riktig?",
      text:
        "Feil eller mangelfull informasjon kan gi forsinkelser, problemer ved grensepassering, feil fortolling eller uklarhet ved skade og avvik. Ved farlig gods er korrekt godsbetegnelse, UN-nummer, merking og nødvendig dokumentasjon ekstra viktig.",
    },
    {
      heading: "Hvem fyller ut CMR?",
      text:
        "Avsender, transportør eller speditør kan bidra med utfylling, men avsender må sikre at informasjonen om godset er korrekt. Transportøren kan kontrollere synlige forhold ved overtakelse, men kan ikke vite om varebeskrivelse, vekt eller klassifisering er feil dersom opplysningene fra vareeier er mangelfulle.",
    },
    {
      heading: "Praktisk kontroll før henting",
      text:
        "En enkel kontroll før bilen kommer kan spare mye tid. Sammenlign CMR med booking, faktura, pakkliste og eventuell tolldokumentasjon før godset leveres til transport.",
      items: [
        "Er mottaker og leveringsadresse korrekt skrevet?",
        "Stemmer antall kolli, vekt, volum og merking med godset?",
        "Er leveringsbetingelser og tollinstrukser tydelige?",
        "Er eventuelle vedlegg, for eksempel faktura, pakkliste eller farlig gods-dokumentasjon, klare?",
        "Er dokumentet signert og datert der det skal være signatur?",
      ],
    },
  ],
};
