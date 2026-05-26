import { Suspense } from 'react';
import { useTranslations } from 'next-intl';
import { FlightResults } from '@/components/flights/FlightResults';
import { Link } from '@/navigation';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    adults?: string;
  }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { origin, destination, date, adults } = await searchParams;

  if (!origin || !destination || !date) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--color-text-secondary)]">Missing search parameters.</p>
          <Link
            href="/"
            className="text-[var(--color-accent)] text-sm hover:underline"
          >
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ✦ Skyway
        </Link>
        <div className="text-sm text-[var(--color-text-secondary)]">
          <span className="font-semibold text-[var(--color-text-primary)]">{origin}</span>
          {' → '}
          <span className="font-semibold text-[var(--color-text-primary)]">{destination}</span>
          {' · '}
          {date}
          {' · '}
          {adults ?? '1'} pax
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-10">
        <Suspense fallback={<FlightSkeleton />}>
          <FlightResults
            origin={origin}
            destination={destination}
            date={date}
            adults={Number(adults ?? 1)}
            locale={locale}
          />
        </Suspense>
      </main>
    </div>
  );
}

function FlightSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-5 w-24 rounded bg-[var(--color-surface-raised)]" />
              <div className="h-3 w-16 rounded bg-[var(--color-surface-raised)]" />
            </div>
            <div className="h-3 w-20 rounded bg-[var(--color-surface-raised)]" />
            <div className="space-y-2 text-right">
              <div className="h-5 w-24 rounded bg-[var(--color-surface-raised)]" />
              <div className="h-3 w-16 rounded bg-[var(--color-surface-raised)]" />
            </div>
            <div className="h-10 w-24 rounded-xl bg-[var(--color-surface-raised)]" />
          </div>
        </div>
      ))}
    </div>
  );
}