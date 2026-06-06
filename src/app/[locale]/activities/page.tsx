import { Suspense } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { ActivityResultsClient } from '@/components/activities/ActivityResultsClient';
import { ActivityCardSkeleton } from '@/components/activities/ActivityCardSkeleton';
import { searchActivities } from '@/lib/mockActivities';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    destination?: string;
    date?: string;
    people?: string;
    category?: string;
  }>;
};

export default async function ActivitiesPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { destination, date, people, category } = await searchParams;

  if (!destination || !date) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--color-text-secondary)]">Missing search parameters.</p>
          <Link href="/" className="text-[var(--color-accent)] text-sm hover:underline">← Back to search</Link>
        </div>
      </div>
    );
  }

  const activities = searchActivities(destination, category ?? 'all');

  const center = (
    <span>
      <span className="font-semibold text-[var(--color-text-primary)]">{destination}</span>
      {' · '}{date}
      {' · '}{people ?? '2'} people
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <Suspense fallback={
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => <ActivityCardSkeleton key={i} />)}
          </div>
        }>
          <ActivityResultsClient
            activities={activities}
            locale={locale}
            date={date}
            people={Number(people ?? 2)}
            destination={destination}
          />
        </Suspense>
      </main>
    </div>
  );
}