import {defineLocations, type PresentationPluginOptions} from 'sanity/presentation'

export const presentationUrl =
  process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'https://sg-logistics-web.vercel.app'

export const resolve: PresentationPluginOptions['resolve'] = {
  locations: {
    article: defineLocations({
      select: {
        title: 'title',
        slug: 'slug.current',
      },
      resolve: (doc) => ({
        locations: doc?.slug
          ? [
              {
                title: doc.title || 'Artikkel',
                href: `/kjekt-a-vite/${doc.slug}`,
              },
              {
                title: 'Kjekt å vite',
                href: '/kjekt-a-vite',
              },
            ]
          : [
              {
                title: 'Kjekt å vite',
                href: '/kjekt-a-vite',
              },
            ],
      }),
    }),
  },
}
