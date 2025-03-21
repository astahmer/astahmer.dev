import Link from '@/components/ui/link'
import { presentation } from '@/data/presentation'
import { css } from '#/styled-system/css'

export default function SocialLinks() {
  return (
    <ul role="list" className={css({ display: 'flex', flexDirection: 'row', gap: '2' })}>
      {presentation.socials.map((social, index) => (
        <>
          <li key={social.link}>
            <Link href={social.link} label={social.label} css={social.css} />
          </li>

          {presentation.socials.length - 1 !== index && <li key={`separator-${index}`}>/</li>}
        </>
      ))}
    </ul>
  )
}
