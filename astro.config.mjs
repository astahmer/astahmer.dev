import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { SITE_URL } from './src/data/config'

// https://astro.build/config
export default defineConfig({
  integrations: [
    sitemap(),
  ],
  site: SITE_URL,
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
})
