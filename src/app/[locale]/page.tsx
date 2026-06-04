import { useTranslations } from 'next-intl';
import { SearchForm } from '@/components/search/SearchForm';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RecentSearches } from '@/components/search/RecentSearches';

const POPULAR_ROUTES = [
  { from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London' },
  { from: 'LOS', fromCity: 'Lagos', to: 'DXB', toCity: 'Dubai' },
  { from: 'LOS', fromCity: 'Lagos', to: 'JFK', toCity: 'New York' },
  { from: 'ABV', fromCity: 'Abuja', to: 'LHR', toCity: 'London' },
  { from: 'LOS', fromCity: 'Lagos', to: 'CDG', toCity: 'Paris' },
];

export default function HomePage() {
  const t = useTranslations('search');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
            {t('flightSearch')}
          </p>
          <h1
            className="text-3xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-8 sm:mb-10 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
          </h1>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 sm:p-6">
            <SearchForm />
          </div>

          <div className="mt-8">
            <p className="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">
              {t('popularRoutes')}
            </p>
            <div className="flex flex-wrap gap-2">
              {POPULAR_ROUTES.map((r) => (
                <span
                  key={`${r.from}-${r.to}`}
                  className="px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors cursor-default"
                >
                  {r.fromCity} → {r.toCity}
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