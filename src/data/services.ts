import { servicePages } from "./servicePages";

export const services = servicePages.map((service) => ({
  title: service.title,
  slug: service.path,
  ingress: service.ingress,
  text: service.cardText,
}));
