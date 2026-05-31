'use client';

import { useState } from 'react';
import { FlightFilters, type FilterState } from './FlightFilters';
import { FlightCard } from './FlightCard';
import type { DuffelOffer } from '@/types/duffel';

type Props = {
  offers: DuffelOffer[];
  locale: string;
};

export function FlightResultsClient({ offers, locale }: Props) {
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'price',
    maxStops: 'any',
  });

  const filtered = offers
    .filter((offer) => {
      if (filters.maxStops === 'any') return true;
      const stops = (offer.slices[0]?.segments.length ?? 1) - 1;
      if (filters.maxStops === '0') return stops === 0;
      if (filters.maxStops === '1') return stops <= 1;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price') {
        return Number(a.total_amount) - Number(b.total_amount);
      }
      if (filters.sortBy === 'duration') {
        const durA = a.slices[0]?.duration ?? '';
        const durB = b.slices[0]?.duration ?? '';
        return durA.localeCompare(durB);
      }
      if (filters.sortBy === 'stops') {
        const stopsA = (a.slices[0]?.segments.length ?? 1) - 1;
        const stopsB = (b.slices[0]?.segments.length ?? 1) - 1;
        return stopsA - stopsB;
      }
      return 0;
    });

  return (
    <div>
      <FlightFilters
        filters={filters}
        onChange={setFilters}
        totalResults={filtered.length}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            No flights match your filters. Try adjusting them.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((offer) => (
            <FlightCard key={offer.id} offer={offer} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}