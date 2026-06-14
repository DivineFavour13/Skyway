'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import { SlidersHorizontal, X } from 'lucide-react';
import { CarGridCard } from './CarGridCard';
import { CarFilters, type CarFilterState } from './CarFilters';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { Car } from '@/lib/mockCars';

type SortBy = 'price' | 'seats' | 'name';

type Props = {
  cars: Car[];
  locale: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
};

export function CarResultsClient({
  cars, locale, pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime, days
}: Props) {
  const t = useTranslations('carResults');
  const [sortBy, setSortBy] = useState<SortBy>('price');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<CarFilterState>({
    category: 'any',
    manufacturer: 'all',
    transmission: 'any',
    maxPrice: Math.max(...cars.map((c) => c.pricePerDay), 200),
  });

  const filtered = useMemo(() => {
    return cars
      .filter((car) => {
        if (filters.category !== 'any' && car.category !== filters.category) return false;
        if (filters.manufacturer !== 'all' && car.make !== filters.manufacturer) return false;
        if (filters.transmission !== 'any' && car.transmission !== filters.transmission) return false;
        if (car.pricePerDay > filters.maxPrice) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price') return a.pricePerDay - b.pricePerDay;
        if (sortBy === 'seats') return b.seats - a.seats;
        if (sortBy === 'name') return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
        return 0;
      });
  }, [cars, filters, sortBy]);

  const activeFilterCount = [
    filters.category !== 'any',
    filters.manufacturer !== 'all',
    filters.transmission !== 'any',
    filters.maxPrice < Math.max(...cars.map((c) => c.pricePerDay), 200),
  ].filter(Boolean).length;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-3">
          <p className="text-sm text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-text-primary)]">{filtered.length}</span>
            {' '}vehicle{filtered.length !== 1 ? 's' : ''} available
          </p>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors',
              showFilters || activeFilterCount > 0
                ? 'border-[var(--color-accent)] text-[var(--color-accent)] bg-[var(--color-accent-dim)]'
                : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
            )}
          >
            <SlidersHorizontal size={13} />
            Filters
            {activeFilterCount > 0 && (
              <span className="ml-0.5 h-4 w-4 rounded-full bg-[var(--color-accent)] text-[var(--color-accent-text)] text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={() => setFilters({ category: 'any', manufacturer: 'all', transmission: 'any', maxPrice: Math.max(...cars.map((c) => c.pricePerDay), 200) })}
              className="flex items-center gap-1 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-error)] transition-colors"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {([
            { value: 'price' as SortBy, label: 'Cheapest' },
            { value: 'seats' as SortBy, label: 'Most seats' },
            { value: 'name'  as SortBy, label: 'A-Z' },
          ]).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSortBy(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                sortBy === value
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 mb-6">
          <CarFilters cars={cars} filters={filters} onChange={setFilters} />
        </div>
      )}

      {/* Results grid */}
      {filtered.length === 0 ? (
        <EmptyState type="filtered" message="No vehicles match your filters. Try adjusting them." />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((car) => (
            <CarGridCard
              key={car.id}
              car={car}
              locale={locale}
              pickup={pickup}
              dropoff={dropoff}
              pickupDate={pickupDate}
              pickupTime={pickupTime}
              returnDate={returnDate}
              returnTime={returnTime}
              days={days}
            />
          ))}
        </div>
      )}
    </div>
  );
}