import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://admi.mu.ac.in',
  output: 'static',
  integrations: [sitemap()]
});
