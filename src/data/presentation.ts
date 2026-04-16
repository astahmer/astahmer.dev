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
  currentInterests: string[]
  focusAreas: string[]
  principles: string[]
  socials: Social[]
  footerNote: string
}

export const presentation = {
  name: 'Alexandre Stahmer',
  title:
    'Type-safe frontends, opinionated devtools, and product systems that stay readable under pressure.',
  intro:
    'I am a freelance engineer based in France. Most of my work sits somewhere between React product surfaces, TypeScript-heavy backend glue, and the tooling that keeps design systems from getting in the way.',
  location: 'France',
  availability:
    'Available for selective consulting, senior IC roles, and collaborations where strong frontend judgment and tooling depth both matter.',
  currentInterests: [
    'Core contribution work around Panda CSS and styling-system ergonomics.',
    'AST-heavy tooling, editor workflows, and build feedback loops that feel fast instead of clever.',
    'State machines, local-first ideas, and sync-heavy product problems.',
  ],
  focusAreas: [
    'Design systems and frontend architecture for product teams.',
    'Developer tooling that lives in editors, bundlers, CLIs, and browser panels.',
    'Type-safe application work across React, TypeScript, Node.js, and API layers.',
  ],
  principles: [
    'Type-safety should remove doubt, not add ceremony.',
    'Performance work matters most where it compounds: editor feedback, build times, and reading comfort.',
    'The best tooling makes teams calmer. It should lower friction, not invent a new religion.',
  ],
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
  footerNote:
    'Built with Astro and Panda CSS. The source is public and the writing stays the point.',
} satisfies Presentation
