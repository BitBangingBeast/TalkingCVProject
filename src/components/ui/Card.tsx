import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  const classes = [
    'rounded-2xl border border-ink/10 bg-surface-raised p-6 transition-all duration-200 motion-reduce:transition-none',
    'hover:border-neon-cyan/40 hover:shadow-lg hover:shadow-neon-cyan/20',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={classes}>{children}</div>
}
