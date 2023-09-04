import { css } from '#/styled-system/css'
import type { SystemStyleObject } from '#/styled-system/types'

type Social = {
  label: string
  link: string
  css?: SystemStyleObject
}

type Presentation = {
  mail: string
  title: string
  description: string
  socials: Social[]
  profile?: string
}

export const presentation = {
  mail: 'alexandre.stahmer+web@gmail.com',
  title: "Hey, I'm Alex 👋",
  profile: '',
  description: `I'm a frenchy *freelance web developer* with over *7 years* of experience.
  I mostly work with *TypeScript/React/NodeJS*. <br />

  Feel free to reach out if you want me to contribute to your team or project !`,
  socials: [
    {
      label: 'Twitter',
      link: 'https://twitter.com/astahmer_dev',
      css: css.raw({ fontWeight: 'bold', color: 'sky.300' }),
    },
    {
      label: 'Github',
      link: 'https://github.com/astahmer',
      css: css.raw({ fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.85)' }),
    },
    {
      label: 'Calendly',
      link: 'https://calendly.com/alexandre-stahmer',
      css: css.raw({ fontWeight: 'bold', color: 'gray.400' }),
    },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/alexandre-stahmer/',
      css: css.raw({ fontWeight: 'bold', color: 'gray.400' }),
    },
  ],
} satisfies Presentation
