import {defineArrayMember, defineField, defineType} from 'sanity'
import {articleBlockTypes} from './articleBlocks'

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
        fields: [
          defineField({
            name: 'href',
            title: 'Lenke (URL)',
            type: 'string',
            description: 'Intern: /kjekt-a-vite/... — ekstern: https://...',
          }),
        ],
      },
    ],
  },
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
          'Veitransport',
          'Regelverk',
          'Skade og avvik',
          'Toll',
          'Pakking',
          'Om oss',
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
        defineArrayMember({type: 'callout'}),
        defineArrayMember({type: 'checklist'}),
        defineArrayMember({type: 'warning'}),
        defineArrayMember({type: 'infoCards'}),
        defineArrayMember({type: 'factTiles'}),
        defineArrayMember({type: 'table'}),
        defineArrayMember({type: 'faq'}),
        defineArrayMember({type: 'cta'}),
        defineArrayMember({type: 'links'}),
        defineArrayMember({type: 'linkCards'}),
        defineArrayMember({type: 'symbolGallery'}),
        defineArrayMember({type: 'tool'}),
        defineArrayMember({type: 'section'}),
        defineArrayMember({type: 'imageBlock'}),
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

export {articleBlockTypes}
