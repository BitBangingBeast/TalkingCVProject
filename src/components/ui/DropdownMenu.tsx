import { useEffect, useRef, useState } from 'react'
import type { FocusEvent } from 'react'
import { Button } from './Button'

export interface DropdownMenuItem {
  label: string
  href: string
  target?: string
  rel?: string
  download?: boolean
}

interface DropdownMenuProps {
  label: string
  openLabel?: string
  items: DropdownMenuItem[]
  onPrimary?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

const CLOSE_DELAY_MS = 500

export function DropdownMenu({
  label,
  openLabel,
  items,
  onPrimary,
  variant = 'secondary',
  className,
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const closeTimerRef = useRef<number | null>(null)

  const clearCloseTimer = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current)
      closeTimerRef.current = null
    }
  }

  const handleMouseEnter = () => {
    clearCloseTimer()
    setOpen(true)
  }

  const handleMouseLeave = () => {
    clearCloseTimer()
    closeTimerRef.current = window.setTimeout(() => {
      closeTimerRef.current = null
      setOpen(false)
    }, CLOSE_DELAY_MS)
  }

  useEffect(() => {
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!open) {
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        clearCloseTimer()
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current?.contains(event.relatedTarget as Node)) {
      clearCloseTimer()
      setOpen(false)
    }
  }

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setOpen(true)}
      onBlur={handleBlur}
      className={`inline-block p-3 -m-3 ${className ?? ''}`.trim()}
    >
      <div className="relative inline-block">
        <Button
          variant={variant}
          onClick={() => {
            if (open) {
              onPrimary?.()
            }
          }}
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <span
            key={open ? 'open' : 'closed'}
            className="inline-block animate-fade-slide motion-reduce:animate-none"
          >
            {open ? (openLabel ?? label) : label}
          </span>
        </Button>

        {open ? (
          <div className="absolute left-0 top-full z-20 pt-2">
            <ul
              role="menu"
              className="animate-menu-in py-1 motion-reduce:animate-none"
            >
              {items.map((item) => (
                <li key={item.label} role="none">
                  <a
                    role="menuitem"
                    href={item.href}
                    target={item.target}
                    rel={item.rel}
                    download={item.download}
                    onClick={() => {
                      clearCloseTimer()
                      setOpen(false)
                    }}
                    className="block w-fit whitespace-nowrap rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
