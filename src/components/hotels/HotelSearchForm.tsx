'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';

export function HotelSearchForm() {
  const t = useTranslations('hotels');
  const locale = useLocale();
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [checkin, setCheckin] = useState('');
  const [checkout, setCheckout] = useState('');
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0] ?? '';

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !checkin || !checkout) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const params = new URLSearchParams({
      destination,
      checkin,
      checkout,
      guests: String(guests),
      rooms: String(rooms),
    });
    router.push(`/${locale}/hotels?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Destination */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {t('destination')}
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={t('destinationPlaceholder')}
          className="w-full h-[46px] px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </div>

      {/* Dates + guests + submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <DatePicker
          id="checkin"
          label={t('checkin')}
          value={checkin}
          onChange={setCheckin}
          min={today}
        />
        <DatePicker
          id="checkout"
          label={t('checkout')}
          value={checkout}
          onChange={setCheckout}
          min={checkin || today}
        />

        <div className="w-full sm:w-32">
          <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
            {t('guests')}
          </label>
          <div className="flex h-[46px] items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <button
              type="button"
              onClick={() => setGuests((g) => Math.max(1, g - 1))}
              className="h-full w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center text-sm font-semibold text-[var(--color-text-primary)]">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((g) => Math.min(10, g + 1))}
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