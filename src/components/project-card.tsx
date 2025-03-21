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
        md: { flexDirection: 'row' },
      })}
      href={link}
      target="_blank"
      rel="noreferrer"
    >
      <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', w: 'full' })}>
        <div className={css({ display: 'flex', flexDirection: 'column', gap: '2', w: 'full' })}>
          <p className={css({ color: 'fg.heading', fontWeight: 'semibold', fontSize: 'md' })}>{title}</p>
          <div className={flex({ direction: 'row', flex: '1', fontSize: 'xs' })}>
            {description ? <p>{description}</p> : null}
          </div>
        </div>
        <p className={css({ color: 'fg.secondary', display: 'inline-block', ml: 'auto', mt: 'auto', fontSize: 'xs' })}>
          {techString}
        </p>
      </div>
    </a>
  )
}
