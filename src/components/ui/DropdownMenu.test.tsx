import { describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DropdownMenu } from './DropdownMenu'
import type { DropdownMenuItem } from './DropdownMenu'

const items: DropdownMenuItem[] = [
  {
    label: 'Preview CV',
    href: '/docs/cv.pdf',
    target: '_blank',
    rel: 'noopener noreferrer',
  },
  { label: 'Download CV', href: '/docs/cv.pdf', download: true },
]

describe('DropdownMenu', () => {
  it('opens the menu and switches the trigger label on hover', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu label="CV" openLabel="Preview CV" items={items} />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await user.hover(screen.getByRole('button', { name: 'CV' }))

    expect(screen.getByRole('menu')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Preview CV' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('menuitem', { name: 'Preview CV' }),
    ).toHaveAttribute('href', '/docs/cv.pdf')
    expect(
      screen.getByRole('menuitem', { name: 'Download CV' }),
    ).toHaveAttribute('href', '/docs/cv.pdf')
  })

  it('closes shortly after the pointer leaves', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu label="CV" openLabel="Preview CV" items={items} />)

    const trigger = screen.getByRole('button', { name: 'CV' })
    await user.hover(trigger)
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.unhover(trigger)
    await waitFor(() =>
      expect(screen.queryByRole('menu')).not.toBeInTheDocument(),
    )
  })

  it('invokes onPrimary when the trigger is clicked while open', async () => {
    const user = userEvent.setup()
    const onPrimary = vi.fn()
    render(
      <DropdownMenu
        label="CV"
        openLabel="Preview CV"
        items={items}
        onPrimary={onPrimary}
      />,
    )

    await user.hover(screen.getByRole('button', { name: 'CV' }))
    await user.click(screen.getByRole('button', { name: 'Preview CV' }))

    expect(onPrimary).toHaveBeenCalledTimes(1)
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu label="CV" openLabel="Preview CV" items={items} />)

    await user.hover(screen.getByRole('button', { name: 'CV' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
