// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  redirects: {
    '/kjekt-a-vite/incoterms-veiviser': '/kjekt-a-vite/incoterms',
    '/tjenester/veitransport': '/tjenester/bilfrakt',
  },
});
