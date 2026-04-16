import { css } from '#/styled-system/css'
import type { CollectionEntry } from 'astro:content'
import { PostCard } from './post-card'
import { Link } from './ui'

interface PostSectionProps {
  articles: CollectionEntry<'articles'>[]
  title?: string
  intro?: string
  showArchiveLink?: boolean
}

export default function PostSection({
  articles,
  title = 'Recent writing',
  intro,
  showArchiveLink = false,
}: PostSectionProps) {
  return (
    <section className={css({ display: 'grid', gap: '5' })}>
      <header
        className={css({
          display: 'grid',
          gap: '2',
        })}
      >
        <p className='section-kicker'>Writing</p>
        <div
          className={css({
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '3',
          })}
        >
          <h2 className='section-heading'>{title}</h2>
          {showArchiveLink && <Link href='/posts' label='Browse the archive' isUnderline />}
        </div>
        {intro ? <p className='section-copy'>{intro}</p> : null}
      </header>

      <section
        className={css({
          display: 'grid',
        })}
      >
        {articles
          .filter((item) => item.data.isPublish)
          .map((item) => (
            <PostCard key={item.id} data={item} />
          ))}
      </section>
    </section>
  )
}
