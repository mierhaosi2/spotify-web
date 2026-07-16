import { WaveField } from '@/labs/wave/WaveField'
import { cn } from '@/lib/utils'

type AmbientWaveProps = {
  /** Pause when garden (or other heavy stage) is active */
  paused?: boolean
  className?: string
}

export function AmbientWave({ paused = false, className }: AmbientWaveProps) {
  return (
    <div
      className={cn(
        'pointer-events-none fixed inset-0 -z-10 opacity-70',
        paused && 'opacity-25 transition-opacity duration-500',
        className,
      )}
      aria-hidden
    >
      <WaveField ambient paused={paused} className="h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/25 via-background/40 to-background/70" />
    </div>
  )
}
