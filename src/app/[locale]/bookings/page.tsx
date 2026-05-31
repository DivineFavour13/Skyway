'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatPrice, formatDateTime, formatDuration } from '@/lib/utils';
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

export default function BookingsPage() {
  const [bookings, setBookings] = useState<SavedBooking[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('skyway-bookings') ?? '[]');
    setBookings(saved.reverse());
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="max-w-3xl mx-auto px-4 py-10">
        <h1
          className="text-3xl font-bold text-[var(--color-text-primary)] mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <EmptyState
            type="bookings"
            message="You haven't booked any flights yet."
            action={
              <Link
                href="/"
                className="text-sm text-[var(--color-accent)] hover:underline"
              >
                Search for flights →
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => {
              const slice = booking.offer.slices[0];
              const firstSeg = slice?.segments[0];
              const lastSeg = slice?.segments[slice.segments.length - 1];
              if (!slice || !firstSeg || !lastSeg) return null;

              const departure = formatDateTime(firstSeg.departing_at);
              const arrival = formatDateTime(lastSeg.arriving_at);
              const stops = slice.segments.length - 1;

              return (
                <div
                  key={booking.ref}
                  className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-4"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-mono text-sm font-bold text-[var(--color-accent)]">
                        {booking.ref}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                        Booked {new Date(booking.bookedAt).toLocaleDateString('en-US', {
                          month: 'short', day: 'numeric', year: 'numeric',
                        })}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[var(--color-success)] text-[var(--color-bg)]">
                      Confirmed
                    </span>
                  </div>

                  {/* Flight timeline */}
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
                      <p className="text-xs text-[var(--color-text-muted)]">
                        {stops === 0 ? 'Nonstop' : `${stops} stop${stops > 1 ? 's' : ''}`}
                      </p>
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

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {booking.passenger.firstName} {booking.passenger.lastName}
                    </p>
                    <p className="text-sm font-bold text-[var(--color-text-primary)]">
                      {formatPrice(booking.offer.total_amount, booking.offer.total_currency)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}