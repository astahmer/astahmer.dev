import { css } from '#/styled-system/css'
import { formatDate } from '@/utils/format-date'
import type { CollectionEntry } from 'astro:content'

const isWithinDays = (date: Date, days: number) => {
  return new Date().getTime() - date.getTime() <= days * 24 * 60 * 60 * 1000
}

export const PostCard = (props: { data: CollectionEntry<'articles'> }) => {
  const { data: item } = props

  const isNew = isWithinDays(new Date(item.data.publishedAt), 8)

  return (
    <a
      href={`/posts/${item.slug}`}
      class={css({
        position: 'relative',
        display: 'flex',
        gap: '2',
        p: '4',
        rounded: 'md',
        bg: {
          base: 'neutral.200/40',
          _hover: 'neutral.300/40',
          _dark: {
            base: 'neutral.700/40',
            _hover: 'neutral.500/40',
          },
        },
        textDecoration: 'none',
        transition: 'all 0.2s ease-in-out',
      })}
    >
      {isNew && (
        <div
          class={css({
            position: 'absolute',
            bottom: '100%',
            right: '0',
            marginBottom: '1',
            transform: 'translateY(50%)',
            display: 'inline-flex',
            bg: {
              base: 'yellow.500',
              _dark: 'yellow.300',
            },
            color: {
              base: 'white',
              _dark: 'gray.900',
            },
            py: '1',
            px: '2',
            rounded: 'full',
            textStyle: 'sm',
            fontWeight: 'semibold',
            fontSize: 'xs',
          })}
        >
          new!
        </div>
      )}
      <div class={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
        <h4 class={css({ textStyle: 'sm', color: 'fg.heading', fontWeight: 'semibold' })}>{item.data.title}</h4>
        <p class={css({ textStyle: 'xs', color: 'fg.subtle' })}>{item.data.description}</p>
      </div>
      <div class={css({ display: 'flex', ml: 'auto', textStyle: 'xs', color: 'fg.subtle' })}>
        <time datetime={item.data.publishedAt.toISOString()}>{formatDate(item.data.publishedAt)}</time>
      </div>
    </a>
  )
}
