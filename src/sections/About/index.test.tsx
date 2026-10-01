import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './index'
import { site } from '../../data'

describe('About', () => {
  it('renders the bio', () => {
    render(<About />)
    expect(screen.getByText(site.bio)).toBeInTheDocument()
  })

  it('renders the quick facts', () => {
    render(<About />)
    expect(screen.getByText(site.quickFacts.location)).toBeInTheDocument()
    expect(screen.getByText(site.quickFacts.focus)).toBeInTheDocument()
    expect(screen.getByText(site.quickFacts.status)).toBeInTheDocument()
    expect(screen.getByText(site.quickFacts.availability)).toBeInTheDocument()
  })
})
