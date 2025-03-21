import { css } from '#/styled-system/css'

export default function Header() {
  return (
    <header role="navigation" className={css({ display: 'flex', gap: '4' })}>
      <a
        className={css({
          textDecoration: 'underline',
          _hover: { color: 'fg.secondary' },
        })}
        href="/"
      >
        Home
      </a>
      <a
        className={css({
          textDecoration: 'underline',
          _hover: { color: 'fg.secondary' },
        })}
        href="/posts"
      >
        Posts
      </a>
    </header>
  )
}
