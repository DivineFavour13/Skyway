'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type CarType = 'any' | 'economy' | 'compact' | 'suv' | 'luxury' | 'van';

export function CarSearchForm() {
  const t = useTranslations('cars');
  const locale = useLocale();
  const router = useRouter();

  const [pickup, setPickup] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [carType, setCarType] = useState<CarType>('any');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0] ?? '';

  const carTypes: { value: CarType; label: string }[] = [
    { value: 'any',     label: t('any') },
    { value: 'economy', label: t('economy') },
    { value: 'compact', label: t('compact') },
    { value: 'suv',     label: t('suv') },
    { value: 'luxury',  label: t('luxury') },
    { value: 'van',     label: t('van') },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!pickup || !pickupDate || !returnDate) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const params = new URLSearchParams({ pickup, pickupDate, returnDate, carType });
    router.push(`/${locale}/cars?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Pickup location */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {t('pickup')}
        </label>
        <input
          type="text"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder={t('pickupPlaceholder')}
          className="w-full h-[46px] px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </div>

      {/* Car type */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {t('type')}
        </label>
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)] flex-wrap">
          {carTypes.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setCarType(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                carType === value
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Dates + submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <DatePicker
          id="pickupDate"
          label={t('pickupDate')}
          value={pickupDate}
          onChange={setPickupDate}
          min={today}
        />
        <DatePicker
          id="returnDate"
          label={t('returnDate')}
          value={returnDate}
          onChange={setReturnDate}
          min={pickupDate || today}
        />
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