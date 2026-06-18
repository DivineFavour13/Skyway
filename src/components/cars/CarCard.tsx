'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Users, DoorOpen, Settings, Fuel } from 'lucide-react';
import { useCarStore } from '@/store/carStore';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import type { Car } from '@/lib/mockCars';

type Props = {
  car: Car;
  locale: string;
  pickup: string;
  pickupDate: string;
  returnDate: string;
  days: number;
};

export function CarCard({ car, locale, pickup, pickupDate, returnDate, days }: Props) {
  const router = useRouter();
  const t = useTranslations('carResults');
  const { setSelectedCar, setSearchParams } = useCarStore();
  const formattedPrice = useFormattedPrice(String(car.pricePerDay), car.currency);

  function handleSelect() {
    setSelectedCar(car);
    setSearchParams({
      pickup,
      dropoff: pickup,
      pickupDate,
      pickupTime: '10:00',
      returnDate,
      returnTime: '10:00',
    });
    router.push(`/${locale}/book/car/${car.id}/details`);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors">
      <div className="flex flex-col sm:flex-row">
        <div
          className="h-36 sm:h-auto sm:w-44 shrink-0 flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${car.colorFrom}, ${car.colorTo})` }}
        >
          <div className="text-center p-4">
            <p className="text-white font-bold text-lg">{car.make}</p>
            <p className="text-white/80 text-sm">{car.model}</p>
            <span className={cn('mt-2 inline-block px-2 py-0.5 rounded-full text-xs font-semibold capitalize', 'bg-white/20 text-white')}>
              {car.category}
            </span>
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                {car.year} {car.make} {car.model}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">{car.provider}</p>
            </div>

            <div className="flex flex-wrap gap-3 text-xs text-[var(--color-text-secondary)]">
              <span className="flex items-center gap-1"><Users size={12} /> {car.seats} seats</span>
              <span className="flex items-center gap-1"><DoorOpen size={12} /> {car.doors} doors</span>
              <span className="flex items-center gap-1"><Settings size={12} /> {car.transmission}</span>
              <span className="flex items-center gap-1"><Fuel size={12} /> {car.fuelType}</span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {car.features.map((f) => (
                <span key={f} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:w-32 shrink-0">
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('perDay')}</p>
              {days > 1 && (
                <p className="text-xs text-[var(--color-accent)] font-medium mt-0.5">
                  {days} {days === 1 ? t('day') : t('days')}
                </p>
              )}
            </div>
            <Button size="sm" onClick={handleSelect}>{t('select')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}