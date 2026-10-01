import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { projects } from '../../data/projects'
import { skills } from '../../data/skills'
import Projects from './index'

describe('Projects', () => {
  it('renders every project title', () => {
    render(<Projects />)
    for (const project of projects) {
      expect(screen.getByText(project.title)).toBeInTheDocument()
    }
  })

  it('opens external project links in a new tab', () => {
    render(<Projects />)
    const links = [
      ...screen.getAllByRole('link', { name: 'View in GitHub' }),
      ...screen.getAllByRole('link', { name: 'Live' }),
    ]
    expect(links).toHaveLength(projects.length * 2)
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders tech tag names resolved from skills', () => {
    render(<Projects />)
    const skillNames = new Map(skills.map((skill) => [skill.id, skill.name]))
    const techNames = new Set(
      projects.flatMap((project) =>
        project.tech.map((id) => skillNames.get(id) ?? id),
      ),
    )
    for (const name of techNames) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0)
    }
  })
})
