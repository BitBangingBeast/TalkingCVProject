import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Certifications from './index'

describe('Certifications', () => {
  it('renders certification titles', () => {
    render(<Certifications />)
    expect(screen.getByText('Certificate of Appreciation')).toBeInTheDocument()
    expect(screen.getByText('Transcript of Records')).toBeInTheDocument()
  })

  it('opens the lightbox when a thumbnail is clicked', () => {
    render(<Certifications />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: /Transcript of Records/ }),
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(
      screen.getByRole('img', { name: 'Transcript of Records' }),
    ).toBeInTheDocument()
  })

  it('closes the lightbox on Escape', () => {
    render(<Certifications />)
    fireEvent.click(
      screen.getByRole('button', { name: /Transcript of Records/ }),
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    fireEvent.keyDown(document, { key: 'Escape' })
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
