import {defineArrayMember, defineField, defineType} from 'sanity'

const hrefField = defineField({
  name: 'href',
  title: 'Lenke (URL)',
  type: 'string',
  description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
  validation: (rule) => rule.required(),
})

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
        'Skriv fritt som i Word. Marker tekst og legg til lenke, eller sett inn bilde/lenkeliste/verktøy.',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
            defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
          ],
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
              const count = Array.isArray(items) ? items.length : 0
              return {
                title: title || 'Lenkeliste',
                subtitle: `${count} lenker`,
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
              const count = Array.isArray(cards) ? cards.length : 0
              return {
                title: title || 'Lenkekort',
                subtitle: `${count} kort`,
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
      subtitle: 'category',
      media: 'image',
    },
  },
})
