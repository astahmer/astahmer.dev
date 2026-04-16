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
          display: 'grid',
          gap: '1',
          textDecoration: 'none',
          color: 'var(--ink)',
          flexShrink: '0',
        })}
      >
        <span
          className={css({
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            fontWeight: '630',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: 'var(--ink-soft)',
          })}
        >
          Alexandre Stahmer
        </span>
        <span
          className={css({
            fontFamily: 'var(--font-display)',
            fontSize: '1.12rem',
            fontWeight: '600',
            letterSpacing: '-0.03em',
          })}
        >
          astahmer.dev
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
                  rounded: 'full',
                  px: '3',
                  py: '2',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.72rem',
                  fontWeight: '620',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
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
