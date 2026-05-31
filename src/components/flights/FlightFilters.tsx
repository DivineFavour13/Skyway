'use client';

import { cn } from '@/lib/utils';

export type FilterState = {
  sortBy: 'price' | 'duration' | 'stops';
  maxStops: 'any' | '0' | '1';
};

type Props = {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalResults: number;
};

export function FlightFilters({ filters, onChange, totalResults }: Props) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <p className="text-sm text-[var(--color-text-muted)]">
        {totalResults} flight{totalResults !== 1 ? 's' : ''} found
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Stops filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {(['any', '0', '1'] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ ...filters, maxStops: val })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filters.maxStops === val
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {val === 'any' ? 'Any stops' : val === '0' ? 'Nonstop' : 'Max 1 stop'}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {(['price', 'duration', 'stops'] as const).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ ...filters, sortBy: val })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize',
                filters.sortBy === val
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {val === 'price' ? 'Cheapest' : val === 'duration' ? 'Fastest' : 'Fewest stops'}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}