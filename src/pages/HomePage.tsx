import { useCallback, useState } from 'react'
import { AmbientWave } from '@/components/AmbientWave'
import { GardenStage } from '@/components/GardenStage'
import { GlassNowPlaying } from '@/components/GlassNowPlaying'
import { RecentlyPlayed } from '@/components/RecentlyPlayed'
import { SiteHero } from '@/components/SiteHero'
import { TopTracks } from '@/components/TopTracks'
import { useLastListened } from '@/hooks/useLastListened'

export function HomePage() {
  const lastListened = useLastListened()
  const [gardenActive, setGardenActive] = useState(true)

  const onGardenActive = useCallback((active: boolean) => {
    setGardenActive(active)
  }, [])

  return (
    <div className="relative h-[100svh] w-full overflow-hidden bg-[#090910] text-foreground">
      <AmbientWave paused={gardenActive} />

      <GardenStage
        onActiveChange={onGardenActive}
        overlay={
          <>
            <SiteHero compact />
            <TopTracks limit={4} />
            <RecentlyPlayed nowPlayingId={lastListened.track?.id} limit={4} />
            <GlassNowPlaying state={lastListened} />
          </>
        }
      />
    </div>
  )
}
