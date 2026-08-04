import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from './src/schemaTypes'
import {presentationUrl, resolve} from './src/presentation/resolve'

export default defineConfig({
  name: 'default',
  title: 'SG Logistics',
  projectId: 'r781ar4i',
  dataset: 'production',
  plugins: [
    structureTool(),
    presentationTool({
      previewUrl: {
        origin: presentationUrl,
        preview: '/kjekt-a-vite',
      },
      resolve,
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
