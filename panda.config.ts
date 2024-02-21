import { defineConfig, definePreset } from '@pandacss/dev'
import { themePreset } from './theme/preset'
import typographyPreset from 'pandacss-preset-typography'

const examplesPreset = definePreset({
  conditions: {
    extend: {
      lightColorMode: '[data-color-mode=light] &',
      darkColorMode: '[data-color-mode=dark] &',
      pinkTheme: '[data-theme=pink] &',
      blueTheme: '[data-theme=blue] &',
      mainTheme: '[data-theme=main] &',
      secondaryTheme: '[data-theme=secondary] &',
    },
  },
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          text: {
            value: {
              _pinkTheme: { base: '{colors.pink.500}', _darkColorMode: '{colors.pink.300}' },
              _blueTheme: { base: '{colors.blue.500}', _darkColorMode: '{colors.blue.300}' },
            },
          },
          button: {
            info: {
              DEFAULT: {
                value: {
                  _mainTheme: { base: '{colors.teal.500}', _dark: '{colors.teal.300}' },
                  _secondaryTheme: { base: '{colors.blue.500}', _dark: '{colors.blue.300}' },
                },
              },
            },
            warning: {
              DEFAULT: {
                value: {
                  _mainTheme: { base: '{colors.yellow.500}', _dark: '{colors.yellow.300}' },
                  _secondaryTheme: { base: '{colors.orange.500}', _dark: '{colors.orange.300}' },
                },
              },
              accent: {
                DEFAULT: { value: 'cyan' },
                secondary: {
                  value: {
                    base: '{colors.sky.500}',
                    _mainTheme: {
                      base: '{colors.green.500}',
                      _dark: '{colors.green.300}',
                    },
                    _secondaryTheme: {
                      base: '{colors.sky.500}',
                      _dark: '{colors.sky.300}',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

export default defineConfig({
  presets: ['@pandacss/dev/presets', typographyPreset(), examplesPreset, themePreset],
  strictTokens: false,
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx,astro}'],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: 'styled-system',
  theme: {
    extend: {
      textStyles: {
        lg: { value: { fontWeight: 'semibold' } },
        xl: { value: { fontWeight: 'semibold' } },
        '2xl': { value: { fontWeight: 'semibold' } },
        '3xl': { value: { fontWeight: 'semibold' } },
      },
      semanticTokens: {
        colors: {
          work: {
            value: {
              base: '{colors.indigo.500}',
              _dark: '{colors.indigo.400}',
            },
          },
          fg: {
            body: {
              value: {
                base: '{colors.neutral.700}',
                _dark: '{colors.neutral.400}',
              },
            },
            subtle: {
              value: {
                base: '{colors.neutral.600}',
                _dark: '{colors.neutral.300}',
              },
            },
            secondary: {
              value: {
                base: '{colors.sky.700}',
                _dark: '{colors.sky.100}',
              },
            },
            heading: {
              value: {
                base: '{colors.neutral.900}',
                _dark: '{colors.neutral.100}',
              },
            },
          },
        },
      },
    },
  },
})
