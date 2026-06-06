'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { HotelCard } from './HotelCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { Hotel } from '@/lib/mockHotels';

type SortBy = 'price' | 'rating' | 'stars';

type Props = {
  hotels: Hotel[];
  locale: string;
  checkin: string;
  checkout: string;
  guests: number;
  nights: number;
  destination: string;
};

export function HotelResultsClient({
  hotels, locale, checkin, checkout, guests, nights, destination,
}: Props) {
  const t = useTranslations('hotelResults');
  const [sortBy, setSortBy] = useState<SortBy>('price');

  const sortOptions: { value: SortBy; label: string }[] = [
    { value: 'price',  label: t('priceLow') },
    { value: 'rating', label: t('rating') },
    { value: 'stars',  label: t('stars') },
  ];

  const sorted = [...hotels].sort((a, b) => {
    if (sortBy === 'price')  return a.pricePerNight - b.pricePerNight;
    if (sortBy === 'rating') return b.reviewScore - a.reviewScore;
    if (sortBy === 'stars')  return b.stars - a.stars;
    return 0;
  });

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          {hotels.length === 1
            ? t('found', { count: hotels.length })
            : t('foundPlural', { count: hotels.length })}
          {destination && (
            <span className="ml-1 text-[var(--color-text-primary)] font-medium">
              in {destination}
            </span>
          )}
        </p>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {sortOptions.map(({ value, label }) => (
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

      {sorted.length === 0 ? (
        <EmptyState
          type="flights"
          message={t('noResults', { city: destination })}
        />
      ) : (
        <div className="space-y-4">
          {sorted.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              locale={locale}
              checkin={checkin}
              checkout={checkout}
              guests={guests}
              nights={nights}
            />
          ))}
        </div>
      )}
    </div>
  );
}