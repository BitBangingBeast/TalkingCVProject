import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Card, Section, SectionHeading } from '../../components/ui'
import { certifications } from '../../data'

export default function Certifications() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  const active = certifications.find((cert) => cert.id === activeId) ?? null

  const close = useCallback(() => setActiveId(null), [])

  const open = useCallback((id: string) => {
    triggerRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null
    setActiveId(id)
  }, [])

  useEffect(() => {
    if (activeId) {
      closeButtonRef.current?.focus()
      return
    }
    triggerRef.current?.focus()
    triggerRef.current = null
  }, [activeId])

  useEffect(() => {
    if (!activeId) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        return
      }
      if (event.key !== 'Tab') return
      const dialog = dialogRef.current
      if (!dialog) return
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) {
        event.preventDefault()
        return
      }
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey) {
        if (
          document.activeElement === first ||
          !dialog.contains(document.activeElement)
        ) {
          event.preventDefault()
          last.focus()
        }
      } else if (
        document.activeElement === last ||
        !dialog.contains(document.activeElement)
      ) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [activeId, close])

  return (
    <Section id="certifications">
      <SectionHeading
        title="Certifications"
        subtitle="Recommendation letters, certificates, and transcripts gathered along the way."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="flex flex-col overflow-hidden p-0">
            <button
              type="button"
              onClick={() => open(cert.id)}
              aria-label={`View ${cert.title} from ${cert.issuer}`}
              className="group flex flex-col text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
            >
              <img
                src={cert.image}
                alt=""
                className="h-40 w-full object-cover transition-transform duration-200 motion-reduce:transition-none group-hover:scale-105 motion-reduce:group-hover:scale-100"
              />
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-ink">
                  {cert.title}
                </h3>
                <p className="mt-1 text-xs text-ink-muted">{cert.issuer}</p>
              </div>
            </button>
          </Card>
        ))}
      </div>

      {active
        ? createPortal(
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={active.title}
              className="fixed inset-0 z-50 flex items-center justify-center bg-surface/90 p-4"
              onClick={close}
            >
              <div
                className="relative max-h-full max-w-4xl"
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={close}
                  aria-label="Close"
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-surface-raised text-ink transition-colors hover:text-neon-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
                >
                  ×
                </button>
                <img
                  src={active.image}
                  alt={active.title}
                  className="max-h-[85vh] w-auto rounded-lg"
                />
                <p className="mt-3 text-center text-sm text-ink-muted">
                  {active.title} — {active.issuer}
                </p>
              </div>
            </div>,
            document.body,
          )
        : null}
    </Section>
  )
}
