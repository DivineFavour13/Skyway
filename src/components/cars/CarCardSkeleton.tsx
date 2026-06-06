export function CarCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="flex flex-col sm:flex-row">
        <div className="skeleton h-36 sm:h-auto sm:w-44 shrink-0" />
        <div className="flex-1 p-5 space-y-3">
          <div className="skeleton h-5 w-48 rounded-full" />
          <div className="skeleton h-3 w-24 rounded-full" />
          <div className="flex gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-3 w-16 rounded-full" />
            ))}
          </div>
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="skeleton h-5 w-14 rounded-md" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}