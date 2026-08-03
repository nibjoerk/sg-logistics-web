export const documents = [
  {
    title: "Hent tolldeklarasjon",
    type: "Selvbetjening",
    description:
      "Last ned kopi av tolldeklarasjon (SAD) med opplysninger fra deklarasjonsoversikten i Altinn.",
    href: "/tolldeklarasjon",
    openInNewTab: false,
    linkLabel: "Gå til siden →",
  },
  {
    title: "Sustainability Report 2025",
    type: "PDF",
    description: "SG Logistics sin VSME Basic bærekraftsrapport for 2025.",
    href: "/files/SG_Logistics_VSME_Basic_2025.pdf",
  },
  {
    title: "Sustainability Report 2025",
    type: "HTML",
    description: "Åpne rapporten direkte i nettleseren.",
    href: "/files/SG_Logistics_VSME_Basic_2025.html",
  },
] as const;

export type DocumentItem = {
  title: string;
  type: string;
  description: string;
  href: string;
  openInNewTab?: boolean;
  linkLabel?: string;
};
