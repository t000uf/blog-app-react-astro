// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite'

import path from 'path';


// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL || 'https://blog.t000uf.net',
  // サイトは既定の static のまま。アダプタを付けることで、個別ルートの
  // `export const prerender = false`（下書きプレビュー）だけを SSR 化できる。
  adapter: cloudflare({ platformProxy: { enabled: true } }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
  },
});
