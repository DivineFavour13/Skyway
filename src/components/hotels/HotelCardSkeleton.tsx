export function HotelCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="skeleton h-40 sm:h-auto sm:w-48 shrink-0" />
        <div className="flex-1 p-5 space-y-3">
          <div className="skeleton h-5 w-48 rounded-full" />
          <div className="skeleton h-3 w-64 rounded-full" />
          <div className="skeleton h-3 w-full rounded-full" />
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-5 w-12 rounded-md" />
            ))}
          </div>
          <div className="skeleton h-6 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}