import { useCallback, useState } from 'react'
import type { TourSection } from '../data'

export type TourStatus = 'idle' | 'playing' | 'paused' | 'done'

export interface Tour {
  status: TourStatus
  currentIndex: number
  current: TourSection | undefined
  start: () => void
  advance: () => void
  skip: () => void
  pause: () => void
  resume: () => void
  restart: () => void
  close: () => void
}

export function useTour(sections: TourSection[]): Tour {
  const [status, setStatus] = useState<TourStatus>('idle')
  const [currentIndex, setCurrentIndex] = useState(0)

  const start = useCallback(() => {
    setCurrentIndex(0)
    setStatus('playing')
  }, [])

  const advance = useCallback(() => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setStatus('playing')
    } else {
      setStatus('done')
    }
  }, [currentIndex, sections.length])

  const skip = useCallback(() => {
    advance()
  }, [advance])

  const pause = useCallback(() => {
    setStatus('paused')
  }, [])

  const resume = useCallback(() => {
    setStatus('playing')
  }, [])

  const restart = useCallback(() => {
    setCurrentIndex(0)
    setStatus('playing')
  }, [])

  const close = useCallback(() => {
    setCurrentIndex(0)
    setStatus('idle')
  }, [])

  return {
    status,
    currentIndex,
    current: sections[currentIndex],
    start,
    advance,
    skip,
    pause,
    resume,
    restart,
    close,
  }
}
