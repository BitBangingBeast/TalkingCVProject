import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DocumentMenu } from './DocumentMenu'

const props = {
  label: 'Motivation Letter',
  openLabel: 'Preview',
  previewUrl: '/docs/motivation-letter.pdf',
  downloadUrl: '/docs/motivation-letter.pdf',
  downloadLabel: 'Download PDF',
}

describe('DocumentMenu', () => {
  it('shows a download option on hover', async () => {
    const user = userEvent.setup()
    render(<DocumentMenu {...props} />)

    await user.hover(screen.getByRole('button', { name: 'Motivation Letter' }))

    expect(
      screen.getByRole('menuitem', { name: 'Download PDF' }),
    ).toHaveAttribute('href', '/docs/motivation-letter.pdf')
  })

  it('opens the preview when the trigger is clicked while open', async () => {
    const user = userEvent.setup()
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null)
    render(<DocumentMenu {...props} />)

    await user.hover(screen.getByRole('button', { name: 'Motivation Letter' }))
    await user.click(screen.getByRole('button', { name: 'Preview' }))

    expect(openSpy).toHaveBeenCalledWith(
      '/docs/motivation-letter.pdf',
      '_blank',
      'noopener,noreferrer',
    )
    openSpy.mockRestore()
  })
})
