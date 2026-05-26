'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useBookingStore } from '@/store/bookingStore';
import { Button } from '@/components/ui/Button';
import { formatPrice } from '@/lib/utils';
import type { SeatMap, SeatElement } from '@/types/duffel';

export default function SeatsPage() {
  const { offerId, locale } = useParams<{ offerId: string; locale: string }>();
  const router = useRouter();
  const { selectedOffer, selectedSeatIds, toggleSeat } = useBookingStore();

  const [seatMaps, setSeatMaps] = useState<SeatMap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Failed to load seats'))
      .finally(() => setLoading(false));
  }, [offerId, selectedOffer, router, locale]);

  function handleContinue() {
    router.push(`/${locale}/book/${offerId}/details`);
  }

  if (!selectedOffer) return null;

  return (
    <div className="min-h-screen">
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <button
          onClick={() => router.back()}
          className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          ← Back
        </button>
        <span
          className="text-lg font-bold text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ✦ Skyway
        </span>
        <div className="w-16" />
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10">
        {/* Step indicator */}
        <StepIndicator current={2} />

        <h1
          className="text-2xl font-bold text-[var(--color-text-primary)] mt-8 mb-2"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Choose your seat
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Optional — skip to continue without a seat preference.
        </p>

        {loading && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <p className="text-[var(--color-text-muted)] text-sm">Loading seat map…</p>
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              Seat map unavailable for this flight.
            </p>
            <Button onClick={handleContinue}>Continue without seat →</Button>
          </div>
        )}

        {!loading && !error && seatMaps.length === 0 && (
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-10 text-center">
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              No seat map available for this flight.
            </p>
            <Button onClick={handleContinue}>Continue →</Button>
          </div>
        )}

        {!loading && seatMaps.length > 0 && (
          <>
            {seatMaps.map((map) => (
              <SeatMapView
                key={map.id}
                seatMap={map}
                selectedIds={selectedSeatIds}
                onToggle={toggleSeat}
              />
            ))}

            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex gap-4 text-xs text-[var(--color-text-muted)]">
                <Legend color="var(--color-surface-raised)" label="Unavailable" />
                <Legend color="var(--color-surface)" label="Available" border />
                <Legend color="var(--color-accent)" label="Selected" />
              </div>
              <Button onClick={handleContinue}>
                {selectedSeatIds.length > 0
                  ? `Continue with ${selectedSeatIds.length} seat(s) →`
                  : 'Skip & continue →'}
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function Legend({
  color,
  label,
  border,
}: {
  color: string;
  label: string;
  border?: boolean;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <div
        className="h-3 w-3 rounded-sm"
        style={{
          backgroundColor: color,
          border: border ? '1px solid var(--color-border)' : 'none',
        }}
      />
      <span>{label}</span>
    </div>
  );
}

function SeatMapView({
  seatMap,
  selectedIds,
  onToggle,
}: {
  seatMap: SeatMap;
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  const cabin = seatMap.cabins[0];
  if (!cabin) return null;

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 overflow-x-auto">
      <div className="inline-flex flex-col gap-1 min-w-max mx-auto">
        {cabin.rows.map((row, rowIdx) =>
          row.sections.map((section, secIdx) => (
            <div key={`${rowIdx}-${secIdx}`} className="flex gap-1">
              {section.elements.map((el, elIdx) => (
                <SeatCell
                  key={elIdx}
                  element={el}
                  selectedIds={selectedIds}
                  onToggle={onToggle}
                />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function SeatCell({
  element,
  selectedIds,
  onToggle,
}: {
  element: SeatElement;
  selectedIds: string[];
  onToggle: (id: string) => void;
}) {
  if (element.type !== 'seat' || !element.designator) {
    return <div className="h-7 w-7" />;
  }

  const svcId = element.available_services?.[0]?.id;
  const isAvailable = !!svcId;
  const isSelected = svcId ? selectedIds.includes(svcId) : false;
  const price = element.available_services?.[0];

  return (
    <button
      type="button"
      title={
        isAvailable
          ? `${element.designator}${price ? ` — ${formatPrice(price.total_amount, price.total_currency)}` : ''}`
          : `${element.designator} — unavailable`
      }
      disabled={!isAvailable}
      onClick={() => svcId && onToggle(svcId)}
      className="h-7 w-7 rounded-sm text-[10px] font-mono font-bold transition-colors"
      style={{
        backgroundColor: isSelected
          ? 'var(--color-accent)'
          : isAvailable
          ? 'var(--color-surface-raised)'
          : 'oklch(0.20 0.005 50)',
        color: isSelected
          ? 'var(--color-accent-text)'
          : isAvailable
          ? 'var(--color-text-secondary)'
          : 'var(--color-text-muted)',
        cursor: isAvailable ? 'pointer' : 'not-allowed',
        opacity: isAvailable ? 1 : 0.4,
      }}
    >
      {element.designator}
    </button>
  );
}

function StepIndicator({ current }: { current: number }) {
  const steps = ['Search', 'Seats', 'Details', 'Review'];
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
                  backgroundColor: active
                    ? 'var(--color-accent)'
                    : done
                    ? 'var(--color-success)'
                    : 'var(--color-surface-raised)',
                  color: active
                    ? 'var(--color-accent-text)'
                    : done
                    ? 'var(--color-bg)'
                    : 'var(--color-text-muted)',
                }}
              >
                {done ? '✓' : n}
              </div>
              <span
                className="text-xs"
                style={{
                  color: active
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-muted)',
                }}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="h-px w-6"
                style={{ backgroundColor: 'var(--color-border)' }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}