import type { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  id?: string
  className?: string
}

export function Section({ children, id, className }: SectionProps) {
  return (
    <section id={id} className={`py-24 ${className ?? ''}`.trim()}>
      <div className="mx-auto w-full max-w-6xl px-6">{children}</div>
    </section>
  )
}
