import Link from '@/components/ui/link'
import { presentation } from '@/data/presentation'
import { css } from '#/styled-system/css'

export default function SocialLinks() {
  return (
    <ul
      role='list'
      className={css({
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '2',
        p: '0',
        m: '0',
        listStyle: 'none',
      })}
    >
      {presentation.socials.map((social, index) => (
        <>
          <li key={social.link}>
            <Link
              href={social.link}
              label={social.label}
              css={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.72rem',
                fontWeight: '620',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--ink-soft)',
              }}
            />
          </li>

          {presentation.socials.length - 1 !== index && (
            <li key={`separator-${index}`} className={css({ color: 'var(--ink-soft)' })}>
              /
            </li>
          )}
        </>
      ))}
    </ul>
  )
}
