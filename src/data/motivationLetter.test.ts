import { describe, expect, it } from 'vitest'
import { motivationLetterBody } from './motivationLetter'

describe('motivationLetterBody', () => {
  it('is a non-empty string array', () => {
    expect(Array.isArray(motivationLetterBody)).toBe(true)
    expect(motivationLetterBody.length).toBeGreaterThan(0)
    for (const paragraph of motivationLetterBody) {
      expect(typeof paragraph).toBe('string')
    }
  })
})
