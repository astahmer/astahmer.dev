import { Icons } from './icon-list'

interface IconProps {
  name: keyof typeof Icons
  label?: string
  color?: string
  size?: string
  className?: string
}

// https://github.com/withastro/starlight/blob/e0352809062b2ee1e5588f7c8c09af8e6f117b5d/packages/starlight/user-components/Icon.astro

export default function Icon({ name, label, size = '1em', color, className }: IconProps) {
  const a11yAttrs = label ? { 'aria-label': label } : { 'aria-hidden': 'true' as const }

  return (
    <svg
      {...a11yAttrs}
      className={className}
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      dangerouslySetInnerHTML={{ __html: Icons[name] }}
      style={{
        color: color,
        fontSize: size,
        width: '1em',
        height: '1em',
      }}
    />
  )
}
