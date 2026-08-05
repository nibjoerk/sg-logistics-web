// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  adapter: vercel(),
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
  },
});
