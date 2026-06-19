import ase from "../assets/images/Employees/Åse Haram.jpg";
import cathrine from "../assets/images/Employees/Cathrine Lunheim.jpg";
import christian from "../assets/images/Employees/Christian Lunheim.jpg";
import geir from "../assets/images/Employees/Geir Bjørkavåg.jpg";
import harald from "../assets/images/Employees/Harald Larsen.jpg";
import hilde from "../assets/images/Employees/Hilde Solevågseide.jpg";
import lars from "../assets/images/Employees/Lars Ove Håhjem.jpg";
import mads from "../assets/images/Employees/Mads Nedregaard.jpg";
import martin from "../assets/images/Employees/Martin Gjerde.jpg";
import nathalie from "../assets/images/Employees/Nathalie Bratteng.jpg";
import nilsErik from "../assets/images/Employees/Nils Erik Bjørkedal.jpg";
import silje from "../assets/images/Employees/Silje Breivik.jpg";
import torgeir from "../assets/images/Employees/Torgeir Stene.jpg";
import trine from "../assets/images/Employees/Trine Nybø.jpg";
import trude from "../assets/images/Employees/Trude Fiskerstrand.jpg";

export const employees = [
  { name: "Nils Erik Bjørkedal", title: "Daglig leder", department: "Ledelse", phone: "+47 905 77 727", email: "neb@sglogistics.no", image: nilsErik },
  { name: "Åse Haram", title: "Regnskap", department: "Administrasjon", phone: "+47 407 67 259", email: "ah@sglogistics.no", image: ase },
  { name: "Harald Larsen", title: "Terminal / Lager", department: "Terminal", phone: "+47 452 05 427", email: "hl@sglogistics.no", image: harald },
  { name: "Trude Fiskerstrand", title: "Avdelingsleder Bilfrakt", department: "Bilfrakt", phone: "+47 407 67 168", email: "tfb@sglogistics.no", image: trude },
  { name: "Lars Ove Håhjem", title: "Bilfrakt", department: "Bilfrakt", phone: "+47 452 04 563", email: "loh@sglogistics.no", image: lars },
  { name: "Trine Nybø", title: "Bilfrakt", department: "Bilfrakt", phone: "+47 407 67 156", email: "tn@sglogistics.no", image: trine },
  { name: "Nathalie Bratteng", title: "Bilfrakt", department: "Bilfrakt", phone: "+47 407 69 427", email: "nathalie.bratteng@sglogistics.no", image: nathalie },
  { name: "Hilde Solevågseide", title: "Toll / Bilfrakt", department: "Bilfrakt", phone: "+47 452 03 508", email: "hs@sglogistics.no", image: hilde },
  { name: "Christian Lunheim", title: "Avdelingsleder Fly- og Sjøfrakt", department: "Fly & Sjø", phone: "+47 452 15 954", email: "cl@sglogistics.no", image: christian },
  { name: "Geir Bjørkavåg", title: "Flyfrakt", department: "Fly", phone: "+47 406 30 495", email: "gb@sglogistics.no", image: geir },
  { name: "Silje Breivik", title: "Flyfrakt / UPS", department: "Fly", phone: "+47 406 43 079", email: "sb@sglogistics.no", image: silje },
  { name: "Cathrine Lunheim", title: "Sjøfrakt", department: "Sjø", phone: "+47 453 54 956", email: "cal@sglogistics.no", image: cathrine },
  { name: "Mads Nedregaard", title: "Sjøfrakt", department: "Sjø", phone: "+47 453 54 956", email: "mn@sglogistics.no", image: mads },
  { name: "Torgeir Stene", title: "Prosjekt / Sjøfrakt", department: "Prosjekt", phone: "+47 908 05 050", email: "ts@sglogistics.no", image: torgeir },
  { name: "Martin Gjerde", title: "Salgsansvarlig", department: "Salg", phone: "+47 468 93 310", email: "martin.gjerde@sglogistics.no", image: martin },
];

export type Employee = (typeof employees)[number];
