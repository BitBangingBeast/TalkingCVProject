import { useState } from 'react'
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

export default function Navbar() {
  const [open, setOpen] = useState(false)

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
          {navItems.map((item) => (
            <li key={item.target}>
              <a
                href={`#${item.target}`}
                className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-neon-cyan"
              >
                {item.label}
              </a>
            </li>
          ))}
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
            {navItems.map((item) => (
              <li key={item.target}>
                <a
                  href={`#${item.target}`}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-neon-cyan"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  )
}
