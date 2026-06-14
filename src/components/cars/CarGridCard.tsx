'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Users, Settings, Fuel, Check } from 'lucide-react';
import { useCarStore } from '@/store/carStore';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { Button } from '@/components/ui/Button';
import type { Car } from '@/lib/mockCars';

type Props = {
  car: Car;
  locale: string;
  pickup: string;
  dropoff: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  days: number;
};

export function CarGridCard({
  car, locale, pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime, days
}: Props) {
  const router = useRouter();
  const t = useTranslations('carResults');
  const { setSelectedCar, setSearchParams } = useCarStore();
  const formattedPrice = useFormattedPrice(String(car.pricePerDay), car.currency);

  function handleSelect() {
    setSelectedCar(car);
    setSearchParams({ pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime });
    router.push(`/${locale}/book/car/${car.id}/details`);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-all hover:shadow-lg group flex flex-col">
      {/* Color header */}
      <div
        className="h-32 flex flex-col items-center justify-center p-4 relative"
        style={{ background: `linear-gradient(135deg, ${car.colorFrom}, ${car.colorTo})` }}
      >
        <p className="text-white font-bold text-xl">{car.make}</p>
        <p className="text-white/80 text-sm">{car.model}</p>
        <p className="text-white/60 text-xs mt-0.5">{car.year}</p>
        <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize bg-white/20 text-white">
          {car.category}
        </span>
      </div>

      {/* Info */}
      <div className="p-4 flex-1 flex flex-col gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--color-text-primary)]">
            {car.year} {car.make} {car.model}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">{car.provider}</p>
        </div>

        <div className="flex flex-wrap gap-2 text-xs text-[var(--color-text-secondary)]">
          <span className="flex items-center gap-1"><Users size={11} /> {car.seats}</span>
          <span className="flex items-center gap-1"><Settings size={11} /> {car.transmission}</span>
          <span className="flex items-center gap-1"><Fuel size={11} /> {car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-1">
          {car.features.slice(0, 3).map((f) => (
            <span key={f} className="flex items-center gap-0.5 text-[10px] text-[var(--color-text-muted)]">
              <Check size={9} className="text-[var(--color-accent)]" /> {f}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-3 border-t border-[var(--color-border)] flex items-end justify-between">
          <div>
            <p className="text-lg font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{t('perDay')}</p>
            {days > 1 && (
              <p className="text-xs text-[var(--color-accent)] font-medium">
                {days} {t('days')} total
              </p>
            )}
          </div>
          <Button size="sm" onClick={handleSelect}>{t('select')}</Button>
        </div>
      </div>
    </div>
  );
}