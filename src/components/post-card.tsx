import { css } from '#/styled-system/css'
import { formatDate } from '@/utils/format-date'
import type { CollectionEntry } from 'astro:content'

export const PostCard = (props: { data: CollectionEntry<'articles'> }) => {
  const { data: item } = props

  return (
    <a
      href={`/posts/${item.slug}`}
      class={css({
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
