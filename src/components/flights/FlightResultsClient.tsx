'use client';

import { useState } from 'react';
import { FlightFilters, type FilterState } from './FlightFilters';
import { FlightCard } from './FlightCard';
import { EmptyState } from '@/components/ui/EmptyState';
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
      if (filters.sortBy === 'price')
        return Number(a.total_amount) - Number(b.total_amount);
      if (filters.sortBy === 'duration')
        return (a.slices[0]?.duration ?? '').localeCompare(b.slices[0]?.duration ?? '');
      if (filters.sortBy === 'stops')
        return (
          (a.slices[0]?.segments.length ?? 1) - 1 -
          ((b.slices[0]?.segments.length ?? 1) - 1)
        );
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
        <EmptyState
          type="filtered"
          message="No flights match your filters. Try adjusting the stops or sort options."
        />
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