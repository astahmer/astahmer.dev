import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import mdx from '@astrojs/mdx'
import panda from '@pandacss/dev/postcss'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { SITE_URL } from './src/data/config'
import { visualizer } from 'rollup-plugin-visualizer'
import compressor from 'astro-compressor'
import robotsTxt from 'astro-robots-txt'
import Compress from 'astro-compress'
import { h } from 'hastscript'
import addClasses from 'rehype-add-classes'
import rehypeExternalLinks from 'rehype-external-links'
import remarkToc from 'remark-toc'
import preact from '@astrojs/preact'
import expressiveCode from 'astro-expressive-code'
const viz = Boolean(process.env['MODE'] === 'viz')

// https://astro.build/config
export default defineConfig({
  redirects: {
    '/posts/how-does-xxx-compare-to-panda-css': '/posts/how-does-xxx-compares-to-panda-css',
  },
  integrations: [
    expressiveCode(),
    mdx(),
    //
    // preact({ compat: true }),
    sitemap(),
    robotsTxt(),
    Compress(),
    compressor(),
  ],
  vite: {
    css: {
      postcss: {
        plugins: [panda()],
      },
    },
    plugins: [
      viz
        ? visualizer({
            brotliSize: true,
            gzipSize: true,
            open: true,
            exclude: [
              {
                bundle: '**/node_modules/**',
              },
            ],
          })
        : null,
    ].filter(Boolean),
  },
  site: SITE_URL,
  markdown: {
    // Applied to .md and .mdx files
    // remarkPlugins: [remarkToc({ maxDepth: 3, tight: true })],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          content: h('span.h-anchor', ['#']),
        },
      ],
      [
        addClasses,
        {
          'h2,h3,h4,h5,h6': 'group',
        },
      ],
      [
        rehypeExternalLinks,
        {
          rel: 'external',
          target: '_blank',
          test({ tagName, properties }) {
            return tagName === 'a' && !properties.href.includes('astahmer.dev')
          },
        },
      ],
    ],
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'nord',
      wrap: false,
    },
  },
})
