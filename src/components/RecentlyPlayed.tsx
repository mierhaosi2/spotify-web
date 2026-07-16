import { SectionLabel } from '@/components/SectionLabel'
import { TrackListItem } from '@/components/TrackListItem'
import { useRecentlyPlayed } from '@/hooks/useRecentlyPlayed'
import { formatRelativeTime } from '@/lib/format'

type RecentlyPlayedProps = {
  nowPlayingId?: string | null
  limit?: number
}

export function RecentlyPlayed({
  nowPlayingId,
  limit = 4,
}: RecentlyPlayedProps) {
  const { items, loading, error } = useRecentlyPlayed(nowPlayingId, limit)

  return (
    <section className="flex flex-col gap-1.5">
      <SectionLabel>// recently played</SectionLabel>

      {loading && items.length === 0 ? (
        <div className="flex flex-col gap-1">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <div className="size-8 animate-pulse rounded-sm bg-secondary" />
              <div className="h-3 flex-1 animate-pulse rounded bg-secondary" />
            </div>
          ))}
        </div>
      ) : error ? (
        <p className="text-[11px] text-muted-foreground/70">Unable to load</p>
      ) : items.length === 0 ? (
        <p className="text-[11px] text-muted-foreground/70">No recent plays</p>
      ) : (
        <div className="flex flex-col">
          {items.map((item) => (
            <TrackListItem
              key={`${item.id}-${item.playedAt}`}
              track={item}
              meta={formatRelativeTime(item.playedAt)}
            />
          ))}
        </div>
      )}
    </section>
  )
}
