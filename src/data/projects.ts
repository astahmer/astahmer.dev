export type Project = {
  title: string
  techs?: string[]
  link: string
  description?: string
}

export const projects = [
  {
    title: 'Panda CSS',
    description: '🐼 Universal, Type-Safe, CSS-in-JS Framework for Product Teams ⚡️',
    link: 'https://panda-css.com/',
    techs: ['npm package', 'AST manipulation with ts-morph', 'Landing page with Astro'],
  },
  {
    title: '@pandabox/unplugin',
    description: 'Panda distributed as a Vite plugin, with optional macro support',
    techs: ['Bundler plugin (unplugin)', 'AST manipulation with ts-morph'],
    link: 'https://pandabox.vercel.app/',
  },
  {
    title: 'Atomic CSS Devtools',
    description: 'A devtool panel for debugging Atomic CSS rules as if they were not atomic.',
    techs: ['Browser plugin (Chrome/Firefox) built with WXT', 'Panda CSS', 'Ark-UI'],
    link: 'https://github.com/astahmer/atomic-css-devtools',
  },
  {
    title: 'tw2panda',
    description: 'Easily migrate code from tailwind to Panda CSS',
    techs: ['Online playground', 'CLI', 'VSCode plugin', 'Panda CSS', 'xstate'],
    link: 'https://tailwind-to-panda.vercel.app/',
  },
  {
    title: 'typed-openapi',
    description: 'Generate a headless Typescript API client from an OpenAPI spec',
    techs: ['Online playground', 'CLI', 'Panda CSS', 'OpenAPI'],
    link: 'https://typed-openapi-web.vercel.app/',
  },
  {
    title: 'openapi-zod-client',
    description: 'Generate a zodios API client from an OpenAPI spec',
    techs: ['Online playground', 'CLI', 'Chakra-UI', 'OpenAPI', 'Zod', 'Zodios'],
    link: 'https://openapi-zod-client.vercel.app/',
  },
] satisfies Project[]
