import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Hero from './index'
import { site } from '../../data'

describe('Hero', () => {
  it('renders name, headline, and the Start the Tour button', () => {
    render(<Hero />)
    expect(
      screen.getByRole('heading', { name: site.name }),
    ).toBeInTheDocument()
    expect(screen.getByText(site.headline)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Start the Tour' }),
    ).toBeInTheDocument()
  })

  it('calls onStartTour when Start the Tour is clicked', async () => {
    const user = userEvent.setup()
    const onStartTour = vi.fn()
    render(<Hero onStartTour={onStartTour} />)

    await user.click(screen.getByRole('button', { name: 'Start the Tour' }))

    expect(onStartTour).toHaveBeenCalledTimes(1)
  })

  it('opens a CV menu with a download option', async () => {
    const user = userEvent.setup()
    render(<Hero />)

    await user.hover(screen.getByRole('button', { name: 'CV' }))

    expect(
      screen.getByRole('menuitem', { name: 'Download CV' }),
    ).toHaveAttribute('href', site.cv.downloadUrl)
    expect(
      screen.queryByRole('menuitem', { name: 'Preview CV' }),
    ).not.toBeInTheDocument()
  })

  it('opens the CV preview when the CV button is clicked while open', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<Hero />)

    await user.hover(screen.getByRole('button', { name: 'CV' }))
    await user.click(screen.getByRole('button', { name: 'Preview CV' }))

    expect(openSpy).toHaveBeenCalledWith(
      site.cv.previewUrl,
      '_blank',
      'noopener,noreferrer',
    )
    openSpy.mockRestore()
  })
})
