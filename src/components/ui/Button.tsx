import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: ButtonVariant
  className?: string
  href?: string
  target?: string
  rel?: string
}

const base =
  'inline-flex items-center justify-center rounded-lg px-6 py-3 font-display text-sm font-semibold transition-all duration-200 motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan'

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-brand text-surface shadow-lg shadow-neon-cyan/30 hover:brightness-110 hover:shadow-neon-magenta/40',
  secondary:
    'border border-neon-cyan/50 bg-transparent text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10',
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  className,
  href,
  target,
  rel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className ?? ''}`.trim()

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
