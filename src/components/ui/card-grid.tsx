import { css } from '#/styled-system/css'

interface CardGridProps {
  stagger?: boolean
  children: React.ReactNode
}

// https://github.com/withastro/starlight/blob/e0352809062b2ee1e5588f7c8c09af8e6f117b5d/packages/starlight/user-components/CardGrid.astro
export default function CardGrid({ stagger = false, children }: CardGridProps) {
  return (
    <div
      className={[
        css({
          display: 'grid',
          gap: '1rem',
          '& > *': { marginTop: 0 },
          '@media (min-width: 50rem)': {
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            '&.stagger': {
              '--stagger-height': '5rem',
              paddingBottom: 'var(--stagger-height)',
            },
            '&.stagger > *:nth-child(2n)': {
              transform: 'translateY(var(--stagger-height))',
            },
          },
        }),
        stagger ? 'stagger' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  )
}
