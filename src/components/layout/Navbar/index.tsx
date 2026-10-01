import { useEffect, useState } from 'react'
import { site } from '../../../data'

const navItems: Array<{ label: string; target: string }> = [
  { label: 'Home', target: 'heroSection' },
  { label: 'About', target: 'about' },
  { label: 'Skills', target: 'skills' },
  { label: 'Projects', target: 'projects' },
  { label: 'Work Experience', target: 'work-experience' },
  { label: 'Education', target: 'education' },
  { label: 'Certifications', target: 'certifications' },
  { label: 'Motivation', target: 'motivation' },
  { label: 'Contact', target: 'contact' },
]

const linkBase =
  'rounded-lg px-3 py-2 text-sm transition-colors hover:text-neon-cyan'
const linkActive = 'bg-neon-cyan/10 font-medium text-neon-cyan'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(navItems[0].target)

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      return
    }

    const elements = navItems
      .map((item) => document.getElementById(item.target))
      .filter((element): element is HTMLElement => element !== null)

    if (elements.length === 0) {
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    )

    for (const element of elements) {
      observer.observe(element)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-ink/10 bg-surface/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#heroSection"
          className="text-gradient font-display text-lg font-bold"
        >
          {site.name}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.target
            return (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`${linkBase} ${isActive ? linkActive : 'text-ink-muted'}`}
                >
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg p-2 text-ink-muted transition-colors hover:text-neon-cyan md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {open ? (
        <div className="border-t border-ink/10 bg-surface md:hidden">
          <ul className="flex flex-col px-6 py-4">
            {navItems.map((item) => {
              const isActive = activeSection === item.target
              return (
                <li key={item.target}>
                  <a
                    href={`#${item.target}`}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`block ${linkBase} ${isActive ? linkActive : 'text-ink-muted'}`}
                  >
                    {item.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
