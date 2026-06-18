'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowLeft, CheckCircle, Check } from 'lucide-react';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';
import { formatDuration, formatDateTime } from '@/lib/utils';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { generateBoardingPass } from '@/lib/boardingPass';

function generateRef() {
  return 'NXT-' + Math.random().toString(36).slice(2, 8).toUpperCase();
}

export default function ReviewPage() {
  const { offerId, locale } = useParams<{ offerId: string; locale: string }>();
  const router = useRouter();
  const t = useTranslations('booking');
  const tConf = useTranslations('confirmation');
  const tSteps = useTranslations('steps');
  const tCommon = useTranslations('common');
  const { selectedOffer, passengers, selectedSeatIds, selectedSeatDesignators, bookingReference, setBookingReference, reset } = useBookingStore();

  const [confirmed, setConfirmed] = useState(!!bookingReference);
  const [loading, setLoading] = useState(false);

  const formattedTotal = useFormattedPrice(
    selectedOffer?.total_amount ?? '0',
    selectedOffer?.total_currency ?? 'USD'
  );

  useEffect(() => {
    if (!selectedOffer || passengers.length === 0) router.replace(`/${locale}`);
  }, [selectedOffer, passengers, router, locale]);

  if (!selectedOffer || passengers.length === 0) return null;

  const slice = selectedOffer.slices[0];
  const firstSeg = slice?.segments[0];
  const lastSeg = slice?.segments[slice.segments.length - 1];
  const steps = [tSteps('search'), tSteps('seats'), tSteps('details'), tSteps('review')];

  function handleConfirm() {
    setLoading(true);
    setTimeout(() => {
      const ref = generateRef();
      setBookingReference(ref);
      const bookings = JSON.parse(localStorage.getItem('nextrip-bookings') ?? '[]') as unknown[];
      bookings.push({
        type: 'flight',
        ref,
        offer: selectedOffer,
        passenger: passengers[0], // legacy single passenger support
        passengers, // multi-passenger support
        seatIds: selectedSeatIds,
        seatDesignators: selectedSeatDesignators,
        bookedAt: new Date().toISOString()
      });
      localStorage.setItem('nextrip-bookings', JSON.stringify(bookings));
      setConfirmed(true);
      setLoading(false);
    }, 1200);
  }

  if (confirmed && bookingReference) {
    const primary = passengers[0];
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="h-20 w-20 rounded-full flex items-center justify-center mx-auto" style={{ backgroundColor: 'rgba(74, 222, 128, 0.15)' }}>
            <CheckCircle size={48} style={{ color: 'var(--color-success)' }} />
          </div>
          <h1 className="text-3xl font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>
            {tConf('title')}
          </h1>
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 space-y-2">
            <p className="text-sm text-[var(--color-text-muted)]">{tConf('refLabel')}</p>
            <p className="text-2xl font-mono font-bold text-[var(--color-accent)]">{bookingReference}</p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {primary.firstName} {primary.lastName} · {primary.email}
              {passengers.length > 1 && ` (+${passengers.length - 1} traveler${passengers.length > 2 ? 's' : ''})`}
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <Button size="lg" className="w-full" onClick={() => generateBoardingPass(selectedOffer, passengers, bookingReference, selectedSeatDesignators)}>
              {tConf('download')}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => { reset(); router.push(`/${locale}`); }}>
              {tConf('bookAnother')}
            </Button>
          </div>
          <p className="text-xs text-[var(--color-text-muted)]">{tConf('pdfNote')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button onClick={() => router.back()} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1.5">
          <ArrowLeft size={16} /> {tCommon('back')}
        </button>
        <span className="text-lg font-bold text-[var(--color-text-primary)]" style={{ fontFamily: 'var(--font-display)' }}>✦ Nextrip</span>
        <div className="w-16" />
      </nav>

      <main className="max-w-xl mx-auto px-4 py-10">
        <StepIndicator current={4} steps={steps} />
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-8" style={{ fontFamily: 'var(--font-display)' }}>
          {t('review')}
        </h1>

        <div className="space-y-4">
          <Section title={t('flight')}>
            {slice && firstSeg && lastSeg && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{formatDateTime(firstSeg.departing_at).time}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{firstSeg.origin.iata_code} · {formatDateTime(firstSeg.departing_at).date}</p>
                  </div>
                  <div className="text-center text-xs text-[var(--color-text-muted)]">
                    <p>{formatDuration(slice.duration)}</p>
                    <div className="h-px w-16 bg-[var(--color-border)] my-1" />
                    <p>{slice.segments.length === 1 ? t('nonstop') : `${slice.segments.length - 1} ${t('stop')}`}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[var(--color-text-primary)] tabular-nums">{formatDateTime(lastSeg.arriving_at).time}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">{lastSeg.destination.iata_code} · {formatDateTime(lastSeg.arriving_at).date}</p>
                  </div>
                </div>
                <p className="text-xs text-[var(--color-text-muted)]">{selectedOffer.owner.name}</p>
              </div>
            )}
          </Section>

          {passengers.map((p, idx) => (
            <Section key={idx} title={`${t('passenger')} ${idx + 1} ${idx === 0 ? `(${t('primary')})` : ''}`}>
              <Row label={t('name')} value={`${p.firstName} ${p.lastName}`} />
              <Row label={t('emailLabel')} value={p.email} />
              <Row label={t('passportLabel')} value={p.passport} />
              {selectedSeatDesignators[idx] && (
                <Row label={t('seatSection')} value={selectedSeatDesignators[idx]} />
              )}
            </Section>
          ))}

          {selectedSeatIds.length > 0 && (
            <Section title={t('seatSection')}>
              <p className="text-sm text-[var(--color-text-secondary)]">{t('seatsSelected', { count: selectedSeatIds.length })}</p>
            </Section>
          )}

          <Section title={t('total')}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--color-text-secondary)]">{t('flightTotal')}</p>
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedTotal}</p>
            </div>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">{t('taxNote')}</p>
          </Section>
        </div>

        <div className="mt-8">
          <Button size="lg" className="w-full" onClick={handleConfirm} loading={loading}>{t('confirm')}</Button>
          <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">{t('testNote')}</p>
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

function StepIndicator({ current, steps }: { current: number; steps: string[] }) {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, i) => {
        const n = i + 1;
        const done = n < current;
        const active = n === current;
        return (
          <div key={step} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="h-5 w-5 rounded-full text-xs flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: active ? 'var(--color-accent)' : done ? 'var(--color-success)' : 'var(--color-surface-raised)',
                  color: active ? 'var(--color-accent-text)' : done ? 'var(--color-bg)' : 'var(--color-text-muted)',
                }}>
                {done ? <Check size={10} /> : n}
              </div>
              <span className="text-xs" style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>{step}</span>
            </div>
            {i < steps.length - 1 && <div className="h-px w-6 bg-[var(--color-border)]" />}
          </div>
        );
      })}
    </div>
  );
}