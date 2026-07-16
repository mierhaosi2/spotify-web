import { cn } from '@/lib/utils'

type SectionLabelProps = {
  children: string
  className?: string
}

/** Shared chrome with the garden header — mono + soft rose */
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <h2
      className={cn(
        'text-[11px] font-bold tracking-wide',
        'text-[rgba(253,107,148,0.55)]',
        className,
      )}
    >
      {children}
    </h2>
  )
}
