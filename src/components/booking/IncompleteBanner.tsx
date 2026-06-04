'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { useBookingStore } from '@/store/bookingStore';
import { formatPrice } from '@/lib/utils';

export function IncompleteBanner() {
  const locale = useLocale();
  const router = useRouter();
  const t = useTranslations('incomplete');
  const { selectedOffer, reset } = useBookingStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const bookingRef = useBookingStore.getState().bookingReference;
    if (selectedOffer && !bookingRef) {
      setVisible(true);
    }
  }, [selectedOffer]);

  if (!visible || !selectedOffer) return null;

  const slice = selectedOffer.slices[0];
  const firstSeg = slice?.segments[0];
  const lastSeg = slice?.segments[slice.segments.length - 1];
  if (!slice || !firstSeg || !lastSeg) return null;

  const origin = firstSeg.origin.iata_code;
  const destination = lastSeg.destination.iata_code;
  const price = formatPrice(selectedOffer.total_amount, selectedOffer.total_currency);

  function handleContinue() {
    router.push(`/${locale}/book/${selectedOffer!.id}/seats`);
  }

  function handleDiscard() {
    reset();
    setVisible(false);
  }

  return (
    <div className="border-b border-[var(--color-accent)] bg-[var(--color-accent-dim)] px-4 py-3">
      <div className="max-w-3xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[var(--color-accent)] animate-pulse shrink-0" />
          <p className="text-sm text-[var(--color-text-primary)]">
            {t('message', { origin, destination, price })}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDiscard}
            className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] transition-colors"
          >
            {t('discard')}
          </button>
          <button
            onClick={handleContinue}
            className="px-4 py-1.5 rounded-lg bg-[var(--color-accent)] text-[var(--color-accent-text)] text-xs font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            {t('continue')}
          </button>
        </div>
      </div>
    </div>
  );
}