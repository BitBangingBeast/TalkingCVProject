import { useEffect, useRef, useState } from 'react'
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

  useEffect(() => {
    if (!open) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const handleTriggerClick = () => {
    if (!open) {
      setOpen(true)
      return
    }

    onPrimary?.()
    setOpen(false)
  }

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className ?? ''}`.trim()}
    >
      <Button
        variant={variant}
        onClick={handleTriggerClick}
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
        <ul
          role="menu"
          className="animate-menu-in absolute left-0 top-full z-20 mt-3 py-1 motion-reduce:animate-none"
        >
          {items.map((item) => (
            <li key={item.label} role="none">
              <a
                role="menuitem"
                href={item.href}
                target={item.target}
                rel={item.rel}
                download={item.download}
                onClick={() => setOpen(false)}
                className="block w-fit whitespace-nowrap rounded-md px-3 py-2 text-sm text-ink-muted transition-colors hover:bg-neon-cyan/10 hover:text-neon-cyan"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
