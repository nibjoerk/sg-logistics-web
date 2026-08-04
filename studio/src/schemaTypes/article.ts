import {defineArrayMember, defineField, defineType} from 'sanity'

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
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'section',
          title: 'Seksjon',
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
