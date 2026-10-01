import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { motivationLetterBody, site } from '../../data'
import MotivationLetter from './index'

describe('MotivationLetter', () => {
  it('renders a paragraph of the letter body', () => {
    render(<MotivationLetter />)
    expect(screen.getByText(motivationLetterBody[0])).toBeInTheDocument()
  })

  it('exposes a menu with a download option for the letter', async () => {
    const user = userEvent.setup()
    render(<MotivationLetter />)

    await user.hover(screen.getByRole('button', { name: 'Motivation Letter' }))

    expect(
      screen.getByRole('menuitem', { name: 'Download PDF' }),
    ).toHaveAttribute('href', site.motivationLetter.downloadUrl)
  })
})
