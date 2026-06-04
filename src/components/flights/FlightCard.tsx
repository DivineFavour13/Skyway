'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';
import { formatDuration, formatDateTime } from '@/lib/utils';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import type { DuffelOffer } from '@/types/duffel';

type Props = {
  offer: DuffelOffer;
  locale: string;
};

export function FlightCard({ offer, locale }: Props) {
  const router = useRouter();
  const t = useTranslations('flights');
  const setSelectedOffer = useBookingStore((s) => s.setSelectedOffer);
  const formattedPrice = useFormattedPrice(offer.total_amount, offer.total_currency);

  const slice = offer.slices[0];
  if (!slice) return null;

  const firstSegment = slice.segments[0];
  const lastSegment = slice.segments[slice.segments.length - 1];
  if (!firstSegment || !lastSegment) return null;

  const departure = formatDateTime(firstSegment.departing_at);
  const arrival = formatDateTime(lastSegment.arriving_at);
  const duration = formatDuration(slice.duration);
  const stops = slice.segments.length - 1;
  const airline = offer.owner;

  const stopsLabel =
    stops === 0
      ? t('nonstop')
      : stops === 1
      ? `1 ${t('stop')}`
      : `${stops} ${t('stops')}`;

  function handleSelect() {
    setSelectedOffer(offer);
    router.push(`/${locale}/book/${offer.id}/seats`);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 hover:border-[var(--color-accent)] transition-colors group">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-2 sm:w-36 shrink-0">
          {airline.logo_symbol_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={airline.logo_symbol_url} alt={airline.name} className="h-6 w-6 rounded object-contain" />
          ) : (
            <div className="h-6 w-6 rounded bg-[var(--color-surface-raised)] flex items-center justify-center text-xs font-mono text-[var(--color-accent)]">
              {airline.iata_code}
            </div>
          )}
          <span className="text-xs text-[var(--color-text-muted)] truncate">{airline.name}</span>
        </div>

        <div className="flex-1 flex items-center gap-3">
          <div className="text-center">
            <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{departure.time}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{firstSegment.origin.iata_code}</p>
          </div>

          <div className="flex-1 flex flex-col items-center gap-1 min-w-0">
            <p className="text-xs text-[var(--color-text-muted)]">{duration}</p>
            <div className="w-full flex items-center gap-1">
              <div className="h-px flex-1 bg-[var(--color-border)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
            </div>
            <p className="text-xs text-[var(--color-text-muted)]">{stopsLabel}</p>
          </div>

          <div className="text-center">
            <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{arrival.time}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{lastSegment.destination.iata_code}</p>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-1 sm:w-32 shrink-0">
          <div className="text-right">
            <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
            <p className="text-xs text-[var(--color-text-muted)]">{t('perPerson')}</p>
          </div>
          <Button size="sm" onClick={handleSelect}>{t('select')}</Button>
        </div>
      </div>
    </div>
  );
}