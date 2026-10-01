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

  it('makes the email, phone, and LinkedIn cards clickable', () => {
    render(<Contact />)
    for (const type of ['email', 'linkedin', 'phone']) {
      const item = contact.find((entry) => entry.type === type)
      expect(item).toBeDefined()
      expect(screen.getByText(item!.value).closest('a')).toHaveAttribute(
        'href',
        item!.link,
      )
    }
  })

  it('does not link the location card', () => {
    render(<Contact />)
    const location = contact.find((entry) => entry.type === 'location')
    expect(location).toBeDefined()
    expect(screen.getByText(location!.value).closest('a')).toBeNull()
  })
})
