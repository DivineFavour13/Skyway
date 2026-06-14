export function CarCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
      <div className="skeleton h-32 w-full" />
      <div className="p-4 space-y-3">
        <div className="skeleton h-4 w-36 rounded-full" />
        <div className="skeleton h-3 w-20 rounded-full" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="skeleton h-3 w-12 rounded-full" />
          ))}
        </div>
        <div className="flex justify-between items-end pt-2">
          <div className="space-y-1">
            <div className="skeleton h-5 w-16 rounded-full" />
            <div className="skeleton h-3 w-12 rounded-full" />
          </div>
          <div className="skeleton h-8 w-16 rounded-xl" />
        </div>
      </div>
    </div>
  );
}