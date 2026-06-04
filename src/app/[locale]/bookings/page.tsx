'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDateTime, formatDuration } from '@/lib/utils';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import type { DuffelOffer } from '@/types/duffel';

type SavedBooking = {
  ref: string;
  offer: DuffelOffer;
  passenger: {
    firstName: string;
    lastName: string;
    email: string;
    passport: string;
  };
  seatIds: string[];
  bookedAt: string;
};

function BookingCard({
  booking,
  onCancel,
}: {
  booking: SavedBooking;
  onCancel: (ref: string) => void;
}) {
  const t = useTranslations('bookings');
  const formattedPrice = useFormattedPrice(
    booking.offer.total_amount,
    booking.offer.total_currency
  );
  const [confirming, setConfirming] = useState(false);

  const slice = booking.offer.slices[0];
  const firstSeg = slice?.segments[0];
  const lastSeg = slice?.segments[slice.segments.length - 1];
  if (!slice || !firstSeg || !lastSeg) return null;

  const departure = formatDateTime(firstSeg.departing_at);
  const arrival = formatDateTime(lastSeg.arriving_at);
  const stops = slice.segments.length - 1;

  const stopsLabel =
    stops === 0
      ? t('nonstop')
      : stops === 1
      ? `1 ${t('stop')}`
      : `${stops} ${t('stops')}`;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-sm font-bold text-[var(--color-accent)]">
            {booking.ref}
          </p>
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {t('booked')}{' '}
            {new Date(booking.bookedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-success)] text-[var(--color-bg)]">
          {t('confirmed')}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div>
          <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">
            {departure.time}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {firstSeg.origin.iata_code} · {departure.date}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center gap-1">
          <p className="text-xs text-[var(--color-text-muted)]">
            {formatDuration(slice.duration)}
          </p>
          <div className="w-full flex items-center gap-1">
            <div className="h-px flex-1 bg-[var(--color-border)]" />
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-border)]" />
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{stopsLabel}</p>
        </div>

        <div className="text-right">
          <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">
            {arrival.time}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">
            {lastSeg.destination.iata_code} · {arrival.date}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
        <p className="text-xs text-[var(--color-text-muted)]">
          {booking.passenger.firstName} {booking.passenger.lastName}
        </p>
        <p className="text-sm font-bold text-[var(--color-text-primary)]">
          {formattedPrice}
        </p>
      </div>

      {!confirming ? (
        <button
          type="button"
          onClick={() => setConfirming(true)}
          className="w-full py-2 rounded-xl border border-[var(--color-error)] text-xs font-semibold text-[var(--color-error)] hover:bg-[var(--color-error)] hover:text-white transition-colors"
        >
          {t('cancel')}
        </button>
      ) : (
        <div className="rounded-xl border border-[var(--color-error)] p-4 space-y-3">
          <p className="text-sm text-[var(--color-text-primary)] font-medium">
            {t('cancelTitle')}
          </p>
          <p className="text-xs text-[var(--color-text-muted)]">{t('cancelNote')}</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setConfirming(false)}
              className="flex-1 py-2 rounded-xl border border-[var(--color-border)] text-xs font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              {t('keepBooking')}
            </button>
            <button
              type="button"
              onClick={() => onCancel(booking.ref)}
              className="flex-1 py-2 rounded-xl bg-[var(--color-error)] text-xs font-semibold text-white hover:opacity-90 transition-opacity"
            >
              {t('confirmCancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingsPage() {
  const t = useTranslations('bookings');
  const [bookings, setBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('skyway-bookings') ?? '[]');
    setBookings(saved.reverse());
  }, []);

  function handleCancel(ref: string) {
    const updated = bookings.filter((b) => b.ref !== ref);
    localStorage.setItem('skyway-bookings', JSON.stringify(updated));
    setBookings(updated);
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {t('title')}
        </h1>

        {bookings.length === 0 ? (
          <EmptyState
            type="bookings"
            message={t('empty')}
            action={
              <Link href="/" className="text-sm text-[var(--color-accent)] hover:underline">
                {t('searchLink')}
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.ref}
                booking={booking}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}