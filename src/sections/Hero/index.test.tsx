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
})
