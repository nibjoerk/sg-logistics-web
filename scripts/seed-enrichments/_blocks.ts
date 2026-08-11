export type Block = Record<string, unknown>;

export function key() {
  return Math.random().toString(16).slice(2, 14);
}

export function textBlock(text: string, style: "normal" | "h2" | "h3" = "normal"): Block {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{_type: "span", _key: key(), text, marks: []}],
  };
}

export function paragraphsToBlocks(text: string): Block[] {
  return text
    .split(/\n{2,}/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => textBlock(part.replace(/\n/g, " "), "normal"));
}

export function callout(label: string, text: string, tone: "info" | "warning" | "tip" = "info"): Block {
  return {
    _type: "callout",
    _key: key(),
    tone,
    label,
    // Plain string — nested Portable Text inside callouts caused Studio focus loss.
    text,
  };
}

export function checklist(items: string[], heading?: string): Block {
  return {
    _type: "checklist",
    _key: key(),
    ...(heading ? {heading} : {}),
    items,
  };
}

export function warning(items: string[], heading = "Vanlige feil"): Block {
  return {
    _type: "warning",
    _key: key(),
    heading,
    items,
  };
}

export function section(opts: {
  heading?: string;
  text?: string;
  items?: string[];
  image?: {src: string; alt: string; caption?: string};
}): Block {
  return {
    _type: "section",
    _key: key(),
    ...(opts.heading ? {heading: opts.heading} : {}),
    ...(opts.text ? {text: opts.text} : {}),
    ...(opts.items?.length ? {items: opts.items} : {}),
    ...(opts.image
      ? {
          image: {
            _type: "image",
            alt: opts.image.alt,
            localSrc: opts.image.src,
            ...(opts.image.caption ? {caption: opts.image.caption} : {}),
          },
        }
      : {}),
  };
}

export function infoCards(
  cards: Array<{title: string; text: string; label?: string}>,
  heading?: string,
  columns: 2 | 3 = 2,
): Block {
  return {
    _type: "infoCards",
    _key: key(),
    ...(heading ? {heading} : {}),
    columns,
    cards: cards.map((card) => ({
      _type: "card",
      _key: key(),
      title: card.title,
      text: card.text,
      ...(card.label ? {label: card.label} : {}),
    })),
  };
}

export function linkCards(
  cards: Array<{title: string; href: string; label?: string; text?: string}>,
  heading = "Relaterte artikler",
): Block {
  return {
    _type: "linkCards",
    _key: key(),
    heading,
    cards: cards.map((card) => ({
      _type: "card",
      _key: key(),
      title: card.title,
      href: card.href,
      ...(card.label ? {label: card.label} : {}),
      ...(card.text ? {text: card.text} : {}),
    })),
  };
}

export function factTiles(items: Array<{label: string; value: string}>, heading?: string): Block {
  return {
    _type: "factTiles",
    _key: key(),
    ...(heading ? {heading} : {}),
    items: items.map((item) => ({
      _type: "fact",
      _key: key(),
      label: item.label,
      value: item.value,
    })),
  };
}
