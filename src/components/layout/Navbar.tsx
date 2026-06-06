'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { IncompleteBanner } from '@/components/booking/IncompleteBanner';
import { CurrencySelector } from '@/components/ui/CurrencySelector';

type Props = {
  showBack?: boolean;
  onBack?: () => void;
  center?: React.ReactNode;
};

export function Navbar({ showBack, onBack, center }: Props) {
  const locale = useLocale();
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--color-border)] relative z-40">
        {/* Left */}
        <div className="flex items-center gap-3 w-24 sm:w-36">
          {showBack ? (
            <button
              onClick={onBack}
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors flex items-center gap-1"
            >
              <span>←</span>
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              ✦ Nextrip
            </Link>
          )}
        </div>

        {/* Center */}
        {center && (
          <div className="hidden sm:block text-sm text-[var(--color-text-secondary)] text-center">
            {center}
          </div>
        )}

        {/* Right — desktop */}
        <div className="hidden sm:flex items-center gap-4 w-auto justify-end">
          <Link
            href="/bookings"
            className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
          >
            {t('bookings')}
          </Link>
          <CurrencySelector />
          <div className="flex gap-1">
            {routing.locales.map((l) => (
              <Link
                key={l}
                href="/"
                locale={l}
                className={cn(
                  'px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors',
                  l === locale
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — mobile hamburger */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="h-9 w-9 flex items-center justify-center rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)]"
            aria-label="Menu"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="sm:hidden border-b border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-4 space-y-3 z-30">
          <Link
            href="/bookings"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors py-2"
          >
            {t('bookings')}
          </Link>
          <div className="py-1">
            <p className="text-xs text-[var(--color-text-muted)] mb-2 uppercase tracking-wide">
              {t('currency')}
            </p>
            <CurrencySelector />
          </div>
          <div className="flex gap-2 pt-1 border-t border-[var(--color-border)]">
            {routing.locales.map((l) => (
              <Link
                key={l}
                href="/"
                locale={l}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition-colors',
                  l === locale
                    ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}

      <IncompleteBanner />
    </>
  );
}