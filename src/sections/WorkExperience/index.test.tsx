import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { experiences } from '../../data/experience'
import WorkExperience from './index'

describe('WorkExperience', () => {
  it('renders every role and company', () => {
    render(<WorkExperience />)
    for (const experience of experiences) {
      expect(screen.getByText(experience.role)).toBeInTheDocument()
      expect(screen.getByText(experience.company)).toBeInTheDocument()
    }
  })
})
