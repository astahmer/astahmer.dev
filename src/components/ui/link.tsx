import { css } from '#/styled-system/css'
import type { SystemStyleObject } from '#/styled-system/types'
import type React from 'preact/compat'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  label: string
  css?: SystemStyleObject
  isUnderline?: boolean
}

export default function Link({ label, css: cssProp, isUnderline, ...props }: LinkProps) {
  const isInternal = props.href?.toString().startsWith('/')
  const externalProps = isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' }

  return (
    <a
      {...props}
      {...externalProps}
      className={[
        css({ _hover: { color: 'fg.heading' }, cursor: 'pointer' }, cssProp ?? {}),
        isUnderline &&
          css({ textDecorationLine: 'underline', textDecorationStyle: 'dashed', textUnderlineOffset: '8px' }),
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
      <span className={css({ srOnly: true })}>{label} link</span>
    </a>
  )
}
