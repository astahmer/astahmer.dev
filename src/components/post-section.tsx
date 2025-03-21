import { css } from '#/styled-system/css'
import type { CollectionEntry } from 'astro:content'
import { PostCard } from './post-card'
import { Link } from './ui'

interface PostSectionProps {
  articles: CollectionEntry<'articles'>[]
}

export default function PostSection({ articles }: PostSectionProps) {
  return (
    <article className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
      <header className={css({ display: 'flex', w: 'full', flexDir: 'row', justifyContent: 'space-between' })}>
        <h3>
          <Link
            css={{ textStyle: 'lg', color: 'fg.heading', _hover: { color: 'yellow.300' } }}
            href="/posts"
            label={`Posts${articles.length > 0 ? ` (${articles.length})` : ''}`}
          />
        </h3>
      </header>

      <section className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
        {articles
          .filter((item) => item.data.isPublish)
          .map((item) => (
            <PostCard key={item.id} data={item} />
          ))}
      </section>
    </article>
  )
}
