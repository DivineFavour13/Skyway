'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { AirportInput } from './AirportInput';
import { Button } from '@/components/ui/Button';
import { DatePicker } from '@/components/ui/DatePicker';
import { useBookingStore } from '@/store/bookingStore';
import { cn } from '@/lib/utils';
import type { Airport } from '@/lib/airports';
import type { CabinClass } from '@/store/bookingStore';
import { saveRecentSearch } from '@/lib/recentSearches';

export function SearchForm() {
  const t = useTranslations('search');
  const locale = useLocale();
  const router = useRouter();
  const { search, setSearch } = useBookingStore();

  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>(search.tripType);
  const [cabinClass, setCabinClass] = useState<CabinClass>(search.cabinClass);
  const [origin, setOrigin] = useState<Airport | null>(search.origin);
  const [destination, setDestination] = useState<Airport | null>(search.destination);
  const [date, setDate] = useState(search.date);
  const [returnDate, setReturnDate] = useState(search.returnDate);
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
    if (tripType === 'roundtrip' && !returnDate) {
      setError('Please select a return date.');
      return;
    }
    if (tripType === 'roundtrip' && returnDate <= date) {
      setError('Return date must be after departure date.');
      return;
    }
    setError('');
    setSearch({ origin, destination, date, returnDate, tripType, adults, cabinClass });

    const params = new URLSearchParams({
      origin: origin.iata_code,
      destination: destination.iata_code,
      date,
      adults: String(adults),
      tripType,
      cabinClass,
      ...(tripType === 'roundtrip' && returnDate ? { returnDate } : {}),
    });

    saveRecentSearch({ origin, destination, date, returnDate, tripType, adults, cabinClass });
    router.push(`/${locale}/search?${params.toString()}`);
  }

  function swapAirports() {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Row 1: trip type + cabin class */}
      <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)] w-fit">
          {(['oneway', 'roundtrip'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTripType(type)}
              className={cn(
                'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                tripType === type
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {type === 'oneway' ? t('oneWay') : t('roundTrip')}
            </button>
          ))}
        </div>

        <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)] w-fit">
          {(
            [
              { value: 'economy',         label: t('economy') },
              { value: 'premium_economy', label: t('premium') },
              { value: 'business',        label: t('business') },
              { value: 'first',           label: t('first') },
            ] as { value: CabinClass; label: string }[]
          ).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setCabinClass(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                cabinClass === value
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Airport row */}
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
          className="shrink-0 h-[46px] w-[46px] rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors flex items-center justify-center text-lg"
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

      {/* Date row */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <DatePicker
          id="date"
          label={t('date')}
          value={date}
          onChange={setDate}
          min={today}
        />

        {tripType === 'roundtrip' && (
          <DatePicker
            id="returnDate"
            label={t('returnDate')}
            value={returnDate}
            onChange={setReturnDate}
            min={date || today}
          />
        )}

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