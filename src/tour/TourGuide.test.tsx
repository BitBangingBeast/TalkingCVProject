import { beforeAll, afterEach, describe, expect, it, vi } from 'vitest'
import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import TourGuide from './TourGuide'
import { tour } from '../data'

vi.mock('./AvatarHead', () => ({
  default: ({ mouthOpen }: { mouthOpen?: number }) => (
    <div data-testid="avatar-head" data-mouth-open={mouthOpen ?? 0} />
  ),
}))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children?: ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: () => {},
}))

beforeAll(() => {
  Object.defineProperty(HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: vi.fn().mockResolvedValue(undefined),
  })
  Object.defineProperty(HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: vi.fn(),
  })
  Object.defineProperty(Element.prototype, 'scrollIntoView', {
    configurable: true,
    value: vi.fn(),
  })
})

afterEach(() => {
  vi.useRealTimers()
})

describe('TourGuide', () => {
  it('shows the first caption', () => {
    render(<TourGuide sections={tour} onClose={() => {}} />)
    expect(screen.getByText(tour[0].caption)).toBeInTheDocument()
  })

  it('advances to the next caption when skip is clicked', async () => {
    const user = userEvent.setup()
    render(<TourGuide sections={tour} onClose={() => {}} />)
    await user.click(screen.getByRole('button', { name: 'Skip' }))
    expect(screen.getByText(tour[1].caption)).toBeInTheDocument()
  })

  it('calls onClose when close is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<TourGuide sections={tour} onClose={onClose} />)
    await user.click(screen.getByRole('button', { name: 'Close' }))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('closes automatically after the tour finishes', () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<TourGuide sections={tour} onClose={onClose} />)
    const skip = screen.getByRole('button', { name: 'Skip' })
    for (let i = 0; i < tour.length; i += 1) {
      fireEvent.click(skip)
    }
    act(() => {
      vi.advanceTimersByTime(1500)
    })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
