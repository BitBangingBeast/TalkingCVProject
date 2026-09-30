import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button, Card, Section, SectionHeading } from './index'

describe('Button', () => {
  it('renders its label', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('applies the primary variant by default', () => {
    render(<Button>Primary</Button>)
    expect(screen.getByRole('button', { name: 'Primary' })).toHaveClass(
      'bg-gradient-brand',
    )
  })

  it('applies the secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>)
    expect(screen.getByRole('button', { name: 'Secondary' })).toHaveClass(
      'border-neon-cyan/50',
    )
  })

  it('renders as an anchor when href is given', () => {
    render(<Button href="/about">About</Button>)
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute(
      'href',
      '/about',
    )
  })
})

describe('Card', () => {
  it('renders its children', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>,
    )
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })
})

describe('SectionHeading', () => {
  it('renders the title as an h2 by default', () => {
    render(<SectionHeading title="Our Skills" />)
    expect(
      screen.getByRole('heading', { level: 2, name: 'Our Skills' }),
    ).toBeInTheDocument()
  })

  it('renders the eyebrow and subtitle when provided', () => {
    render(
      <SectionHeading
        eyebrow="What I do"
        title="Our Skills"
        subtitle="A summary of expertise"
      />,
    )
    expect(screen.getByText('What I do')).toBeInTheDocument()
    expect(screen.getByText('A summary of expertise')).toBeInTheDocument()
  })
})

describe('Section', () => {
  it('renders its children and sets the id', () => {
    const { container } = render(
      <Section id="skills">
        <p>Hello world</p>
      </Section>,
    )
    expect(container.querySelector('section')).toHaveAttribute('id', 'skills')
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
