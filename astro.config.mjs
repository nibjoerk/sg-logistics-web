// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
  vite: {
    optimizeDeps: {
      include: ["leaflet"],
    },
  },
  redirects: {
    '/kjekt-a-vite/incoterms-veiviser': '/kjekt-a-vite/incoterms',
    '/tjenester/veitransport': '/tjenester/bilfrakt',
    // Accidental s- prefix under nested Astro routes (seed mirrors / manual URLs)
    '/kjekt-a-vite/sjofrakt/s-hvor-tung-kan-en-container-vaere-pa-vei':
      '/kjekt-a-vite/sjofrakt/hvor-tung-kan-en-container-vaere-pa-vei',
    '/kjekt-a-vite/sjofrakt/s-containerpakking-stuffing':
      '/kjekt-a-vite/sjofrakt/containerpakking-stuffing',
    '/kjekt-a-vite/sjofrakt/s-seaworthy-packing': '/kjekt-a-vite/sjofrakt/seaworthy-packing',
    '/kjekt-a-vite/sjofrakt/s-containerhavner': '/kjekt-a-vite/sjofrakt/containerhavner',
    // Sanity-canonical articles use slug without s-; redirect guessed mirror URLs
    '/kjekt-a-vite/s-incoterms': '/kjekt-a-vite/incoterms',
    '/kjekt-a-vite/s-farlig-gods': '/kjekt-a-vite/farlig-gods',
    '/kjekt-a-vite/s-farlig-gods-flyfrakt': '/kjekt-a-vite/farlig-gods-flyfrakt',
    '/kjekt-a-vite/s-farlig-gods-sjofrakt': '/kjekt-a-vite/farlig-gods-sjofrakt',
  },
});
