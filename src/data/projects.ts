export type Project = {
  title: string
  techs?: string[]
  link: string
  description?: string
}

export const projects = [
  {
    title: 'Panda CSS',
    description:
      'Universal, Type-Safe, CSS-in-JS Framework for Product Teams',
    link: 'https://panda-css.com/',
    techs: ['Design system tooling', 'AST work', 'Product-team workflows'],
  },
  {
    title: 'Atomic CSS Devtools',
    description:
      'A browser panel that makes atomic CSS easier to inspect without losing the mental model.',
    techs: ['Browser extension', 'Inspection tooling', 'Panda CSS'],
    link: 'https://github.com/astahmer/atomic-css-devtools',
  },
  {
    title: 'typed-openapi',
    description:
      'A headless API client generator for teams that want strong types without framework lock-in.',
    techs: ['OpenAPI', 'Code generation', 'TypeScript clients'],
    link: 'https://typed-openapi-web.vercel.app/',
  },
  {
    title: 'openapi-zod-client',
    description:
      'One of the earlier client generators in this space, still useful when API typing needs to stay grounded.',
    techs: ['OpenAPI', 'Zod', 'CLI tooling'],
    link: 'https://openapi-zod-client.vercel.app/',
  },
] satisfies Project[]
