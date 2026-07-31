import type { Article } from "../articleTypes";

export const fortolling: Article = {
  title: "Fortolling ved import",
  slug: "fortolling",
  href: "/kjekt-a-vite/fortolling",
  category: "Toll",
  intro: "Fortolling krever riktig dokumentasjon, varebeskrivelse, verdi og opprinnelse.",
  seoTitle: "Fortolling ved import | SG Logistics AS",
  seoDescription: "Hva du bør ha klart ved importfortolling, og hvordan du unngår forsinkelser.",
  body: [
    {
      heading: "Hva trengs ved import?",
      text:
        "Vanligvis trenger man handelsfaktura, pakkliste, fraktdokument og informasjon om varetype, verdi og opprinnelse.",
    },
    {
      heading: "Hvor oppstår feil ofte?",
      text:
        "Feil varebeskrivelse, manglende opprinnelsesinformasjon, uklar verdi eller feil varenummer/HS-kode kan forsinke tollbehandlingen og gi feil avgift.",
      links: [{ href: "/kjekt-a-vite/hs-koder", label: "Les mer om HS-koder og varenummer" }],
    },
    {
      heading: "Kommer varene under transittering?",
      text:
        "Hvis sendingen er under transittering, må prosedyren avsluttes korrekt før eller i forbindelse med fortolling. Da trengs blant annet MRN og klarhet om T1/T2-status.",
      links: [{ href: "/kjekt-a-vite/transittering", label: "Les mer om transittering" }],
    },
    {
      heading: "Hvordan kan vi hjelpe?",
      text:
        "SG Logistics kan bistå med dokumentkontroll, tollbehandling og praktisk oppfølging mot involverte parter.",
    },
  ],
};
