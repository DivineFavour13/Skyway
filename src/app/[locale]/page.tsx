import { useTranslations } from 'next-intl';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchHub } from '@/components/search/SearchHub';
import { RecentSearches } from '@/components/search/RecentSearches';

const POPULAR_DESTINATIONS = [
  { city: 'Lagos', country: 'Nigeria' },
  { city: 'London', country: 'UK' },
  { city: 'Dubai', country: 'UAE' },
  { city: 'New York', country: 'USA' },
  { city: 'Paris', country: 'France' },
  { city: 'Nairobi', country: 'Kenya' },
];

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-3xl">
          <SearchHub />

          <div className="mt-8">
            <p className="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">
              {t('popularDestinations')}
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_DESTINATIONS.map((d) => (
                <span
                  key={d.city}
                  className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-default"
                >
                  {d.city}, {d.country}
                </span>
              ))}
            </div>
          </div>

          <RecentSearches />
        </div>
      </main>

      <Footer />
    </div>
  );
}