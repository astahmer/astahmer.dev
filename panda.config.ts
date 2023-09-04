import { defineConfig } from '@pandacss/dev'
import { themePreset } from 'theme'

const hash = Boolean(process.env["MODE"])

export default defineConfig({
  hash,
  strictTokens: true,
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: themePreset.theme,

  // The output directory for your css system
  outdir: 'styled-system',
})
