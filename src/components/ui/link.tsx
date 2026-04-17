import { css } from '#/styled-system/css'
import type { SystemStyleObject } from '#/styled-system/types'
import type { ComponentProps } from 'preact'

interface LinkProps extends Omit<ComponentProps<'a'>, 'children'> {
  label: string
  css?: SystemStyleObject
  isUnderline?: boolean
}

export default function Link({ label, css: cssProp, isUnderline, className, ...props }: LinkProps) {
  const isInternal = props.href?.toString().startsWith('/')
  const externalProps = isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <a
      {...props}
      {...externalProps}
      className={[
        css(
          {
            cursor: 'pointer',
            color: 'var(--ink-muted)',
            textDecorationThickness: '1px',
            textUnderlineOffset: '0.18em',
            textDecorationColor: 'color-mix(in oklab, var(--line-strong) 70%, transparent)',
            transition: 'color 180ms ease, text-decoration-color 180ms ease',
            _hover: {
              color: 'var(--accent-strong)',
              textDecorationColor: 'var(--accent-strong)',
            },
          },
          cssProp ?? {},
        ),
        isUnderline &&
          css({
            textDecorationLine: 'underline',
          }),
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
      <span className={css({ srOnly: true })}>{label} link</span>
    </a>
  )
}
