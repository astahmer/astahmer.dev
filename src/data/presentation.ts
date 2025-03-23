import { css } from '#/styled-system/css'
import type { SystemStyleObject } from '#/styled-system/types'

type Social = {
  label: string
  link: string
  css?: SystemStyleObject
}

type Presentation = {
  title: string
  profile?: string
  description: string
  socials: Social[]
}

export const presentation = {
  title: "Hey, I'm Alex 👋",
  profile: '',
  description: `I'm a frenchy *freelance web developer* with a bunch of years of experience.
  I'm pretty good with *TypeScript/React/NodeJS*. <br />
  I'm also a core contributor to [Panda CSS]`,
  socials: [
    {
      label: 'Twitter',
      link: 'https://twitter.com/astahmer_dev',
      css: css.raw({
        fontWeight: 'bold',
        color: {
          base: 'sky.500',
          _dark: 'sky.300',
        },
      }),
    },
    {
      label: 'Github',
      link: 'https://github.com/astahmer',
      css: css.raw({
        fontWeight: 'bold',
        textAlpha: {
          base: 'gray.500',
          _dark: 'white/85',
        },
      }),
    },
    // {
    //   label: 'Work with me',
    //   link: 'https://cal.com/astahmer/work-with-me',
    //   css: css.raw({
    //     fontWeight: 'bold',
    //     color: {
    //       base: 'indigo.500',
    //       _dark: 'indigo.300',
    //       _hover: {
    //         base: 'indigo.600',
    //         _dark: 'indigo.200',
    //       },
    //     },
    //   }),
    // },
    {
      label: 'Bluesky',
      link: 'https://bsky.app/profile/astahmer.dev',
      css: css.raw({ fontWeight: 'bold', color: 'gray.400' }),
    },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/alexandre-stahmer/',
      css: css.raw({ fontWeight: 'bold', color: 'gray.400' }),
    },
  ],
} satisfies Presentation
