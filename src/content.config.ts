import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'

type GlobOptions = Parameters<typeof glob>[0]
type GenerateIdOptions = Parameters<NonNullable<GlobOptions["generateId"]>>[0]

const generateContentId = (options: GenerateIdOptions) =>
  (options.data as z.infer<typeof sharedSchema>).slug

const sharedSchema = z.object({
  title: z.string(),
  publishedAt: z.coerce.date(),
  description: z.string().optional(),
  isPublish: z.boolean(),
  isDraft: z.boolean().default(false),
  atUri: z.string().optional(), // AT-URI of the site.standard.document record
  slug: z.string(),
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
