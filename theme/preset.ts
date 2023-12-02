import { definePreset, type PropertyConfig } from '@pandacss/dev'

// https://github.com/kumaaa-inc/shadow-panda/blob/f8f8afc445ccf12d78b089f80afff4462596f8c4/packages/preset/src/utilities/text-alpha.ts

const colorMix: (...args: Parameters<NonNullable<PropertyConfig['transform']>>) => {
  color: string
  amount: string | number
  value: string
} = (value: string, { token }) => {
  const [color, opacityAmount] = value.split('/')
  const amount = !isNaN(Number(opacityAmount)) ? Number(opacityAmount) : 100
  const colorValue = token(`colors.${color}`)
  const opacityValue = token(`opacity.${amount}`)
  const amountValue = opacityValue ? Number(opacityValue) * 100 : `${100 - amount}%`

  return {
    color: colorValue ?? color,
    amount: amountValue,
    value: `color-mix(in srgb, transparent ${amountValue}, ${colorValue})`,
  }
}

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
      recipes: {
        article: {
          className: 'article',
          base: {
            '--colors-prose-body': 'var(--colors-neutral-300)',
            '--colors-prose-bold': 'var(--colors-neutral-200)',
            '--colors-prose-heading': 'white',
            '--colors-prose-subheading': 'colors.neutral.100',
            ml: 'auto',
            mr: 'auto',
            w: 'full',
            maxW: '80ch',
            '& code': {
              borderRadius: 'sm',
              bg: 'neutral.800',
              px: '1',
              py: '2px',
              color: 'yellow.500',
            },
            '& h1': {
              fontSize: '4xl',
              lineHeight: '1.1',
            },
            '& h2': {
              fontSize: '3xl',
              color: 'var(--colors-prose-subheading)',
              lineHeight: '1.1',
            },
            '& h3': {
              mt: '4',
              fontSize: 'xl',
              color: 'var(--colors-prose-subheading)',
            },
            '& h4': {
              mt: '4',
              fontSize: 'lg',
              color: 'var(--colors-prose-subheading)',
            },
            '& a': {
              color: 'yellow.100',
              textDecoration: 'underline',
            },
            '& ul': {
              listStyleType: 'disc',
            },
            '& em': {
              color: 'neutral.200',
              fontStyle: 'italic',
            },
            '& blockquote': {
              display: 'flex',
              flexDirection: 'row',
              color: 'neutral.400',
              gap: '2',
            },
            '& pre': {
              p: '4',
              '& > code': {
                bg: 'transparent',
              },
            },
            '& .group': {
              pos: 'relative',
              '& a': {
                opacity: 0,
                pos: 'absolute',
                left: '-2.5ch',
                pr: '3',
                color: 'gray.600!',
                textDecorationLine: 'none',
                transition: 'common',
                _groupHover: { opacity: '1' },
                _hover: { color: 'yellow.200!' },
              },
            },
          },
        },
      },
    },
  },
  utilities: {
    extend: {
      backgroundAlpha: {
        shorthand: ['bga'],
        property: 'backgroundColor',
        className: 'background-alpha',
        values: { type: 'string' },
        transform: (...args) => {
          const { value, color } = colorMix(...args)

          return {
            '--sp-bga': value,
            backgroundColor: `var(--sp-bga, ${color})`,
          }
        },
      },
    },
    textAlpha: {
      shorthand: ['ca'],
      property: 'color',
      className: 'text_alpha',
      transform: (...args) => {
        const { value, color } = colorMix(...args)

        return {
          '--sp-ca': value,
          color: `var(--sp-ca, ${color})`,
        }
      },
    },
  },
})
