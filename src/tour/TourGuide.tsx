import { useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { TourSection } from '../data'
import { useTour } from './useTour'
import AvatarHead from './AvatarHead'

interface TourGuideProps {
  sections: TourSection[]
  onClose: () => void
}

const FALLBACK_MS = 4000

const buttonBase =
  'rounded-md px-3 py-1.5 font-display text-xs font-semibold transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan'

export default function TourGuide({ sections, onClose }: TourGuideProps) {
  const { status, current, start, advance, pause, resume, restart, close } =
    useTour(sections)

  const [mouthOpen, setMouthOpen] = useState(0)
  const [reducedMotion] = useState(
    () =>
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const containerRef = useRef<HTMLDivElement | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const dataArrayRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const rafRef = useRef<number | null>(null)
  const fallbackRef = useRef<number | null>(null)
  const teardownRef = useRef<() => void>(() => {})

  useEffect(() => {
    start()
  }, [start])

  useEffect(() => {
    const clearRaf = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }

    const clearFallback = () => {
      if (fallbackRef.current !== null) {
        window.clearTimeout(fallbackRef.current)
        fallbackRef.current = null
      }
    }

    const armFallback = () => {
      clearFallback()
      fallbackRef.current = window.setTimeout(() => {
        advance()
      }, FALLBACK_MS)
    }

    const startRaf = () => {
      if (typeof requestAnimationFrame !== 'function') return
      clearRaf()
      const loop = () => {
        const analyser = analyserRef.current
        const data = dataArrayRef.current
        if (analyser && data) {
          analyser.getByteTimeDomainData(data)
          let sum = 0
          for (let i = 0; i < data.length; i += 1) {
            const value = (data[i] - 128) / 128
            sum += value * value
          }
          const rms = Math.sqrt(sum / data.length)
          setMouthOpen(Math.min(1, rms * 3))
        }
        rafRef.current = requestAnimationFrame(loop)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    const teardown = () => {
      clearRaf()
      clearFallback()
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.removeAttribute('src')
        audioRef.current = null
      }
      sourceRef.current?.disconnect()
      sourceRef.current = null
      analyserRef.current = null
      dataArrayRef.current = null
      const ctx = audioContextRef.current
      audioContextRef.current = null
      if (ctx) {
        void ctx.close().catch(() => {})
      }
    }
    teardownRef.current = teardown

    if (!current || status === 'idle' || status === 'done') {
      teardown()
      return
    }

    if (status === 'paused') {
      clearRaf()
      clearFallback()
      audioRef.current?.pause()
      return
    }

    const existing = audioRef.current
    if (existing && existing.dataset.sectionId === current.id) {
      void existing.play().catch(() => {})
      armFallback()
      startRaf()
      return
    }

    teardown()

    const audio = document.createElement('audio')
    audio.crossOrigin = 'anonymous'
    audio.src = current.audioPath
    audio.dataset.sectionId = current.id
    audioRef.current = audio

    audio.addEventListener('ended', () => {
      advance()
    })
    audio.addEventListener('playing', () => {
      clearFallback()
    })
    audio.addEventListener('error', () => {
      armFallback()
    })

    const AudioCtx =
      window.AudioContext ??
      (window as unknown as {
        webkitAudioContext?: typeof AudioContext
      }).webkitAudioContext

    if (AudioCtx) {
      try {
        const ctx = new AudioCtx()
        const source = ctx.createMediaElementSource(audio)
        const analyser = ctx.createAnalyser()
        analyser.fftSize = 512
        source.connect(analyser)
        analyser.connect(ctx.destination)
        audioContextRef.current = ctx
        sourceRef.current = source
        analyserRef.current = analyser
        dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      } catch {
        // Analyser setup failed; the fallback timer will still advance.
      }
    }

    armFallback()
    if (analyserRef.current) startRaf()
    audio.play().catch(() => {
      armFallback()
    })

    return () => {
      clearRaf()
      clearFallback()
    }
  }, [current, advance, status])

  useEffect(() => {
    if (!current) return
    const element = document.getElementById(current.sectionId)
    element?.scrollIntoView({
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
    if (reducedMotion) return
    const node = containerRef.current
    if (node) {
      node.style.transform = 'translateY(-32px)'
    }
    const timer = window.setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = 'translateY(0)'
      }
    }, 500)
    return () => window.clearTimeout(timer)
  }, [current, reducedMotion])

  useEffect(() => {
    if (status !== 'done') return
    const timer = window.setTimeout(() => {
      close()
      onClose()
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [status, close, onClose])

  useEffect(() => {
    return () => teardownRef.current()
  }, [])

  const mouth = status === 'playing' ? mouthOpen : 0

  return (
    <div
      ref={containerRef}
      className="fixed bottom-6 right-6 z-50 transition-transform duration-500 ease-in-out"
    >
      <div className="w-80 rounded-2xl border border-neon-cyan/30 bg-surface-raised p-4 shadow-lg shadow-neon-cyan/10">
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-surface">
            <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
              <AvatarHead mouthOpen={mouth} />
            </Canvas>
          </div>
          {current ? (
            <div className="flex min-w-0 flex-col gap-1">
              <span className="font-display text-xs font-semibold uppercase tracking-widest text-neon-cyan">
                {current.heading}
              </span>
              <p className="text-sm text-ink">{current.caption}</p>
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={advance}
            className={`${buttonBase} border border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan/10`}
          >
            Skip
          </button>
          <button
            type="button"
            onClick={status === 'paused' ? resume : pause}
            className={`${buttonBase} border border-neon-magenta/40 text-neon-magenta hover:bg-neon-magenta/10`}
          >
            {status === 'paused' ? 'Resume' : 'Pause'}
          </button>
          <button
            type="button"
            onClick={restart}
            className={`${buttonBase} border border-neon-violet/40 text-neon-violet hover:bg-neon-violet/10`}
          >
            Restart
          </button>
          <button
            type="button"
            onClick={() => {
              close()
              onClose()
            }}
            className={`${buttonBase} border border-ink/20 text-ink-muted hover:text-ink`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
