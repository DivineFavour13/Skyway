'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useActivityStore } from '@/store/activityStore';
import { Button } from '@/components/ui/Button';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';

function generateRef() {
  return 'NXT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function ActivityReviewPage() {
  const { activityId, locale } = useParams<{ activityId: string; locale: string }>();
  const router = useRouter();
  const { selectedActivity, date, people, guestDetails, bookingReference, setBookingReference, reset } = useActivityStore();

  const [confirmed, setConfirmed] = useState(!!bookingReference);
  const [loading, setLoading] = useState(false);

  const totalPrice = selectedActivity ? String(selectedActivity.pricePerPerson * people) : '0';
  const currency = selectedActivity?.currency ?? 'USD';
  const formattedTotal = useFormattedPrice(totalPrice, currency);

  useEffect(() => {
    if (!selectedActivity || !guestDetails) router.replace(`/${locale}`);
  }, [selectedActivity, guestDetails, router, locale]);

  if (!selectedActivity || !guestDetails) return null;

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      const ref = generateRef();
      setBookingReference(ref);

      const bookings = JSON.parse(localStorage.getItem('nextrip-bookings') ?? '[]') as unknown[];
      bookings.push({
        type: 'activity',
        ref,
        activity: selectedActivity,
        date,
        people,
        guestDetails,
        totalPrice,
        currency,
        bookedAt: new Date().toISOString(),
      });
      localStorage.setItem('nextrip-bookings', JSON.stringify(bookings));

      setConfirmed(true);
      setLoading(false);
    }, 1200);
  }

  if (confirmed && bookingReference) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-5xl">🎯</div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            Booking confirmed
          </h1>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-2">
            <p className="text-sm text-[var(--color-text-muted)]">Booking reference</p>
            <p className="text-2xl font-mono font-bold text-[var(--color-accent)]">{bookingReference}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {guestDetails.firstName} {guestDetails.lastName} · {selectedActivity.title}
            </p>
          </div>
          <Button variant="outline" className="w-full" onClick={() => { reset(); router.push(`/${locale}`); }}>
            Back to search
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button onClick={() => router.back()} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors">← Back</button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>✦ Nextrip</span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          Review your booking
        </h1>

        <div className="space-y-4">
          <Section title="Activity">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl shrink-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, ${selectedActivity.colorFrom}, ${selectedActivity.colorTo})` }}>
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">{selectedActivity.title}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{selectedActivity.city} · {selectedActivity.duration}</p>
              </div>
            </div>
          </Section>

          <Section title="Details">
            <Row label="Date" value={date} />
            <Row label="People" value={String(people)} />
          </Section>

          <Section title="Contact">
            <Row label="Name" value={`${guestDetails.firstName} ${guestDetails.lastName}`} />
            <Row label="Email" value={guestDetails.email} />
            <Row label="Phone" value={guestDetails.phone} />
          </Section>

          <Section title="Total">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-text-secondary)]">Activity total</p>
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedTotal}</p>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">Includes all fees</p>
          </Section>
        </div>

        <div className="mt-8">
          <Button size="lg" className="w-full" onClick={handleConfirm} loading={loading}>Confirm booking →</Button>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">This is a test booking. No real charges will be made.</p>
        </div>
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
      <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">{title}</p>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-[var(--color-text-muted)]">{label}</p>
      <p className="text-sm text-[var(--color-text-primary)] font-medium">{value}</p>
    </div>
  );
}