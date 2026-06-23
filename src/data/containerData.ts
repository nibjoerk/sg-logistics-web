export type ContainerType = {
  id: string;
  name: string;
  label: string;
  type: string;
  image: string;
  intro: string;
  specs: {
    exterior: Record<string, string>;
    interior: Record<string, string>;
    capacity: Record<string, string>;
    door?: Record<string, string>;
  };
  useCases: string[];
};

export const containerTypes: ContainerType[] = [
  {
    id: "20-standard",
    name: "20' Standard tørrcontainer",
    label: "20 fot",
    type: "Tørrcontainer",
    image: "/src/assets/images/containers/container-20-standard.png",
    intro: "Den mest brukte containeren for tungt gods og mindre volum. Passer godt når vekten er viktigere enn kubikk.",
    specs: {
      exterior: { Lengde: "6 058 mm", Bredde: "2 438 mm", Høyde: "2 591 mm" },
      interior: { Lengde: "5 898–5 900 mm", Bredde: "2 350–2 352 mm", Høyde: "2 393–2 395 mm" },
      capacity: { "Innvendig volum": "ca. 33 m³", "Maks. totalvekt": "30 480–32 500 kg", "Tara vekt": "ca. 2 250–2 300 kg", "Maks. nyttelast": "ca. 28 180–30 250 kg" },
      door: { Bredde: "ca. 2 340 mm", Høyde: "ca. 2 292 mm" }
    },
    useCases: ["Tungt gods med begrenset volum", "Mindre forsendelser", "Maskiner, råvarer og industrigods", "Når 40' container gir unødvendig volum"]
  },
  {
    id: "40-standard",
    name: "40' Standard tørrcontainer",
    label: "40 fot",
    type: "Tørrcontainer",
    image: "/src/assets/images/containers/container-40-standard.png",
    intro: "God standardløsning for større volum når godset ikke krever ekstra høyde eller temperaturkontroll.",
    specs: {
      exterior: { Lengde: "12 192 mm", Bredde: "2 438 mm", Høyde: "2 591 mm" },
      interior: { Lengde: "12 029–12 032 mm", Bredde: "2 350–2 352 mm", Høyde: "2 392–2 395 mm" },
      capacity: { "Innvendig volum": "ca. 67 m³", "Maks. totalvekt": "30 480–32 500 kg", "Tara vekt": "ca. 3 700–3 780 kg", "Maks. nyttelast": "ca. 26 700–28 800 kg" },
      door: { Bredde: "ca. 2 340 mm", Høyde: "ca. 2 292 mm" }
    },
    useCases: ["Store varepartier", "Lett gods med mye volum", "Pallgods og handelsvarer", "Når du ønsker lavere kost per kubikk"]
  },
  {
    id: "40-high-cube",
    name: "40' High Cube tørrcontainer",
    label: "40 fot High Cube",
    type: "Tørrcontainer",
    image: "/src/assets/images/containers/container-40-high-cube.png",
    intro: "Som en 40' standard, men med ekstra høyde. Brukes ofte når varene er høye eller når ekstra kubikk gir bedre utnyttelse.",
    specs: {
      exterior: { Lengde: "12 192 mm", Bredde: "2 438 mm", Høyde: "2 896 mm" },
      interior: { Lengde: "12 029–12 032 mm", Bredde: "2 342–2 352 mm", Høyde: "2 695–2 700 mm" },
      capacity: { "Innvendig volum": "ca. 76 m³", "Maks. totalvekt": "30 480–32 500 kg", "Tara vekt": "ca. 3 830–4 300 kg", "Maks. nyttelast": "ca. 28 200–28 670 kg" },
      door: { Bredde: "ca. 2 340 mm", Høyde: "ca. 2 597 mm" }
    },
    useCases: ["Høyt gods", "Volumvarer", "Møbler og lette industrivarer", "Når ekstra høyde gir bedre utnyttelse"]
  },
  {
    id: "reefer",
    name: "Reefer-container",
    label: "20 eller 40 fot",
    type: "Kjølecontainer",
    image: "/src/assets/images/containers/container-reefer.png",
    intro: "Temperaturkontrollert container for varer som må holdes kjølt, fryst eller stabilt temperert gjennom transporten.",
    specs: {
      exterior: { Lengde: "20' eller 40'", Bredde: "2 438 mm", Høyde: "2 591–2 896 mm" },
      interior: { Lengde: "ca. 5 450 mm / 11 578–11 599 mm", Bredde: "ca. 2 280–2 294 mm", Høyde: "ca. 2 255–2 545 mm" },
      capacity: { "Innvendig volum": "ca. 28–68 m³", "Temperaturområde": "typisk -40 °C til +30 °C", "Maks. totalvekt": "ca. 30 480–34 000 kg", "Maks. nyttelast": "ca. 27 500–29 700 kg" },
      door: { Bredde: "ca. 2 276–2 316 mm", Høyde: "ca. 2 264–2 569 mm" }
    },
    useCases: ["Matvarer", "Farmasi og helseprodukter", "Frostvarer", "Varer med krav til stabil temperatur"]
  },
  {
    id: "flat-rack",
    name: "Flat Rack-container",
    label: "20 eller 40 fot",
    type: "Flatrack container",
    image: "/src/assets/images/containers/container-flat-rack.png",
    intro: "Brukes for tungt, bredt eller høyt gods som ikke passer i en lukket container.",
    specs: {
      exterior: { Lengde: "20' eller 40'", Bredde: "2 438 mm", Høyde: "varierer" },
      interior: { Lengde: "ca. 5 612–11 652 mm", Bredde: "ca. 2 148–2 368 mm", Høyde: "åpen konstruksjon" },
      capacity: { "Maks. totalvekt": "ca. 34 000–60 000 kg", "Tara vekt": "ca. 2 740–5 950 kg", "Maks. nyttelast": "ca. 31 260–54 200 kg", "Sikring": "kraftige surrepunkter" }
    },
    useCases: ["Prosjektlast", "Maskiner", "Bredt eller høyt gods", "Last som må løftes med kran"]
  },
  {
    id: "open-top",
    name: "Open Top-container",
    label: "20 eller 40 fot",
    type: "Åpen-topp container",
    image: "/src/assets/images/containers/container-open-top.png",
    intro: "Container med åpen topp, ofte med presenning. Brukes når godset må lastes ovenfra eller er for høyt for standard container.",
    specs: {
      exterior: { Lengde: "20' eller 40'", Bredde: "2 438 mm", Høyde: "2 591–2 896 mm" },
      interior: { Lengde: "ca. 5 895–12 029 mm", Bredde: "ca. 2 350–2 352 mm", Høyde: "ca. 2 378–2 683 mm" },
      capacity: { "Innvendig volum": "ca. 32–75 m³", "Maks. totalvekt": "30 480–32 500 kg", "Maks. nyttelast": "ca. 26 630–30 200 kg", "Tak": "åpen topp / presenning" }
    },
    useCases: ["Overhøy last", "Kranlasting", "Tungt industrigods", "Gods som ikke kan lastes gjennom dørene"]
  }
];
