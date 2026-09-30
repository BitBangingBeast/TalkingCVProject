import type { JSX } from 'react'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  subtitle?: string
  as?: JSX.ElementType
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as: Heading = 'h2',
}: SectionHeadingProps) {
  return (
    <div className="mb-12 flex flex-col items-center gap-3 text-center">
      {eyebrow ? (
        <span className="text-xs font-semibold uppercase tracking-widest text-ink-muted">
          {eyebrow}
        </span>
      ) : null}
      <Heading className="text-gradient font-display text-3xl font-bold md:text-4xl">
        {title}
      </Heading>
      {subtitle ? (
        <p className="max-w-2xl text-base text-ink-muted">{subtitle}</p>
      ) : null}
    </div>
  )
}
