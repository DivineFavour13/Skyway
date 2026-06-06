'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useHotelStore } from '@/store/hotelStore';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { Button } from '@/components/ui/Button';
import type { Hotel } from '@/lib/mockHotels';

type Props = {
  hotel: Hotel;
  locale: string;
  checkin: string;
  checkout: string;
  guests: number;
  nights: number;
};

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className="text-xs"
          style={{ color: i < stars ? 'var(--color-accent)' : 'var(--color-border)' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function HotelCard({ hotel, locale, checkin, checkout, guests, nights }: Props) {
  const router = useRouter();
  const t = useTranslations('hotelResults');
  const { setSelectedHotel, setSearchParams } = useHotelStore();
  const formattedPrice = useFormattedPrice(
    String(hotel.pricePerNight),
    hotel.currency
  );

  function handleSelect() {
    setSelectedHotel(hotel);
    setSearchParams(checkin, checkout, guests);
    router.push(`/${locale}/book/hotel/${hotel.id}/details`);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors group">
      <div className="flex flex-col sm:flex-row">
        {/* Color image placeholder */}
        <div
          className="h-40 sm:h-auto sm:w-48 shrink-0"
          style={{
            background: `linear-gradient(135deg, ${hotel.colorFrom}, ${hotel.colorTo})`,
          }}
        >
          <div className="h-full flex items-end p-3">
            <StarRating stars={hotel.stars} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">
                {hotel.name}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)]">
                {hotel.address}
              </p>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">
              {hotel.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
              {hotel.amenities.slice(0, 5).map((a) => (
                <span
                  key={a}
                  className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span
                className="px-2 py-0.5 rounded-lg text-xs font-bold"
                style={{
                  backgroundColor: hotel.reviewScore >= 9 ? 'var(--color-success)' : 'var(--color-accent)',
                  color: 'var(--color-bg)',
                }}
              >
                {hotel.reviewScore.toFixed(1)}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {hotel.reviewCount.toLocaleString()} {t('reviews')}
              </span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:w-36 shrink-0">
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--color-text-primary)]">
                {formattedPrice}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">
                {t('perNight')}
              </p>
              {nights > 1 && (
                <p className="text-xs text-[var(--color-accent)] font-medium mt-0.5">
                  {nights} {nights === 1 ? t('night') : t('nights')}
                </p>
              )}
            </div>
            <Button size="sm" onClick={handleSelect}>
              {t('select')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}