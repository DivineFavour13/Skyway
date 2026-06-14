'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { MapPin, ArrowRight } from 'lucide-react';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type CarType = 'any' | 'economy' | 'compact' | 'suv' | 'luxury' | 'van';

const TIME_OPTIONS = [
  '00:00','01:00','02:00','03:00','04:00','05:00',
  '06:00','07:00','08:00','09:00','10:00','11:00',
  '12:00','13:00','14:00','15:00','16:00','17:00',
  '18:00','19:00','20:00','21:00','22:00','23:00',
];

export function CarSearchForm() {
  const t = useTranslations('cars');
  const locale = useLocale();
  const router = useRouter();

  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [sameLocation, setSameLocation] = useState(true);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [returnDate, setReturnDate] = useState('');
  const [returnTime, setReturnTime] = useState('10:00');
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
      setError('Please fill in all required fields.');
      return;
    }
    if (!sameLocation && !dropoff) {
      setError('Please enter a dropoff location.');
      return;
    }
    setError('');
    const params = new URLSearchParams({
      pickup,
      dropoff: sameLocation ? pickup : dropoff,
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      carType,
    });
    router.push(`/${locale}/cars?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Pickup + Dropoff */}
      <div className="space-y-3">
        {/* Pickup */}
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
            {t('pickup')}
          </label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
            <input
              type="text"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder={t('pickupPlaceholder')}
              className="w-full h-[46px] pl-9 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
            />
          </div>
        </div>

        {/* Same location toggle */}
        <button
          type="button"
          onClick={() => setSameLocation((v) => !v)}
          className="flex items-center gap-2 text-xs text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
        >
          <div className={cn(
            'h-4 w-4 rounded border-2 flex items-center justify-center transition-colors',
            sameLocation
              ? 'bg-[var(--color-accent)] border-[var(--color-accent)]'
              : 'border-[var(--color-border)]'
          )}>
            {sameLocation && <div className="h-1.5 w-1.5 rounded-sm bg-[var(--color-accent-text)]" />}
          </div>
          Return to same location
        </button>

        {/* Dropoff (if different) */}
        {!sameLocation && (
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
              Dropoff location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]" />
              <input
                type="text"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                placeholder="City or airport"
                className="w-full h-[46px] pl-9 pr-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
              />
            </div>
          </div>
        )}
      </div>

      {/* Pickup date + time */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex gap-2">
          <div className="flex-1">
            <DatePicker
              id="pickupDate"
              label={t('pickupDate')}
              value={pickupDate}
              onChange={setPickupDate}
              min={today}
            />
          </div>
          <div className="w-28 shrink-0">
            <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
              Time
            </label>
            <select
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full h-[46px] px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Return date + time */}
        <div className="flex gap-2">
          <div className="flex-1">
            <DatePicker
              id="returnDate"
              label={t('returnDate')}
              value={returnDate}
              onChange={setReturnDate}
              min={pickupDate || today}
            />
          </div>
          <div className="w-28 shrink-0">
            <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
              Time
            </label>
            <select
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
              className="w-full h-[46px] px-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)] transition-colors"
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        </div>
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

      <Button type="submit" size="lg" className="w-full">
        {t('button')} →
      </Button>

      {error && <p className="text-sm text-[var(--color-error)]" role="alert">{error}</p>}
    </form>
  );
}