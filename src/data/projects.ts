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
      'Core contributor work across extraction, ergonomics, and the practical edges of styling at scale.',
    link: 'https://panda-css.com/',
    techs: ['Design system tooling', 'AST work', 'Product-team workflows'],
  },
  {
    title: '@pandabox/unplugin',
    description:
      'A Vite-first way to ship Panda workflows, including the parts that usually become integration glue.',
    techs: ['Bundler plugin', 'AST transforms', 'Vite workflows'],
    link: 'https://pandabox.vercel.app/',
  },
  {
    title: 'Atomic CSS Devtools',
    description:
      'A browser panel that makes atomic CSS easier to inspect without losing the mental model.',
    techs: ['Browser extension', 'Inspection tooling', 'Panda CSS'],
    link: 'https://github.com/astahmer/atomic-css-devtools',
  },
  {
    title: 'tw2panda',
    description:
      'Migration tooling for teams moving from utility-first CSS toward typed styling systems.',
    techs: ['Playground', 'CLI', 'VS Code extension', 'xstate'],
    link: 'https://tailwind-to-panda.vercel.app/',
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
