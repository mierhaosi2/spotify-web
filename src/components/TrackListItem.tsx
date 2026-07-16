import { cn } from '@/lib/utils'
import type { TrackSummary } from '@/lib/api'

type TrackListItemProps = {
  track: TrackSummary
  index?: number
  meta?: string
}

export function TrackListItem({ track, index, meta }: TrackListItemProps) {
  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noreferrer"
      className={cn(
        'group flex items-center gap-2.5 rounded-sm py-0.5 transition-colors',
      )}
    >
      {typeof index === 'number' ? (
        <span className="w-5 shrink-0 text-[10px] tabular-nums text-[rgba(253,107,148,0.4)]">
          {String(index).padStart(2, '0')}
        </span>
      ) : null}

      {track.albumArtUrl ? (
        <img
          src={track.albumArtUrl}
          alt=""
          className="size-8 shrink-0 rounded-sm object-cover"
        />
      ) : (
        <div className="size-8 shrink-0 rounded-sm bg-secondary" />
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-[12px] text-foreground transition-colors group-hover:text-[#6db840]">
          {track.name}
        </p>
        <p className="truncate text-[11px] text-muted-foreground/80">
          {track.artists}
        </p>
      </div>

      {meta ? (
        <span className="shrink-0 text-[10px] text-[rgba(253,107,148,0.35)]">
          {meta}
        </span>
      ) : null}
    </a>
  )
}
