import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skills from './index'
import { skills } from '../../data'

describe('Skills', () => {
  it('renders all skill names', () => {
    render(<Skills />)
    for (const skill of skills) {
      expect(
        screen.getByRole('heading', { name: skill.name }),
      ).toBeInTheDocument()
    }
  })

  it('renders the three category group headings', () => {
    render(<Skills />)
    expect(
      screen.getByRole('heading', { name: 'Languages' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Frameworks & Tools' }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: 'Concepts & Practices' }),
    ).toBeInTheDocument()
  })
})
