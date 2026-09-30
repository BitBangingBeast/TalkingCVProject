import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { contact } from '../../data'
import Contact from './index'

describe('Contact', () => {
  it('renders contact labels and values', () => {
    render(<Contact />)
    for (const item of contact) {
      expect(screen.getByText(item.label)).toBeInTheDocument()
      expect(screen.getByText(item.value)).toBeInTheDocument()
    }
  })

  it('renders an Email me button linking to the email address', () => {
    render(<Contact />)
    const email = contact.find((item) => item.type === 'email')
    const button = screen.getByRole('link', { name: 'Email me' })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('href', email?.link)
  })
})
