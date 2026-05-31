export function FlightCardSkeleton() {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">

        {/* Airline */}
        <div className="flex items-center gap-2 sm:w-36 shrink-0">
          <div className="skeleton h-6 w-6 rounded-full" />
          <div className="skeleton h-3 w-20 rounded-full" />
        </div>

        {/* Timeline */}
        <div className="flex-1 flex items-center gap-3">
          <div className="text-center space-y-1.5">
            <div className="skeleton h-5 w-14 rounded-full" />
            <div className="skeleton h-3 w-8 rounded-full mx-auto" />
          </div>

          <div className="flex-1 flex flex-col items-center gap-2">
            <div className="skeleton h-3 w-12 rounded-full" />
            <div className="skeleton h-px w-full rounded-full" />
            <div className="skeleton h-3 w-14 rounded-full" />
          </div>

          <div className="text-center space-y-1.5">
            <div className="skeleton h-5 w-14 rounded-full" />
            <div className="skeleton h-3 w-8 rounded-full mx-auto" />
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:w-32 shrink-0">
          <div className="space-y-1.5 text-right">
            <div className="skeleton h-6 w-20 rounded-full" />
            <div className="skeleton h-3 w-14 rounded-full" />
          </div>
          <div className="skeleton h-8 w-16 rounded-xl" />
        </div>

      </div>
    </div>
  );
}