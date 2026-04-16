import { css } from '#/styled-system/css'
import { formatDate } from '@/utils/format-date'
import type { CollectionEntry } from 'astro:content'

const isWithinDays = (date: Date, days: number) => {
  const ageInMs = new Date().getTime() - date.getTime()
  const maxAgeInMs = days * 24 * 60 * 60 * 1000

  return ageInMs >= 0 && ageInMs < maxAgeInMs
}

export const PostCard = (props: { data: CollectionEntry<'articles'> }) => {
  const { data: item } = props

  const isNew = isWithinDays(new Date(item.data.publishedAt), 7)

  return (
    <a
      href={`/posts/${item.id}`}
      class={css({
        display: 'grid',
        gap: '3',
        px: '3',
        py: '5',
        rounded: '3xl',
        borderBottom: '1px solid var(--line)',
        textDecoration: 'none',
        transition: 'transform 180ms ease, background-color 180ms ease',
        _hover: {
          transform: 'translateX(4px)',
          background: 'color-mix(in oklab, var(--paper) 78%, transparent)',
        },
        lg: { gridTemplateColumns: '10rem minmax(0, 1fr)', alignItems: 'start', gap: '4' },
      })}
    >
      <time
        datetime={item.data.publishedAt.toISOString()}
        class={css({
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem',
          fontWeight: '620',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
        })}
      >
        {formatDate(item.data.publishedAt)}
      </time>
      <div class={css({ display: 'grid', gap: '2', minW: '0' })}>
        <div class={css({ display: 'flex', alignItems: 'center', gap: '2', flexWrap: 'wrap' })}>
          <h4
            class={css({
              margin: '0',
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
              fontWeight: '600',
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
            })}
          >
            {item.data.title}
          </h4>
          {isNew && (
            <span
              class={css({
                display: 'inline-flex',
                alignItems: 'center',
                rounded: 'full',
                border: '1px solid color-mix(in oklab, var(--accent) 50%, var(--line))',
                bg: 'var(--accent-soft)',
                px: '2.5',
                py: '1',
                fontFamily: 'var(--font-display)',
                fontSize: '0.64rem',
                fontWeight: '640',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--accent-strong)',
              })}
            >
              New
            </span>
          )}
        </div>
        <p
          class={css({ margin: '0', maxW: '34rem', lineHeight: '1.6', color: 'var(--ink-muted)' })}
        >
          {item.data.description}
        </p>
      </div>
    </a>
  )
}
