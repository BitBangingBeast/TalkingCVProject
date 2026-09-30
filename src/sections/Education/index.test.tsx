import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { education } from '../../data/education'
import Education from './index'

describe('Education', () => {
  it('renders every degree and school', () => {
    render(<Education />)
    for (const item of education) {
      expect(screen.getByText(item.degree)).toBeInTheDocument()
      expect(screen.getByText(item.school)).toBeInTheDocument()
    }
  })
})
