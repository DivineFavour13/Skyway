'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { CarCard } from './CarCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { Car } from '@/lib/mockCars';

type SortBy = 'price' | 'seats';

type Props = {
  cars: Car[];
  locale: string;
  pickup: string;
  pickupDate: string;
  returnDate: string;
  days: number;
};

export function CarResultsClient({ cars, locale, pickup, pickupDate, returnDate, days }: Props) {
  const t = useTranslations('carResults');
  const [sortBy, setSortBy] = useState<SortBy>('price');

  const sorted = [...cars].sort((a, b) => {
    if (sortBy === 'price') return a.pricePerDay - b.pricePerDay;
    if (sortBy === 'seats') return b.seats - a.seats;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          {cars.length === 1
            ? t('found', { count: cars.length })
            : t('foundPlural', { count: cars.length })}
          <span className="ml-1 text-[var(--color-text-primary)] font-medium">in {pickup}</span>
        </p>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {([
            { value: 'price' as SortBy, label: t('priceLow') },
            { value: 'seats' as SortBy, label: t('mostSeats') },
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

      {sorted.length === 0 ? (
        <EmptyState type="filtered" message={t('noResults', { city: pickup })} />
      ) : (
        <div className="space-y-4">
          {sorted.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              locale={locale}
              pickup={pickup}
              pickupDate={pickupDate}
              returnDate={returnDate}
              days={days}
            />
          ))}
        </div>
      )}
    </div>
  );
}