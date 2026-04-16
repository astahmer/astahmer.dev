type Social = {
  label: string
  link: string
}

type Presentation = {
  name: string
  title: string
  intro: string
  location: string
  availability: string
  socials: Social[]
  footerNote: string
}

export const presentation = {
  name: 'Alexandre Stahmer',
  title:
    'Frenchy freelance engineer with a taste for type-safety, performance and developer tooling.',
  intro:
    'I am a freelance engineer based in France. Most of my work sits somewhere between solving direct user problems and building the tools that enable other engineers to do so.',
  location: 'France',
  availability:
    'Available for selective consulting, senior IC roles, and collaborations where the product is as interesting as the engineering.',
  socials: [
    {
      label: 'Github',
      link: 'https://github.com/astahmer',
    },
    {
      label: 'Bluesky',
      link: 'https://bsky.app/profile/astahmer.dev',
    },
    {
      label: 'LinkedIn',
      link: 'https://www.linkedin.com/in/alexandre-stahmer/',
    },
    {
      label: 'Twitter',
      link: 'https://twitter.com/astahmer_dev',
    },
  ],
  footerNote: 'Passionate about dev tools, performance optimizations, and pragmatic architecture.',
} satisfies Presentation
