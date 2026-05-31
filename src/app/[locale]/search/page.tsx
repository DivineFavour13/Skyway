import { Suspense } from 'react';
import { FlightResults } from '@/components/flights/FlightResults';
import { FlightCardSkeleton } from '@/components/flights/FlightCardSkeleton';
import { Navbar } from '@/components/layout/Navbar';
import { Link } from '@/navigation';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    origin?: string;
    destination?: string;
    date?: string;
    adults?: string;
    tripType?: string;
    returnDate?: string;
  }>;
};

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { origin, destination, date, adults, tripType, returnDate } = await searchParams;

  if (!origin || !destination || !date) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--color-text-secondary)]">Missing search parameters.</p>
          <Link href="/" className="text-[var(--color-accent)] text-sm hover:underline">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  const center = (
    <span>
      <span className="font-semibold text-[var(--color-text-primary)]">{origin}</span>
      {' → '}
      <span className="font-semibold text-[var(--color-text-primary)]">{destination}</span>
      {' · '}
      {date}
      {tripType === 'roundtrip' && returnDate && ` → ${returnDate}`}
      {' · '}
      {adults ?? '1'} pax
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <Suspense fallback={
          <div className="space-y-3">
            <div className="skeleton h-4 w-32 rounded-full mb-6" />
            {Array.from({ length: 5 }).map((_, i) => (
              <FlightCardSkeleton key={i} />
            ))}
          </div>
        }>
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