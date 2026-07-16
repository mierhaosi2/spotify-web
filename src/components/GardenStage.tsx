import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { GardenCanvas } from '@/labs/garden/GardenCanvas.jsx'
import { cn } from '@/lib/utils'

export type ClearZone = {
  left: number
  right: number
  bottom: number
  top: number
}

type GardenStageProps = {
  onActiveChange?: (active: boolean) => void
  overlay: ReactNode
}

const PAD = 2

export function GardenStage({ onActiveChange, overlay }: GardenStageProps) {
  const stageRef = useRef<HTMLDivElement>(null)
  const musicRef = useRef<HTMLDivElement>(null)
  const [clearZone, setClearZone] = useState<ClearZone | null>(null)

  useEffect(() => {
    onActiveChange?.(true)
    return () => onActiveChange?.(false)
  }, [onActiveChange])

  useLayoutEffect(() => {
    const stage = stageRef.current
    const music = musicRef.current
    if (!stage || !music) return

    const measure = () => {
      const g = stage.getBoundingClientRect()
      const m = music.getBoundingClientRect()
      if (g.width < 8 || g.height < 8) return

      const left = ((m.left - g.left) / g.width) * 100 - PAD
      const right = ((m.right - g.left) / g.width) * 100 + PAD
      const bottom = ((g.bottom - m.bottom) / g.height) * 100 - PAD
      const top = ((g.bottom - m.top) / g.height) * 100 + PAD

      setClearZone({
        left: Math.max(0, left),
        right: Math.min(100, right),
        bottom: Math.max(0, bottom),
        top: Math.min(100, top),
      })
    }

    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(stage)
    ro.observe(music)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  return (
    <section
      id="garden"
      className="relative z-0 h-[100svh] w-full overflow-hidden"
    >
      <div ref={stageRef} className="relative h-full w-full overflow-hidden">
        <GardenCanvas clearZone={clearZone} plantCount={34} />

        {/* items-start: column wraps content only — fixes the giant empty stretch */}
        <div className="pointer-events-none absolute inset-0 z-20 flex items-start justify-center overflow-hidden">
          <div
            ref={musicRef}
            className={cn(
              'pointer-events-auto flex w-full max-w-xl flex-col gap-4',
              'max-h-[100svh] overflow-y-auto overscroll-contain',
              'px-5 py-5 sm:px-6 sm:py-6',
              'font-mono text-[12px] font-bold leading-snug tracking-tight',
              'bg-gradient-to-b from-[#090910]/60 via-[#090910]/40 to-[#090910]/60',
              'supports-[backdrop-filter]:backdrop-blur-[1.5px]',
            )}
          >
            {overlay}
          </div>
        </div>
      </div>
    </section>
  )
}
