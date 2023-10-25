import { defineConfig } from '@pandacss/dev'
import { themePreset } from './theme/preset'
import typographyPreset from 'pandacss-preset-typography/dist/index.mjs'

const hash = Boolean(process.env['MODE'])
const minify = hash

export default defineConfig({
  presets: ['@pandacss/dev/presets', typographyPreset(), themePreset],
  hash,
  minify,
  strictTokens: false,
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'styled-system',
})
