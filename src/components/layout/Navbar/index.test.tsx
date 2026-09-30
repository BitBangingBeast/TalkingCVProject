import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from './index'

const labels = [
  'Home',
  'About',
  'Skills',
  'Projects',
  'Work Experience',
  'Education',
  'Certifications',
  'Motivation',
  'Contact',
]

describe('Navbar', () => {
  it('renders nav links', () => {
    render(<Navbar />)
    for (const label of labels) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('toggles the menu when the hamburger is clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar />)

    const button = screen.getByRole('button', { name: /toggle menu/i })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByRole('link', { name: 'About' })).toHaveLength(2)

    await user.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
