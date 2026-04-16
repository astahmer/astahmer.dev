import type { Project } from '@/data/projects'
import { css } from '#/styled-system/css'
import { flex } from '#/styled-system/patterns'

type ProjectCardProps = Project
type IndexedProjectCardProps = ProjectCardProps & {
  index: number
}

const formatTechs = (values: string[]) => values.toString().replaceAll(',', ' • ')

export default function ProjectCard({
  title,
  techs,
  description,
  link,
  index,
}: IndexedProjectCardProps) {
  const techString = formatTechs(techs ?? [])
  const paddedIndex = index.toString().padStart(2, '0')

  return (
    <a
      className={css({
        display: 'grid',
        width: 'full',
        cursor: 'pointer',
        gap: '4',
        rounded: '3xl',
        px: '3',
        py: '5',
        borderBottom: '1px solid var(--line)',
        textDecoration: 'none',
        transition: 'transform 180ms ease, background-color 180ms ease',
        _hover: {
          transform: 'translateX(4px)',
          background: 'color-mix(in oklab, var(--paper) 78%, transparent)',
        },
        lg: {
          gridTemplateColumns: '4rem minmax(0, 1fr) minmax(0, 15rem)',
          alignItems: 'baseline',
        },
      })}
      href={link}
      target='_blank'
      rel='noreferrer'
    >
      <span
        className={css({
          fontFamily: 'var(--font-display)',
          fontSize: '0.72rem',
          fontWeight: '620',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
        })}
      >
        {paddedIndex}
      </span>
      <div className={css({ display: 'grid', gap: '2', minW: '0' })}>
        <div
          className={css({ display: 'flex', alignItems: 'baseline', gap: '2', flexWrap: 'wrap' })}
        >
          <p
            className={css({
              margin: '0',
              fontFamily: 'var(--font-display)',
              fontWeight: '600',
              fontSize: 'clamp(1.2rem, 2vw, 1.65rem)',
              letterSpacing: '-0.03em',
              color: 'var(--ink)',
            })}
          >
            {title}
          </p>
          <span
            className={css({ color: 'var(--accent-strong)', fontSize: 'lg' })}
            aria-hidden='true'
          >
            ↗
          </span>
        </div>
        <div className={flex({ direction: 'row', flex: '1' })}>
          {description ? (
            <p
              className={css({
                margin: '0',
                maxW: '35rem',
                lineHeight: '1.6',
                color: 'var(--ink-muted)',
              })}
            >
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <p
        className={css({
          margin: '0',
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          fontWeight: '620',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink-soft)',
          lg: { textAlign: 'right', justifySelf: 'end', maxW: '15rem' },
        })}
      >
        {techString}
      </p>
    </a>
  )
}
