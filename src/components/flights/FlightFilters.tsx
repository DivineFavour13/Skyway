'use client';

import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('flights');

  const stopOptions = [
    { val: 'any' as const, label: t('anyStops') },
    { val: '0' as const,   label: t('nonstop') },
    { val: '1' as const,   label: t('maxOneStop') },
  ];

  const sortOptions = [
    { val: 'price' as const,    label: t('cheapest') },
    { val: 'duration' as const, label: t('fastest') },
    { val: 'stops' as const,    label: t('fewestStops') },
  ];

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <p className="text-sm text-[var(--color-text-muted)]">
        {totalResults === 1
          ? t('results', { count: totalResults })
          : t('resultsPlural', { count: totalResults })}
      </p>

      <div className="flex flex-wrap gap-3">
        {/* Stops filter */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {stopOptions.map(({ val, label }) => (
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
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {sortOptions.map(({ val, label }) => (
            <button
              key={val}
              type="button"
              onClick={() => onChange({ ...filters, sortBy: val })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                filters.sortBy === val
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}