import { css, cx } from '#/styled-system/css'

type HeaderProps = {
  pathname: string
}

const navItems = [
  { href: '/', label: 'Home', match: (pathname: string) => pathname === '/' },
  { href: '/posts', label: 'Writing', match: (pathname: string) => pathname.startsWith('/posts') },
]

export default function Header({ pathname }: HeaderProps) {
  return (
    <header
      role='navigation'
      aria-label='Primary'
      className={css({
        display: 'flex',
        flex: '1',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        gap: '4',
      })}
    >
      <a
        href='/'
        className={css({
          display: 'inline-flex',
          alignItems: 'baseline',
          gap: '0.55rem',
          fontFamily: 'var(--font-display)',
          textDecoration: 'none',
          color: 'var(--ink)',
          flexShrink: '0',
        })}
      >
        <span className={css({ fontSize: '0.88rem', fontWeight: '560', letterSpacing: '-0.01em' })}>
          astahmer.dev
        </span>
        <span
          className={css({
            fontSize: '0.72rem',
            fontWeight: '400',
            color: 'var(--ink-soft)',
            letterSpacing: '0',
          })}
        >
          Alexandre Stahmer
        </span>
      </a>

      <nav
        className={css({
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2',
          alignItems: 'center',
          ml: 'auto',
        })}
      >
        {navItems.map((item) => {
          const isActive = item.match(pathname)

          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cx(
                'nav-link',
                isActive ? 'is-active' : undefined,
                css({
                  display: 'inline-flex',
                  alignItems: 'center',
                  px: '0',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.82rem',
                  textDecoration: 'none',
                }),
              )}
            >
              {item.label}
            </a>
          )
        })}
      </nav>
    </header>
  )
}
