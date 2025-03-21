import Icon from './icon'
import type { Icons } from './icon-list'
import { css } from '#/styled-system/css'

interface CardProps {
  icon?: keyof typeof Icons
  title: string
  children: React.ReactNode
}

// https://github.com/withastro/starlight/blob/e0352809062b2ee1e5588f7c8c09af8e6f117b5d/packages/starlight/user-components/Card.astro

export default function Card({ icon, title, children }: CardProps) {
  return (
    <article
      className={css({
        display: 'flex',
        flexDirection: 'column',
        padding: '4',
        border: '1px solid tokens(colors.gray.100)',
        backgroundColor: 'gray.800',
      })}
    >
      <span
        className={css({
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          textStyle: 'lg',
        })}
      >
        {icon && (
          <Icon
            name={icon}
            className={css({
              padding: '0.2em',
              borderRadius: '0.25rem',
            })}
            size="1.333em"
          />
        )}
        <span dangerouslySetInnerHTML={{ __html: title }} />
      </span>
      <div className={css({ margin: 0, textStyle: 'sm' })}>{children}</div>
    </article>
  )
}
