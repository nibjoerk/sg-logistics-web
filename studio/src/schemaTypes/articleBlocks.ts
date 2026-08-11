import {defineArrayMember, defineField, defineType} from 'sanity'

const hrefField = defineField({
  name: 'href',
  title: 'Lenke (URL)',
  type: 'string',
  description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
})

/**
 * Nested fields inside Portable Text objects stay lightly validated on purpose.
 * Aggressive required/min rules flip validation markers on every keystroke and
 * can remount the PTE edit dialog (focus loss while typing caption/title).
 */
export const calloutType = defineType({
  name: 'callout',
  title: 'Callout / merknad',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'Tone',
      type: 'string',
      initialValue: 'info',
      options: {
        list: [
          {title: 'Info', value: 'info'},
          {title: 'Advarsel', value: 'warning'},
          {title: 'Tips', value: 'tip'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'label',
      title: 'Etikett (valgfritt)',
      type: 'string',
      description: 'F.eks. «Kort fortalt» eller «Viktig»',
    }),
    defineField({
      name: 'text',
      title: 'Tekst',
      type: 'text',
      rows: 4,
      description: 'Ren tekst. Kjør migrate-callout-text hvis eldre artikler fortsatt har rich text her.',
    }),
  ],
  preview: {
    select: {title: 'label', tone: 'tone', text: 'text'},
    prepare({title, tone, text}) {
      const snippet = typeof text === 'string' ? text.slice(0, 60) : ''
      return {
        title: title || 'Callout',
        subtitle: [tone || 'info', snippet].filter(Boolean).join(' · '),
      }
    },
  },
})

export const checklistType = defineType({
  name: 'checklist',
  title: 'Sjekkliste',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({name: 'items', title: 'Punkter', type: 'array', of: [{type: 'string'}]}),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'Sjekkliste',
        subtitle: `${Array.isArray(items) ? items.length : 0} punkter`,
      }
    },
  },
})

export const warningType = defineType({
  name: 'warning',
  title: 'Advarselsboks',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift (valgfritt)',
      type: 'string',
      initialValue: 'Vanlige feil',
    }),
    defineField({name: 'items', title: 'Punkter', type: 'array', of: [{type: 'string'}]}),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'Advarselsboks',
        subtitle: `${Array.isArray(items) ? items.length : 0} punkter`,
      }
    },
  },
})

export const infoCardsType = defineType({
  name: 'infoCards',
  title: 'Infokort',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({
      name: 'columns',
      title: 'Kolonner',
      type: 'number',
      initialValue: 2,
      options: {
        list: [
          {title: '2', value: 2},
          {title: '3', value: 3},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'cards',
      title: 'Kort',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            defineField({name: 'title', title: 'Tittel', type: 'string'}),
            defineField({name: 'label', title: 'Etikett (valgfritt)', type: 'string'}),
            defineField({name: 'text', title: 'Tekst', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', subtitle: 'text', label: 'label'},
            prepare({title, subtitle, label}) {
              return {title: title || label || 'Infokort', subtitle}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', cards: 'cards'},
    prepare({title, cards}) {
      return {
        title: title || 'Infokort',
        subtitle: `${Array.isArray(cards) ? cards.length : 0} kort`,
      }
    },
  },
})

export const factTilesType = defineType({
  name: 'factTiles',
  title: 'Faktaruter',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Fakta',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'fact',
          fields: [
            defineField({name: 'label', title: 'Label', type: 'string'}),
            defineField({name: 'value', title: 'Verdi', type: 'text', rows: 2}),
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'Faktaruter',
        subtitle: `${Array.isArray(items) ? items.length : 0} ruter`,
      }
    },
  },
})

export const tableType = defineType({
  name: 'table',
  title: 'Tabell',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({name: 'intro', title: 'Ingress (valgfritt)', type: 'text', rows: 2}),
    defineField({
      name: 'columns',
      title: 'Kolonneoverskrifter',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'rows',
      title: 'Rader',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'row',
          fields: [
            defineField({
              name: 'cells',
              title: 'Celler',
              type: 'array',
              of: [{type: 'string'}],
            }),
          ],
          preview: {
            select: {cells: 'cells'},
            prepare({cells}) {
              const list = Array.isArray(cells) ? cells : []
              return {title: list[0] || 'Rad', subtitle: list.slice(1).join(' · ')}
            },
          },
        }),
      ],
    }),
    defineField({name: 'footnote', title: 'Fotnote (valgfritt)', type: 'text', rows: 2}),
  ],
  preview: {
    select: {title: 'heading', columns: 'columns'},
    prepare({title, columns}) {
      return {
        title: title || 'Tabell',
        subtitle: `${Array.isArray(columns) ? columns.length : 0} kolonner`,
      }
    },
  },
})

