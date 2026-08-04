import {defineArrayMember, defineField, defineType} from 'sanity'

const hrefField = defineField({
  name: 'href',
  title: 'Lenke (URL)',
  type: 'string',
  description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
  validation: (rule) => rule.required(),
})

const portableTextBlock = defineArrayMember({
  type: 'block',
  styles: [
    {title: 'Normal', value: 'normal'},
    {title: 'Overskrift', value: 'h2'},
    {title: 'Underoverskrift', value: 'h3'},
  ],
  lists: [
    {title: 'Punktliste', value: 'bullet'},
    {title: 'Nummerert', value: 'number'},
  ],
  marks: {
    decorators: [
      {title: 'Fet', value: 'strong'},
      {title: 'Kursiv', value: 'em'},
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Lenke',
        fields: [hrefField],
      },
    ],
  },
})

const simplePortableText = {
  type: 'array' as const,
  of: [
    defineArrayMember({
      type: 'block',
      styles: [{title: 'Normal', value: 'normal'}],
      lists: [],
      marks: {
        decorators: [
          {title: 'Fet', value: 'strong'},
          {title: 'Kursiv', value: 'em'},
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lenke',
            fields: [hrefField],
          },
        ],
      },
    }),
  ],
}

export const article = defineType({
  name: 'article',
  title: 'Artikkel',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          'Import og eksport',
          'Dokumenter',
          'Sjøfrakt',
          'Flyfrakt',
          'Bilfrakt',
          'Toll',
          'Pakking',
          'Annet',
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      initialValue: 'standard',
      options: {
        list: [
          {title: 'Standard — enkel artikkel', value: 'standard'},
          {title: 'Guide — med innholdsfortegnelse', value: 'guide'},
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'intro',
      title: 'Ingress',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hovedbilde',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO-tittel',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO-beskrivelse',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Innhold',
      description:
        'Skriv fritt, eller sett inn blokker (callout, sjekkliste, tabell, FAQ, CTA, …).',
      type: 'array',
      of: [
        portableTextBlock,
        defineArrayMember({
          type: 'image',
          title: 'Bilde',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
            defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'callout',
          title: 'Callout / merknad',
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
              ...simplePortableText,
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: {title: 'label', tone: 'tone'},
            prepare({title, tone}) {
              return {
                title: title || 'Callout',
                subtitle: tone || 'info',
              }
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'checklist',
          title: 'Sjekkliste',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Punkter',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.min(1),
            }),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'warning',
          title: 'Advarselsboks',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
              initialValue: 'Vanlige feil',
            }),
            defineField({
              name: 'items',
              title: 'Punkter',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.min(1),
            }),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'infoCards',
          title: 'Infokort',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
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
                    defineField({
                      name: 'title',
                      title: 'Tittel',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Etikett (valgfritt)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'text',
                      title: 'Tekst',
                      type: 'text',
                      rows: 3,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'text'},
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'factTiles',
          title: 'Faktaruter',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Fakta',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'fact',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'value',
                      title: 'Verdi',
                      type: 'text',
                      rows: 2,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {title: 'label', subtitle: 'value'},
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'table',
          title: 'Tabell',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'intro',
              title: 'Ingress (valgfritt)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'columns',
              title: 'Kolonneoverskrifter',
              type: 'array',
              of: [{type: 'string'}],
              validation: (rule) => rule.min(1),
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
                      validation: (rule) => rule.min(1),
                    }),
                  ],
                  preview: {
                    select: {cells: 'cells'},
                    prepare({cells}) {
                      const list = Array.isArray(cells) ? cells : []
                      return {
                        title: list[0] || 'Rad',
                        subtitle: list.slice(1).join(' · '),
                      }
                    },
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
            }),
            defineField({
              name: 'footnote',
              title: 'Fotnote (valgfritt)',
              type: 'text',
              rows: 2,
            }),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'faq',
          title: 'FAQ',
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
                  name: 'item',
                  fields: [
                    defineField({
                      name: 'question',
                      title: 'Spørsmål',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'answer',
                      title: 'Svar',
                      type: 'text',
                      rows: 4,
                      validation: (rule) => rule.required(),
                    }),
                  ],
                  preview: {
                    select: {title: 'question', subtitle: 'answer'},
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'cta',
          title: 'CTA',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Tekst (valgfritt)',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'primaryLabel',
              title: 'Primærknapp – tekst',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'primaryHref',
              title: 'Primærknapp – lenke',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'secondaryLabel',
              title: 'Sekundærknapp – tekst (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'secondaryHref',
              title: 'Sekundærknapp – lenke (valgfritt)',
              type: 'string',
            }),
          ],
          preview: {
            select: {title: 'heading', subtitle: 'primaryLabel'},
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'links',
          title: 'Lenkeliste',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'items',
              title: 'Lenker',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'link',
                  title: 'Lenke',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Tekst',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    hrefField,
                  ],
                  preview: {
                    select: {title: 'label', subtitle: 'href'},
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'linkCards',
          title: 'Lenkekort',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'intro',
              title: 'Ingress (valgfritt)',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'cards',
              title: 'Kort',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'card',
                  title: 'Kort',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Tittel (valgfritt)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'label',
                      title: 'Kort etikett (valgfritt)',
                      type: 'string',
                    }),
                    hrefField,
                    defineField({
                      name: 'text',
                      title: 'Beskrivelse (valgfritt)',
                      type: 'text',
                      rows: 3,
                    }),
                  ],
                  preview: {
                    select: {title: 'title', label: 'label', subtitle: 'href'},
                    prepare({title, label, subtitle}) {
                      return {
                        title: title || label || subtitle || 'Lenkekort',
                        subtitle,
                      }
                    },
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'symbolGallery',
          title: 'Symbolgalleri',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift (valgfritt)',
              type: 'string',
            }),
            defineField({
              name: 'intro',
              title: 'Ingress (valgfritt)',
              type: 'text',
              rows: 2,
            }),
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
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'title',
                      title: 'Tittel',
                      type: 'string',
                      validation: (rule) => rule.required(),
                    }),
                    defineField({
                      name: 'subtitle',
                      title: 'Undertittel (valgfritt)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'meaning',
                      title: 'Betydning (valgfritt)',
                      type: 'text',
                      rows: 3,
                    }),
                  ],
                  preview: {
                    select: {title: 'title', subtitle: 'subtitle', media: 'image'},
                  },
                }),
              ],
              validation: (rule) => rule.min(1),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'tool',
          title: 'Verktøy',
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
              validation: (rule) => rule.required(),
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
              return {
                title: 'Verktøy',
                subtitle: labels[tool as string] || tool,
              }
            },
          },
        }),
        // Backward compatible with older articles
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Tekstseksjon (eldre)',
          fields: [
            defineField({name: 'heading', title: 'Overskrift', type: 'string'}),
            defineField({name: 'text', title: 'Tekst', type: 'text', rows: 5}),
            defineField({
              name: 'items',
              title: 'Punkter',
              type: 'array',
              of: [{type: 'string'}],
            }),
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
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageBlock',
          title: 'Bilde (eldre)',
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
        }),
      ],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publisert',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      layout: 'layout',
      media: 'image',
    },
    prepare({title, category, layout, media}) {
      return {
        title,
        subtitle: [category, layout === 'guide' ? 'Guide' : 'Standard'].filter(Boolean).join(' · '),
        media,
      }
    },
  },
})
