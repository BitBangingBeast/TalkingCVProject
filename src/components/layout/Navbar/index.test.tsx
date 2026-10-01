import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
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

const sectionIds = [
  'heroSection',
  'about',
  'skills',
  'projects',
  'work-experience',
  'education',
  'certifications',
  'motivation',
  'contact',
]

class MockIntersectionObserver {
  static instances: MockIntersectionObserver[] = []

  callback: IntersectionObserverCallback
  observed: Element[] = []

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback
    MockIntersectionObserver.instances.push(this)
  }

  observe(element: Element) {
    this.observed.push(element)
  }

  unobserve() {}

  disconnect() {}

  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

function enterSection(id: string) {
  const observer = MockIntersectionObserver.instances.at(-1)
  const target = document.getElementById(id)
  if (!observer || !target) {
    throw new Error(`No observer or section found for ${id}`)
  }
  act(() => {
    observer.callback(
      [
        { isIntersecting: true, target } as unknown as IntersectionObserverEntry,
      ],
      observer as unknown as IntersectionObserver,
    )
  })
}

describe('Navbar', () => {
  beforeEach(() => {
    MockIntersectionObserver.instances = []
    vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
    for (const id of sectionIds) {
      const section = document.createElement('section')
      section.id = id
      document.body.appendChild(section)
    }
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    for (const id of sectionIds) {
      document.getElementById(id)?.remove()
    }
  })

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

  it('marks the section currently in view as active', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute(
      'aria-current',
      'page',
    )

    enterSection('skills')

    expect(screen.getByRole('link', { name: 'Skills' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute(
      'aria-current',
    )

    enterSection('contact')

    expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute(
      'aria-current',
      'page',
    )
    expect(screen.getByRole('link', { name: 'Skills' })).not.toHaveAttribute(
      'aria-current',
    )
  })
})
