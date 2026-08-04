import {defineArrayMember, defineField, defineType} from 'sanity'

const linkFields = [
  defineField({
    name: 'label',
    title: 'Tekst',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'href',
    title: 'Lenke',
    type: 'string',
    description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
    validation: (rule) => rule.required(),
  }),
]

const linkCardFields = [
  defineField({
    name: 'title',
    title: 'Tittel',
    type: 'string',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'label',
    title: 'Kort etikett',
    type: 'string',
  }),
  defineField({
    name: 'href',
    title: 'Lenke',
    type: 'string',
    description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: 'text',
    title: 'Beskrivelse',
    type: 'text',
    rows: 3,
  }),
]

const imageWithCaption = defineField({
  name: 'image',
  title: 'Bilde',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({name: 'alt', title: 'Alt-tekst', type: 'string'}),
    defineField({name: 'caption', title: 'Bildetekst', type: 'string'}),
  ],
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
      description: 'Bygg artikkelen med blokker. Legg til, fjern og omorganiser fritt.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Tekstseksjon',
          fields: [
            defineField({
              name: 'heading',
              title: 'Overskrift',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'text',
              title: 'Tekst',
              type: 'text',
              rows: 5,
              validation: (rule) => rule.required(),
            }),
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
                  title: 'Lenke',
                  fields: linkFields,
                  preview: {
                    select: {title: 'label', subtitle: 'href'},
                  },
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
          preview: {
            select: {title: 'heading', subtitle: 'text'},
            prepare({title, subtitle}) {
              return {
                title: title || 'Tekstseksjon',
                subtitle: subtitle,
              }
            },
          },
        }),
        defineArrayMember({
          type: 'object',
          name: 'imageBlock',
          title: 'Bilde',
          fields: [imageWithCaption],
          preview: {
            select: {media: 'image', subtitle: 'image.caption', alt: 'image.alt'},
            prepare({media, subtitle, alt}) {
              return {
                title: 'Bilde',
                subtitle: subtitle || alt || '',
                media,
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
              title: 'Overskrift',
              type: 'string',
              initialValue: 'Gå videre',
            }),
            defineField({
              name: 'intro',
              title: 'Ingress',
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
                  fields: linkCardFields,
                  preview: {
                    select: {title: 'title', subtitle: 'href'},
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
