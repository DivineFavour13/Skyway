'use client';

import { cn } from '@/lib/utils';
import type { Car } from '@/lib/mockCars';

export type CarFilterState = {
  category: string;
  manufacturer: string;
  transmission: string;
  maxPrice: number;
};

type Props = {
  cars: Car[];
  filters: CarFilterState;
  onChange: (filters: CarFilterState) => void;
};

export function CarFilters({ cars, filters, onChange }: Props) {
  const manufacturers = ['All', ...Array.from(new Set(cars.map((c) => c.make))).sort()];
  const categories = ['any', 'economy', 'compact', 'suv', 'luxury', 'van'];
  const transmissions = ['any', 'automatic', 'manual'];
  const maxAvailablePrice = Math.max(...cars.map((c) => c.pricePerDay), 200);

  return (
    <div className="space-y-5">
      {/* Category */}
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
          Vehicle type
        </p>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => onChange({ ...filters, category: cat })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                filters.category === cat
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {cat === 'any' ? 'All types' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Manufacturer */}
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
          Manufacturer
        </p>
        <div className="flex flex-wrap gap-1.5">
          {manufacturers.map((make) => (
            <button
              key={make}
              type="button"
              onClick={() => onChange({ ...filters, manufacturer: make === 'All' ? 'all' : make })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                (make === 'All' && filters.manufacturer === 'all') || filters.manufacturer === make
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {make}
            </button>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide mb-2">
          Transmission
        </p>
        <div className="flex gap-1.5">
          {transmissions.map((trans) => (
            <button
              key={trans}
              type="button"
              onClick={() => onChange({ ...filters, transmission: trans })}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all',
                filters.transmission === trans
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'bg-[var(--color-surface-raised)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {trans === 'any' ? 'Any' : trans}
            </button>
          ))}
        </div>
      </div>

      {/* Max price */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
            Max price / day
          </p>
          <p className="text-xs font-bold text-[var(--color-accent)]">${filters.maxPrice}</p>
        </div>
        <input
          type="range"
          min={30}
          max={maxAvailablePrice}
          step={10}
          value={filters.maxPrice}
          onChange={(e) => onChange({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full accent-[var(--color-accent)]"
        />
        <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
          <span>$30</span>
          <span>${maxAvailablePrice}+</span>
        </div>
      </div>
    </div>
  );
}