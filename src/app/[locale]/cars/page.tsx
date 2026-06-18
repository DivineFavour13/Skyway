import { Suspense } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { CarResultsClient } from '@/components/cars/CarResultsClient';
import { CarCardSkeleton } from '@/components/cars/CarCardSkeleton';
import { searchCarRentals } from '@/services/carRental';
import { calculateRentalDays } from '@/lib/mockCars';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    pickup?: string;
    dropoff?: string;
    pickupDate?: string;
    pickupTime?: string;
    returnDate?: string;
    returnTime?: string;
    carType?: string;
  }>;
};

async function CarData({
  pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime, days, locale,
}: {
  pickup: string; dropoff: string; pickupDate: string; pickupTime: string;
  returnDate: string; returnTime: string; days: number; locale: string;
}) {
  const { cars } = await searchCarRentals(pickup, pickupDate, pickupTime, returnDate, returnTime);

  return (
    <CarResultsClient
      cars={cars}
      locale={locale}
      pickup={pickup}
      dropoff={dropoff}
      pickupDate={pickupDate}
      pickupTime={pickupTime}
      returnDate={returnDate}
      returnTime={returnTime}
      days={days}
    />
  );
}

export default async function CarsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { pickup, dropoff, pickupDate, pickupTime, returnDate, returnTime } = await searchParams;

  if (!pickup || !pickupDate || !returnDate) {
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

  const days = calculateRentalDays(pickupDate, returnDate);

  const center = (
    <span className="flex items-center gap-2 text-sm">
      <span className="font-semibold text-[var(--color-text-primary)]">{pickup}</span>
      {dropoff && dropoff !== pickup && (
        <>
          <span>→</span>
          <span className="font-semibold text-[var(--color-text-primary)]">{dropoff}</span>
        </>
      )}
      <span className="text-[var(--color-text-muted)]">·</span>
      <span className="text-[var(--color-text-muted)]">
        {pickupDate} {pickupTime} → {returnDate} {returnTime}
      </span>
      <span className="text-[var(--color-text-muted)]">· {days} day{days !== 1 ? 's' : ''}</span>
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-10">
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <CarData
            pickup={pickup}
            dropoff={dropoff ?? pickup}
            pickupDate={pickupDate}
            pickupTime={pickupTime ?? '10:00'}
            returnDate={returnDate}
            returnTime={returnTime ?? '10:00'}
            days={days}
            locale={locale}
          />
        </Suspense>
      </main>
    </div>
  );
}