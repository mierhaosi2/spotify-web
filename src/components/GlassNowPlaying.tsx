import { useLayoutEffect, useRef, useState } from 'react'
import { Glass, type GlassOptics } from '@samasante/liquid-glass'
import { SpotifyIcon } from '@/components/SpotifyIcon'
import { siteConfig } from '@/config/site'
import type { LastListenedTrack } from '@/lib/api'
import { formatPlayedAt } from '@/lib/format'
import { cn } from '@/lib/utils'

const LIGHT_LENS: Partial<GlassOptics> = {
  mapSize: 128,
  clipToShape: true,
  softEdge: true,
  depth: 0.85,
  curvature: 0.45,
  dispersion: 0.25,
  strength: 0.14,
  bend: 0.5,
  frost: 2.2,
  brightness: 0.12,
  specular: 1.1,
  glow: 0.2,
  sheen: 0.9,
}

const WALLPAPER =
  'radial-gradient(120% 120% at 10% 20%, rgba(102,204,255,0.45) 0%, transparent 50%),' +
  'radial-gradient(120% 120% at 90% 30%, rgba(192,132,252,0.35) 0%, transparent 48%),' +
  'radial-gradient(130% 130% at 50% 100%, rgba(253,107,148,0.28) 0%, transparent 55%),' +
  'linear-gradient(160deg, #12121a, #0a0a10)'

type LastListenedState = {
  track: LastListenedTrack | null
  loading: boolean
  error: string | null
}

type GlassNowPlayingProps = {
  state: LastListenedState
}

function useSize() {
  const ref = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ w: Math.round(width), h: Math.round(height) })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  return [ref, size] as const
}

export function GlassNowPlaying({ state }: GlassNowPlayingProps) {
  const { track, loading, error } = state
  const timeLabel = formatPlayedAt(track?.playedAt ?? null)
  const [panelRef, { w, h }] = useSize()
  const ready = w > 0 && h > 0

  return (
    <section className="mt-1 flex w-full flex-col items-center gap-2">
      <p className="text-[11px] font-bold text-[rgba(253,107,148,0.55)]">
        // last listened to...
      </p>

      <div
        ref={panelRef}
        className="relative w-full max-w-md overflow-hidden rounded-xl"
        style={{ minHeight: 64 }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: WALLPAPER }}
          aria-hidden
        />

        {ready && (
          <Glass
            refract={
              <div style={{ position: 'absolute', inset: 0, background: WALLPAPER }} />
            }
            behind="#0a0a10"
            optics={LIGHT_LENS}
            style={{
              position: 'absolute',
              inset: 0,
              width: w,
              height: h,
              borderRadius: 16,
            }}
          />
        )}

        <div className="relative z-10 px-4 py-3">
          {loading && !track ? (
            <div className="flex items-center gap-3" aria-hidden>
              <div className="size-12 shrink-0 animate-pulse rounded-md bg-white/10" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-4 w-2/3 animate-pulse rounded bg-white/10" />
                <div className="h-3 w-1/3 animate-pulse rounded bg-white/10" />
              </div>
            </div>
          ) : error && !track ? (
            <p className="text-[11px] text-muted-foreground">Unable to load</p>
          ) : track ? (
            <a
              href={track.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className={cn(
                'group flex items-center gap-3',
                'transition-opacity hover:opacity-90',
              )}
            >
              {track.albumArtUrl ? (
                <img
                  src={track.albumArtUrl}
                  alt=""
                  className="size-11 shrink-0 rounded-sm object-cover"
                />
              ) : (
                <div className="size-11 shrink-0 rounded-sm bg-white/10" />
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold tracking-wide text-white uppercase">
                  {track.name}
                </p>
                <p className="truncate text-[11px] text-white/65">{track.artists}</p>
              </div>
              <SpotifyIcon className="size-4 shrink-0 text-white/55 transition-colors group-hover:text-white" />
            </a>
          ) : (
            <p className="text-[11px] text-white/60">Nothing played yet</p>
          )}
        </div>
      </div>

      <div className="flex w-full max-w-md items-center justify-between gap-4 text-[11px] text-[rgba(253,107,148,0.45)]">
        <span>{timeLabel}</span>
        <span>{siteConfig.location}</span>
        <a
          href={`mailto:${siteConfig.email}`}
          className="transition-colors hover:text-[rgba(253,107,148,0.85)]"
        >
          Email →
        </a>
      </div>
    </section>
  )
}
