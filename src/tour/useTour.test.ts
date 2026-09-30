import { describe, expect, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useTour } from './useTour'
import type { TourSection } from '../data'

const sections: TourSection[] = [
  {
    id: 'a',
    sectionId: 'one',
    heading: 'One',
    audioPath: '/audio/one.mp3',
    caption: 'One caption',
  },
  {
    id: 'b',
    sectionId: 'two',
    heading: 'Two',
    audioPath: '/audio/two.mp3',
    caption: 'Two caption',
  },
  {
    id: 'c',
    sectionId: 'three',
    heading: 'Three',
    audioPath: '/audio/three.mp3',
    caption: 'Three caption',
  },
]

describe('useTour', () => {
  it('starts playing at index 0', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    expect(result.current.status).toBe('playing')
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.current).toEqual(sections[0])
  })

  it('advances through the indices', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.advance())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.status).toBe('playing')
    act(() => result.current.advance())
    expect(result.current.currentIndex).toBe(2)
    expect(result.current.status).toBe('playing')
  })

  it('sets status done when advancing past the last section', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.advance())
    act(() => result.current.advance())
    act(() => result.current.advance())
    expect(result.current.status).toBe('done')
    expect(result.current.currentIndex).toBe(2)
  })

  it('pause and resume only toggle the status', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.pause())
    expect(result.current.status).toBe('paused')
    expect(result.current.currentIndex).toBe(0)
    act(() => result.current.resume())
    expect(result.current.status).toBe('playing')
    expect(result.current.currentIndex).toBe(0)
  })

  it('restart returns to index 0 playing', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.advance())
    act(() => result.current.advance())
    act(() => result.current.restart())
    expect(result.current.currentIndex).toBe(0)
    expect(result.current.status).toBe('playing')
  })

  it('close returns to idle at index 0', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.advance())
    act(() => result.current.close())
    expect(result.current.status).toBe('idle')
    expect(result.current.currentIndex).toBe(0)
  })

  it('skip advances even while paused', () => {
    const { result } = renderHook(() => useTour(sections))
    act(() => result.current.start())
    act(() => result.current.pause())
    act(() => result.current.skip())
    expect(result.current.currentIndex).toBe(1)
    expect(result.current.status).toBe('playing')
  })
})
