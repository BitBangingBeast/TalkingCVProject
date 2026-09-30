import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { motivationLetterBody, site } from '../../data'
import MotivationLetter from './index'

describe('MotivationLetter', () => {
  it('renders a paragraph of the letter body', () => {
    render(<MotivationLetter />)
    expect(screen.getByText(motivationLetterBody[0])).toBeInTheDocument()
  })

  it('renders the Preview and Download buttons with correct hrefs', () => {
    render(<MotivationLetter />)

    const preview = screen.getByRole('link', {
      name: 'Preview in new window',
    })
    expect(preview).toHaveAttribute('href', site.motivationLetter.previewUrl)
    expect(preview).toHaveAttribute('target', '_blank')

    const download = screen.getByRole('link', { name: 'Download PDF' })
    expect(download).toHaveAttribute('href', site.motivationLetter.downloadUrl)
  })
})
