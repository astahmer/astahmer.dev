import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

const generateContentId = ({ entry }: { entry: string }) =>
  entry.replace(/\.(md|mdx)$/u, '').replace(/(^|\/)\d+-/gu, '$1')

const sharedSchema = z.object({
  title: z.string(),
  publishedAt: z.coerce.date(),
  description: z.string().optional(),
  isPublish: z.boolean(),
  isDraft: z.boolean().default(false),
  atUri: z.string().optional(), // AT-URI of the site.standard.document record
})

const articlesCollection = defineCollection({
  loader: glob({
    base: './src/content/articles',
    generateId: generateContentId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: sharedSchema,
})

const postsCollection = defineCollection({
  loader: glob({
    base: './src/content/posts',
    generateId: generateContentId,
    pattern: '**/*.{md,mdx}',
  }),
  schema: sharedSchema,
})

export const collections = {
  articles: articlesCollection,
  posts: postsCollection,
}
