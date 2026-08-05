import type { Article } from "../articleTypes";

export const farligGods: Article = {
  title: "Farlig gods: hva må vareeier vite?",
  slug: "farlig-gods",
  href: "/kjekt-a-vite/farlig-gods",
  category: "Regelverk",
  layout: "guide",
  intro:
    "Farlig gods er varer eller stoffer som kan medføre risiko for mennesker, miljø, materiell eller transportmiddel. For vareeier er det viktigste å vite hva varen er, og å gi riktig informasjon før transporten bestilles.",
  seoTitle: "Farlig gods for vareeiere | SG Logistics AS",
  seoDescription:
    "Generell guide til farlig gods for vareeiere: hva som må avklares før transport, og forskjellen på regelverk for vei, sjø og fly.",
  image: {
    src: "/images/articles/farlig-gods-transportformer.png",
    alt: "Illustrasjon av farlig gods på vei, sjø og fly",
  },
  body: [
    {
      _type: "callout",
      tone: "info",
      label: "Kort fortalt",
      html:
        "<p>Det finnes ikke ett regelverk som dekker alt på samme måte. Vei/jernbane, fly og sjø har egne regler. Samme vare kan derfor kreve ulik dokumentasjon, emballasje eller merking avhengig av hvordan den skal transporteres.</p>",
    },
    {
      heading: "Start med produktet, ikke transporten",
      text:
        "Mange feil oppstår fordi farlig gods først oppdages når transporten allerede er booket. Start heller med produktet: Hva er varen? Har den et UN-nummer? Hvilken fareklasse har den? Er den miljøfarlig? Inneholder den batterier, gass, væske, kjemikalier eller trykkbeholdere?\n\nSikkerhetsdatabladet er ofte første sted å se, men det må være oppdatert og relevant for transport. Produktinformasjon fra produsent eller leverandør er viktig, særlig når varen er en blanding, en prøve, avfall eller utstyr med innebygde batterier.",
    },
    {
      heading: "Velg riktig regelverk etter transportform",
      text:
        "Når farlig gods skal sendes internasjonalt, går det ofte gjennom flere transportledd. En sending kan for eksempel hentes med bil, sendes med sjø eller fly, og leveres videre med bil. Da må alle relevante regelverk vurderes.",
    },
    {
      _type: "linkCards",
      heading: "Gå videre til riktig guide",
      cards: [
        {
          title: "Vei og jernbane",
          label: "ADR/RID",
          href: "/kjekt-a-vite/farlig-gods-pa-vei",
          text:
            "For gods som skal hentes eller leveres med bil, eller gå videre med jernbane. Her er transportdokument, merking, emballasje og mengderegler sentralt.",
        },
        {
          title: "Flyfrakt",
          label: "ICAO-TI / IATA",
          href: "/kjekt-a-vite/farlig-gods-flyfrakt",
          text:
            "For hasteforsendelser og flyfrakt. Fly har strengere krav, særlig for batterier, godkjent emballasje og Shipper's Declaration.",
        },
        {
          title: "Sjøfrakt",
          label: "IMDG",
          href: "/kjekt-a-vite/farlig-gods-sjofrakt",
          text:
            "For farlig gods i container, på pall, i fat, IBC eller annen emballasje som sendes med skip. Containerpakking, marine pollutants og pakkeerklæring er viktig.",
        },
      ],
    },
    {
      heading: "Felles sjekkliste for vareeier",
      text:
        "Detaljene varierer mellom transportformene, men grunnarbeidet er ofte det samme. Dette bør avklares før du ber om pris eller booker transport:",
    },
    {
      _type: "checklist",
      items: [
        "Sjekk sikkerhetsdatabladet, særlig transportinformasjonen.",
        "Finn korrekt UN-nummer, varenavn, fareklasse og eventuell emballasjegruppe.",
        "Avklar om varen er miljøfarlig, temperaturfølsom, avfall, batteri eller tom ikke-rengjort emballasje.",
        "Bruk emballasje som er tillatt for varen, mengden og transportmåten.",
        "Merk kolli, pall, container eller annen lastbærer slik regelverket krever.",
        "Gi speditør eller transportør informasjonen før booking, ikke først ved henting.",
      ],
    },
    {
      heading: "Vanlige feil som gir forsinkelser",
      text:
        "Farlig gods trenger ikke være vanskelig, men det må være riktig fra starten. Dette er feil som ofte gir stopp, ompakking eller ny dokumentasjon:",
    },
    {
      _type: "warning",
      heading: "Vanlige feil",
      items: [
        "Varen bookes som vanlig gods selv om den er farlig gods.",
        "Sikkerhetsdatabladet er gammelt eller mangler transportinformasjon.",
        "UN-nummer, klasse eller emballasjegruppe er feil.",
        "Batterier, aerosoler, kjemikalier eller væsker blir oversett fordi de er innebygd i produktet.",
        "Kolli er skadet, lekk eller mangler fareseddel.",
        "Man antar at regler for vei også gjelder uendret for sjø eller fly.",
      ],
    },
    {
      heading: "Hvordan SG Logistics kan hjelpe",
      text:
        "Vi kan hjelpe med å avklare hvilken transportform som passer, hvilken informasjon transportør eller rederi trenger, og hvordan sendingen bør forberedes. Selve klassifiseringen må likevel bygge på korrekt produktinformasjon fra vareeier, produsent eller fagkyndig rådgiver.",
    },
    {
      _type: "linkCards",
      heading: "Relaterte artikler",
      cards: [
        { title: "Hvordan pakke gods riktig", href: "/kjekt-a-vite/pakking-av-gods" },
        { title: "CMR-fraktbrev", href: "/kjekt-a-vite/cmr" },
        {
          title: "Containerpakking: stuffing og sikring",
          href: "/kjekt-a-vite/sjofrakt/containerpakking-stuffing",
        },
      ],
    },
  ],
};
