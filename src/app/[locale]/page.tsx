import { useTranslations } from 'next-intl';
import { SearchForm } from '@/components/search/SearchForm';
import { Link } from '@/navigation';
import { routing } from '@/i18n/routing';

const POPULAR_ROUTES = [
  { from: 'LOS', fromCity: 'Lagos', to: 'LHR', toCity: 'London' },
  { from: 'LOS', fromCity: 'Lagos', to: 'DXB', toCity: 'Dubai' },
  { from: 'LOS', fromCity: 'Lagos', to: 'JFK', toCity: 'New York' },
  { from: 'ABV', fromCity: 'Abuja', to: 'LHR', toCity: 'London' },
  { from: 'LOS', fromCity: 'Lagos', to: 'CDG', toCity: 'Paris' },
];

function LocaleSwitcher() {
  return (
    <div className="flex gap-1">
      {routing.locales.map((l) => (
        <Link
          key={l}
          href="/"
          locale={l}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors"
        >
          {l}
        </Link>
      ))}
    </div>
  );
}

export default function HomePage() {
  const t = useTranslations('search');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-[var(--color-border)]">
        <span
          className="text-xl font-bold tracking-tight text-[var(--color-text-primary)]"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          ✦ Skyway
        </span>
        <LocaleSwitcher />
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-3xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-[var(--color-accent)] mb-4">
            Flight Search
          </p>

          <h1
            className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-10 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t('title')}
          </h1>

          {/* Search card */}
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
            <SearchForm />
          </div>

          {/* Popular routes */}
          <div className="mt-8">
            <p className="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">
              Popular routes
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
        </div>
      </main>
    </div>
  );
}