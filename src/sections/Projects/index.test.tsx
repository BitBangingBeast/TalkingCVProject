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
