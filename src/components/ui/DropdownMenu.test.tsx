import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
  it('opens the menu and switches the trigger label on first click', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu label="CV" openLabel="Preview CV" items={items} />)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'CV' }))

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

  it('invokes onPrimary on the second click', async () => {
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

    await user.click(screen.getByRole('button', { name: 'CV' }))
    await user.click(screen.getByRole('button', { name: 'Preview CV' }))

    expect(onPrimary).toHaveBeenCalledTimes(1)
  })

  it('closes when clicking outside', async () => {
    const user = userEvent.setup()
    render(
      <div>
        <DropdownMenu label="CV" items={items} />
        <button type="button">Outside</button>
      </div>,
    )

    await user.click(screen.getByRole('button', { name: 'CV' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Outside' }))
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('closes on Escape', async () => {
    const user = userEvent.setup()
    render(<DropdownMenu label="CV" items={items} />)

    await user.click(screen.getByRole('button', { name: 'CV' }))
    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})
