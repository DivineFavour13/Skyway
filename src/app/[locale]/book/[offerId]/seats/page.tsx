'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { SeatMap, SeatElement } from '@/types/duffel';

export default function SeatsPage() {
  const { offerId, locale } = useParams<{ offerId: string; locale: string }>();
  const router = useRouter();
  const t = useTranslations('seats');
  const tSteps = useTranslations('steps');
  const tCommon = useTranslations('common');
  const { selectedOffer, search, selectedSeatIds, toggleSeat, setSelectedSeatDesignators } = useBookingStore();

  const [seatMaps, setSeatMaps] = useState<SeatMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const maxSeats = search.adults;
  const remaining = maxSeats - selectedSeatIds.length;

  useEffect(() => {
    if (!selectedOffer) {
      router.replace(`/${locale}`);
      return;
    }
    fetch(`/api/flights/seats?offerId=${offerId}`)
      .then((r) => r.json())
      .then((d: { data?: SeatMap[]; error?: string }) => {
        if (d.error) throw new Error(d.error);
        setSeatMaps(d.data ?? []);
      })
      .catch((e: unknown) =>
        setError(e instanceof Error ? e.message : tCommon('error'))
      )
      .finally(() => setLoading(false));
  }, [offerId, selectedOffer, router, locale, tCommon]);

  function handleContinue() {
    const designators = selectedSeatIds.map(id => {
      for (const map of seatMaps) {
        for (const cabin of map.cabins) {
          for (const row of cabin.rows) {
            for (const section of row.sections) {
              for (const el of section.elements) {
                if (el.type === 'seat' && el.available_services?.[0]?.id === id) {
                  return el.designator || '';
                }
              }
            }
          }
        }
      }
      return '';
    }).filter(Boolean);

    setSelectedSeatDesignators(designators);
    router.push(`/${locale}/book/${offerId}/details`);
  }

  function handleToggle(seatId: string) {
    const isSelected = selectedSeatIds.includes(seatId);
    if (!isSelected && selectedSeatIds.length >= maxSeats) return;
    toggleSeat(seatId);
  }

  const steps = [tSteps('search'), tSteps('seats'), tSteps('details'), tSteps('review')];

  if (!selectedOffer) return null;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => router.back()}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          ← {tCommon('back')}
        </button>
        <span
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ✦ Nextrip
        </span>
        <div className="w-16" />
      </nav>

      <main className="max-w-2xl mx-auto px-4 py-10">
        <StepIndicator current={2} steps={steps} />

        <div className="mt-8 mb-6 flex items-start justify-between">
          <div>
            <h1
              className="text-2xl font-bold text-[var(--color-text-primary)] mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {t('title')}
            </h1>
            <p className="text-sm text-[var(--color-text-muted)]">{t('subtitle')}</p>
          </div>

          <div className="text-right shrink-0 ml-4">
            <p className="text-2xl font-bold text-[var(--color-accent)]">
              {selectedSeatIds.length}/{maxSeats}
            </p>
            <p className="text-xs text-[var(--color-text-muted)]">
              {remaining > 0
                ? remaining === 1
                  ? t('seatsLeft', { count: remaining })
                  : t('seatsLeftPlural', { count: remaining })
                : t('allSelected')}
            </p>
          </div>
        </div>

        {loading && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <p className="text-[var(--color-text-muted)] text-sm animate-pulse">
              {t('loading')}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center space-y-4">
            <p className="text-[var(--color-text-muted)] text-sm">{t('unavailable')}</p>
            <Button onClick={handleContinue}>{t('continueWithout')}</Button>
          </div>
        )}

        {!loading && !error && seatMaps.length === 0 && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center space-y-4">
            <p className="text-[var(--color-text-muted)] text-sm">{t('noMap')}</p>
            <Button onClick={handleContinue}>{t('continue')}</Button>
          </div>
        )}

        {!loading && seatMaps.length > 0 && (
          <>
            <div className="flex flex-wrap gap-4 mb-6 text-xs text-[var(--color-text-muted)]">
              <Legend color="var(--color-surface-raised)" label={t('unavailableLabel')} />
              <Legend color="var(--color-surface)" label={t('available')} border />
              <Legend color="var(--color-accent)" label={t('selected')} />
            </div>

            {seatMaps.map((map) => (
              <PlaneView
                key={map.id}
                seatMap={map}
                selectedIds={selectedSeatIds}
                onToggle={handleToggle}
                maxSeats={maxSeats}
                cockpitLabel={t('cockpit')}
              />
            ))}

            <div className="mt-8">
              <Button onClick={handleContinue} size="lg" className="w-full">
                {selectedSeatIds.length > 0
                  ? t('continueWith', { count: selectedSeatIds.length })
                  : t('skip')}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Legend({ color, label, border }: { color: string; label: string; border?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="h-4 w-4 rounded"
        style={{
          backgroundColor: color,
          border: border ? '1px solid var(--color-border)' : 'none',
        }}
      />
      <span>{label}</span>
    </div>
  );
}

function PlaneView({
  seatMap,
  selectedIds,
  onToggle,
  maxSeats,
  cockpitLabel,
}: {
  seatMap: SeatMap;
  selectedIds: string[];
  onToggle: (id: string) => void;
  maxSeats: number;
  cockpitLabel: string;
}) {
  const cabin = seatMap.cabins[0];
  if (!cabin) return null;

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-24 sm:w-32 h-10 border-t border-l border-r border-[var(--color-border)]"
        style={{ borderRadius: '60% 60% 0 0 / 100% 100% 0 0', backgroundColor: 'var(--color-surface)' }}
      />
      <div className="w-full border-x border-[var(--color-border)] bg-[var(--color-surface)] py-2 px-4 flex justify-center">
        <p className="text-xs text-[var(--color-text-muted)] uppercase tracking-widest">
          {cockpitLabel}
        </p>
      </div>
      <div className="w-full border border-t-0 border-[var(--color-border)] bg-[var(--color-surface)] overflow-x-auto">
        <div className="min-w-fit mx-auto px-4 py-4 space-y-1.5">
          {cabin.rows.map((row, rowIdx) => {
            const allElements = row.sections.flatMap((s) => s.elements);
            const seats = allElements.filter((el) => el.type === 'seat' && el.designator);
            if (seats.length === 0) return null;
            const mid = Math.ceil(seats.length / 2);
            const leftSeats = seats.slice(0, mid);
            const rightSeats = seats.slice(mid);

            return (
              <div key={rowIdx} className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-[var(--color-text-muted)] w-5 text-right shrink-0">
                  {rowIdx + 1}
                </span>
                <div className="flex gap-1 sm:gap-1.5">
                  {leftSeats.map((el, i) => (
                    <SeatButton key={i} element={el} selectedIds={selectedIds} onToggle={onToggle} maxSeats={maxSeats} />
                  ))}
                </div>
                <div className="w-6 sm:w-8 shrink-0" />
                <div className="flex gap-1 sm:gap-1.5">
                  {rightSeats.map((el, i) => (
                    <SeatButton key={i} element={el} selectedIds={selectedIds} onToggle={onToggle} maxSeats={maxSeats} />
                  ))}
                </div>
                <span className="text-xs text-[var(--color-text-muted)] w-5 shrink-0">
                  {rowIdx + 1}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="w-24 sm:w-32 h-8 border-b border-l border-r border-[var(--color-border)]"
        style={{ borderRadius: '0 0 60% 60% / 0 0 100% 100%', backgroundColor: 'var(--color-surface)' }}
      />
    </div>
  );
}

function SeatButton({
  element, selectedIds, onToggle, maxSeats,
}: {
  element: SeatElement;
  selectedIds: string[];
  onToggle: (id: string) => void;
  maxSeats: number;
}) {
  if (element.type !== 'seat' || !element.designator) {
    return <div className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12" />;
  }
  const svcId = element.available_services?.[0]?.id;
  const isAvailable = !!svcId;
  const isSelected = svcId ? selectedIds.includes(svcId) : false;
  const isAtLimit = selectedIds.length >= maxSeats && !isSelected;
  const price = element.available_services?.[0];
  const tooltipText = isAvailable
    ? `${element.designator}${price ? ` — ${formatPrice(price.total_amount, price.total_currency)}` : ''}`
    : `${element.designator}`;

  return (
    <button
      type="button"
      title={tooltipText}
      disabled={!isAvailable || isAtLimit}
      onClick={() => svcId && onToggle(svcId)}
      className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg text-[10px] sm:text-xs font-bold transition-all flex items-center justify-center"
      style={{
        backgroundColor: isSelected ? 'var(--color-accent)' : isAvailable ? 'var(--color-surface-raised)' : '#2d2d2d',
        color: isSelected ? 'var(--color-accent-text)' : isAvailable ? 'var(--color-text-secondary)' : 'var(--color-text-muted)',
        cursor: !isAvailable || isAtLimit ? 'not-allowed' : 'pointer',
        opacity: !isAvailable ? 0.3 : isAtLimit ? 0.5 : 1,
        border: isAvailable && !isSelected ? '1px solid var(--color-border)' : 'none',
      }}
    >
      {element.designator}
    </button>
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
              <div
                className="h-5 w-5 rounded-full text-xs flex items-center justify-center font-semibold"
                style={{
                  backgroundColor: active ? 'var(--color-accent)' : done ? 'var(--color-success)' : 'var(--color-surface-raised)',
                  color: active ? 'var(--color-accent-text)' : done ? 'var(--color-bg)' : 'var(--color-text-muted)',
                }}
              >
                {done ? '✓' : n}
              </div>
              <span className="text-xs hidden sm:inline" style={{ color: active ? 'var(--color-text-primary)' : 'var(--color-text-muted)' }}>
                {step}
              </span>
            </div>
            {i < steps.length - 1 && <div className="h-px w-4 sm:w-6 bg-[var(--color-border)]" />}
          </div>
        );
      })}
    </div>
  );
}