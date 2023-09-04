import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import { SITE_URL } from './src/data/config'
import { visualizer } from 'rollup-plugin-visualizer'
import compressor from 'astro-compressor'
import robotsTxt from 'astro-robots-txt'
import Compress from 'astro-compress'

const viz = Boolean(process.env['MODE'] === 'viz')

// https://astro.build/config
export default defineConfig({
  integrations: [sitemap(), robotsTxt(), compressor(), Compress()],
  vite: {
    plugins: [
      viz
        ? visualizer({ brotliSize: true, gzipSize: true, open: true, exclude: [{ bundle: '**/node_modules/**' }] })
        : null,
    ].filter(Boolean),
  },
  site: SITE_URL,
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
})
