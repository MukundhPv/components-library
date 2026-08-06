'use client'

function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md ${className}`} style={{ background: 'var(--bg-3)' }}>
      <div className="absolute inset-0 t-shimmer" />
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border t-card overflow-hidden w-64">
      <Shimmer className="w-full aspect-video rounded-none" />
      <div className="p-4 space-y-3">
        <Shimmer className="h-4 w-3/4" />
        <Shimmer className="h-3 w-full" />
        <Shimmer className="h-3 w-5/6" />
        <div className="flex items-center gap-2 pt-1">
          <Shimmer className="w-7 h-7 rounded-full" />
          <Shimmer className="h-3 w-24" />
          <div className="ml-auto"><Shimmer className="h-7 w-16 rounded-lg" /></div>
        </div>
      </div>
    </div>
  )
}

export function ListSkeleton() {
  return (
    <div className="w-full max-w-sm space-y-1">
      <div className="flex items-center gap-3 px-4 py-2 mb-2">
        <Shimmer className="h-3 w-24" />
        <div className="ml-auto flex gap-2">
          <Shimmer className="h-6 w-16 rounded-full" />
          <Shimmer className="h-6 w-14 rounded-full" />
        </div>
      </div>
      {[0, 150, 300, 450, 600].map((delay, i) => (
        <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border t-border">
          <Shimmer className="w-9 h-9 rounded-full shrink-0" />
          <div className="flex-1 space-y-1.5">
            <Shimmer className="h-3 w-2/5" />
            <Shimmer className="h-2.5 w-1/4" />
          </div>
          <Shimmer className="h-5 w-14 rounded-full shrink-0" />
        </div>
      ))}
    </div>
  )
}
