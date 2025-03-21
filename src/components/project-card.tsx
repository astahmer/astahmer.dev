import type { Project } from '@/data/projects'
import { css } from '#/styled-system/css'
import { flex } from '#/styled-system/patterns'

type ProjectCardProps = Project

const formatTechs = (values: string[]) => values.toString().replaceAll(',', ' • ')

export default function ProjectCard({ title, techs, description, link }: ProjectCardProps) {
  const techString = formatTechs(techs ?? [])

  return (
    <a
      className={css({
        display: 'flex',
        width: 'full',
        cursor: 'pointer',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '2',
        borderRadius: 'md',
        padding: '4',
        bg: {
          base: 'neutral.200/40',
          _hover: 'neutral.400/40',
          _dark: {
            base: 'neutral.700/40',
            _hover: 'neutral.500/40',
          },
        },
        md: { flexDirection: 'row', alignItems: 'center' },
      })}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div
        className={css({
          display: 'flex',
          flexDirection: 'column',
          gap: '4',
          md: { flexDirection: 'row', alignItems: 'center' },
          w: 'full',
        })}
      >
        <p className={css({ color: 'fg.heading', fontWeight: 'semibold' })}>{title}</p>
        <div className={flex({ direction: 'row', flex: '1', fontSize: 'xs' })}>
          {description ? <p>{description}</p> : null}
          <p className={css({ display: 'inline-block', ml: 'auto' })}>{techString}</p>
        </div>
      </div>

      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        className={css({
          transition: 'all',
          transitionDuration: '250ms',
          transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',
          _groupHover: {
            transform: 'translateY(token(spacing.2))',
          },
        })}
      >
        <path d="M5.25 12.75L12.75 5.25" stroke="#999999" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M5.25 5.25H12.75V12.75" stroke="#999999" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  )
}