export const faqType = defineType({
  name: 'faq',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Overskrift (valgfritt)',
      type: 'string',
      initialValue: 'Ofte stilte spørsmål',
    }),
    defineField({
      name: 'items',
      title: 'Spørsmål',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faqItem',
          fields: [
            defineField({name: 'question', title: 'Spørsmål', type: 'string'}),
            defineField({name: 'answer', title: 'Svar', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
        defineArrayMember({
          type: 'object',
          name: 'item',
          title: 'FAQ-spørsmål (eldre)',
          fields: [
            defineField({name: 'question', title: 'Spørsmål', type: 'string'}),
            defineField({name: 'answer', title: 'Svar', type: 'text', rows: 4}),
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'FAQ',
        subtitle: `${Array.isArray(items) ? items.length : 0} spørsmål`,
      }
    },
  },
})

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
    defineField({name: 'text', title: 'Tekst (valgfritt)', type: 'text', rows: 3}),
    defineField({name: 'primaryLabel', title: 'Primærknapp – tekst', type: 'string'}),
    defineField({name: 'primaryHref', title: 'Primærknapp – lenke', type: 'string'}),
    defineField({name: 'secondaryLabel', title: 'Sekundærknapp – tekst (valgfritt)', type: 'string'}),
    defineField({name: 'secondaryHref', title: 'Sekundærknapp – lenke (valgfritt)', type: 'string'}),
  ],
  preview: {
    select: {title: 'heading', subtitle: 'primaryLabel'},
  },
})

export const linksType = defineType({
  name: 'links',
  title: 'Lenkeliste',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({
      name: 'items',
      title: 'Lenker',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          fields: [
            defineField({name: 'label', title: 'Tekst', type: 'string'}),
            hrefField,
          ],
          preview: {select: {title: 'label', subtitle: 'href'}},
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'Lenkeliste',
        subtitle: `${Array.isArray(items) ? items.length : 0} lenker`,
      }
    },
  },
})

export const linkCardsType = defineType({
  name: 'linkCards',
  title: 'Lenkekort',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({name: 'intro', title: 'Ingress (valgfritt)', type: 'text', rows: 2}),
    defineField({
      name: 'cards',
      title: 'Kort',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'card',
          fields: [
            defineField({name: 'title', title: 'Tittel (valgfritt)', type: 'string'}),
            defineField({name: 'label', title: 'Kort etikett (valgfritt)', type: 'string'}),
            hrefField,
            defineField({name: 'text', title: 'Beskrivelse (valgfritt)', type: 'text', rows: 3}),
          ],
          preview: {
            select: {title: 'title', label: 'label', subtitle: 'href'},
            prepare({title, label, subtitle}) {
              return {title: title || label || subtitle || 'Lenkekort', subtitle}
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', cards: 'cards'},
    prepare({title, cards}) {
      return {
        title: title || 'Lenkekort',
        subtitle: `${Array.isArray(cards) ? cards.length : 0} kort`,
      }
    },
  },
})

export const symbolGalleryType = defineType({
  name: 'symbolGallery',
  title: 'Symbolgalleri',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift (valgfritt)', type: 'string'}),
    defineField({name: 'intro', title: 'Ingress (valgfritt)', type: 'text', rows: 2}),
    defineField({
      name: 'items',
      title: 'Symboler',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'symbol',
          fields: [
            defineField({
              name: 'image',
              title: 'Bilde',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({name: 'title', title: 'Tittel', type: 'string'}),
            defineField({name: 'subtitle', title: 'Undertittel (valgfritt)', type: 'string'}),
            defineField({name: 'meaning', title: 'Betydning (valgfritt)', type: 'text', rows: 3}),
            defineField({
              name: 'use',
              title: 'Når / hvordan brukes (valgfritt)',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'title', subtitle: 'subtitle', media: 'image'},
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {title: 'heading', items: 'items'},
    prepare({title, items}) {
      return {
        title: title || 'Symbolgalleri',
        subtitle: `${Array.isArray(items) ? items.length : 0} symboler`,
      }
    },
  },
})

export const toolType = defineType({
  name: 'tool',
  title: 'Verktøy',
  type: 'object',
  fields: [
    defineField({
      name: 'tool',
      title: 'Velg verktøy',
      type: 'string',
      options: {
        list: [
          {title: 'Incoterms-veiviser', value: 'incoterms'},
          {title: 'Ansvarsgrense-kalkulator', value: 'liability'},
          {title: 'Volumvekt-kalkulator', value: 'volumeWeight'},
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: {
    select: {tool: 'tool'},
    prepare({tool}) {
      const labels: Record<string, string> = {
        incoterms: 'Incoterms-veiviser',
        liability: 'Ansvarsgrense-kalkulator',
        volumeWeight: 'Volumvekt-kalkulator',
      }
      return {title: 'Verktøy', subtitle: labels[tool as string] || tool}
    },
  },
})

export const sectionType = defineType({
  name: 'section',
  title: 'Tekstseksjon (eldre)',
  type: 'object',
  fields: [
    defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
    defineField({name: 'text', title: 'Tekst', type: 'text', rows: 5}),
    defineField({name: 'items', title: 'Punkter', type: 'array', of: [{type: 'string'}]}),
    defineField({
      name: 'links',
      title: 'Lenker',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'link',
          fields: [
            defineField({name: 'label', type: 'string', title: 'Tekst'}),
            hrefField,
          ],
        }),
      ],
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
        defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
      ],
    }),
  ],
})

export const imageBlockType = defineType({
  name: 'imageBlock',
  title: 'Bilde (eldre)',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Bilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
        defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
      ],
    }),
  ],
})

export const articleBlockTypes = [
  calloutType,
  checklistType,
  warningType,
  infoCardsType,
  factTilesType,
  tableType,
  faqType,
  ctaType,
  linksType,
  linkCardsType,
  symbolGalleryType,
  toolType,
  sectionType,
  imageBlockType,
]
