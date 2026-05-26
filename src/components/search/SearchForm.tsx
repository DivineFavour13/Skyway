'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AirportInput } from './AirportInput';
import { Button } from '@/components/ui/Button';
import { useBookingStore } from '@/store/bookingStore';
import type { Airport } from '@/lib/airports';

export function SearchForm() {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();
  const { search, setSearch } = useBookingStore();

  const [origin, setOrigin] = useState<Airport | null>(search.origin);
  const [destination, setDestination] = useState<Airport | null>(search.destination);
  const [date, setDate] = useState(search.date);
  const [adults, setAdults] = useState(search.adults);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0] ?? '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!origin || !destination || !date) {
      setError('Please fill in all fields.');
      return;
    }
    if (origin.iata_code === destination.iata_code) {
      setError('Origin and destination cannot be the same.');
      return;
    }
    setError('');
    setSearch({ origin, destination, date, adults });
    router.push(
      `/${locale}/search?origin=${origin.iata_code}&destination=${destination.iata_code}&date=${date}&adults=${adults}`
    );
  }

  function swapAirports() {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: origin + swap + destination */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <AirportInput
          id="origin"
          label={t('origin')}
          placeholder="City or airport"
          value={origin}
          onChange={setOrigin}
        />

        <button
          type="button"
          onClick={swapAirports}
          aria-label="Swap origin and destination"
          className="shrink-0 h-[46px] w-[46px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-lg mb-0 sm:mb-0"
        >
          ⇄
        </button>

        <AirportInput
          id="destination"
          label={t('destination')}
          placeholder="City or airport"
          value={destination}
          onChange={setDestination}
        />
      </div>

      {/* Row 2: date + passengers + submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <div className="flex-1">
          <label
            htmlFor="date"
            className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide"
          >
            {t('date')}
          </label>
          <input
            id="date"
            type="date"
            min={today}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full h-[46px] px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
          />
        </div>

        <div className="w-full sm:w-36">
          <label
            htmlFor="adults-display"
            className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide"
          >
            {t('passengers')}
          </label>
          <div
            id="adults-display"
            className="flex h-[46px] items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setAdults((a) => Math.max(1, a - 1))}
              className="h-full w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Remove passenger"
            >
              −
            </button>
            <span className="flex-1 text-center text-sm font-semibold text-[var(--color-text-primary)]">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => setAdults((a) => Math.min(9, a + 1))}
              className="h-full w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label="Add passenger"
            >
              +
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto h-[46px] whitespace-nowrap">
          {t('button')} →
        </Button>
      </div>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}