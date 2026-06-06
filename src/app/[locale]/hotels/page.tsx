import { Suspense } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { HotelResultsClient } from '@/components/hotels/HotelResultsClient';
import { HotelCardSkeleton } from '@/components/hotels/HotelCardSkeleton';
import { searchHotels, calculateNights } from '@/lib/mockHotels';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    destination?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
    rooms?: string;
  }>;
};

export default async function HotelsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { destination, checkin, checkout, guests } = await searchParams;

  if (!destination || !checkin || !checkout) {
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

  const hotels = searchHotels(destination);
  const nights = calculateNights(checkin, checkout);

  const center = (
    <span>
      <span className="font-semibold text-[var(--color-text-primary)]">{destination}</span>
      {' · '}
      {checkin} → {checkout}
      {' · '}
      {guests ?? '2'} guests
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />

      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <Suspense fallback={
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <HotelCardSkeleton key={i} />
            ))}
          </div>
        }>
          <HotelResultsClient
            hotels={hotels}
            locale={locale}
            checkin={checkin}
            checkout={checkout}
            guests={Number(guests ?? 2)}
            nights={nights}
            destination={destination}
          />
        </Suspense>
      </main>
    </div>
  );
}