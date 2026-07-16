import { siteConfig } from '@/config/site'
import { useSpotifyMe } from '@/hooks/useSpotifyMe'
import { cn } from '@/lib/utils'

type SiteHeroProps = {
  /** Compact header for the garden overlay (single screen) */
  compact?: boolean
}

export function SiteHero({ compact = false }: SiteHeroProps) {
  const { profile, loading } = useSpotifyMe()
  const name = profile?.displayName || siteConfig.name

  if (compact) {
    return (
      <header className="flex items-center gap-3">
        {loading && !profile ? (
          <div className="size-10 shrink-0 animate-pulse rounded-full bg-white/10" />
        ) : profile?.avatarUrl ? (
          <a
            href={profile.spotifyUrl}
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <img
              src={profile.avatarUrl}
              alt=""
              className="size-10 rounded-full object-cover ring-1 ring-white/15"
            />
          </a>
        ) : null}

        <div className="flex min-w-0 flex-col gap-0.5 font-mono">
          <h1 className="truncate text-lg font-bold tracking-tight text-foreground">
            {name}
          </h1>
          <p className="truncate text-[11px] text-muted-foreground">
            {siteConfig.title}
          </p>
        </div>
      </header>
    )
  }

  return (
    <header
      className={cn(
        'flex min-h-[100svh] flex-col justify-center px-6 py-24 sm:px-8',
      )}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <div className="flex items-center gap-4">
          {loading && !profile ? (
            <div className="size-14 shrink-0 animate-pulse rounded-full bg-secondary/80" />
          ) : profile?.avatarUrl ? (
            <a
              href={profile.spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <img
                src={profile.avatarUrl}
                alt=""
                className="size-14 rounded-full object-cover ring-1 ring-white/15"
              />
            </a>
          ) : null}

          <div className="flex min-w-0 flex-col gap-2 font-mono">
            <h1 className="text-3xl font-bold tracking-tight text-foreground drop-shadow-sm sm:text-4xl">
              {name}
            </h1>
            <p className="text-sm text-muted-foreground">{siteConfig.title}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
