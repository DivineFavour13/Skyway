import { Suspense } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { CarResultsClient } from '@/components/cars/CarResultsClient';
import { CarCardSkeleton } from '@/components/cars/CarCardSkeleton';
import { searchCars, calculateRentalDays } from '@/lib/mockCars';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    pickup?: string;
    pickupDate?: string;
    returnDate?: string;
    carType?: string;
  }>;
};

export default async function CarsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { pickup, pickupDate, returnDate, carType } = await searchParams;

  if (!pickup || !pickupDate || !returnDate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--color-text-secondary)]">Missing search parameters.</p>
          <Link href="/" className="text-[var(--color-accent)] text-sm hover:underline">← Back to search</Link>
        </div>
      </div>
    );
  }

  const cars = searchCars(pickup, carType ?? 'any');
  const days = calculateRentalDays(pickupDate, returnDate);

  const center = (
    <span>
      <span className="font-semibold text-[var(--color-text-primary)]">{pickup}</span>
      {' · '}{pickupDate} → {returnDate}
      {' · '}{days} day{days !== 1 ? 's' : ''}
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <Suspense fallback={
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <CarCardSkeleton key={i} />)}
          </div>
        }>
          <CarResultsClient
            cars={cars}
            locale={locale}
            pickup={pickup}
            pickupDate={pickupDate}
            returnDate={returnDate}
            days={days}
          />
        </Suspense>
      </main>
    </div>
  );
}