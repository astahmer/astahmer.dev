import { definePreset } from '@pandacss/dev'

export const themePreset = definePreset({
  theme: {
    extend: {
      semanticTokens: {
        colors: {
          primary: { value: '{colors.orange.500}' },
          blur: {
            top: { value: '{colors.orange.500}' },
            bottom: { value: '{colors.violet.500}' },
          },
        },
      },
    },
  },
})
