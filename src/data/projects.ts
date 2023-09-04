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
  },
  {
    title: 'LightningCSS AST Viewer',
    techs: ['Panda CSS', 'lightningcss', 'xstate', 'React', 'TypeScript'],
    link: 'https://lightningcss-ast-viewer.vercel.app/',
  },
  {
    title: 'typed-openapi',
    description: 'Generate a headless Typescript API client from an OpenAPI spec',
    techs: ['Panda CSS', 'OpenAPI', 'React', 'TypeScript'],
    link: 'https://typed-openapi-web.vercel.app/',
  },
  {
    title: 'tw2panda',
    description: 'Easily migrate code from tailwind to Panda CSS',
    techs: ['Panda CSS', 'xstate', 'React', 'TypeScript'],
    link: 'https://tailwind-to-panda.vercel.app/',
  },
  {
    title: 'openapi-zod-client',
    description: 'Generate a zodios API client from an OpenAPI spec',
    techs: ['Chakra-UI', 'OpenAPI', 'Zod', 'Zodios', 'React', 'TypeScript'],
    link: 'https://openapi-zod-client.vercel.app/',
  },
] satisfies Project[]
