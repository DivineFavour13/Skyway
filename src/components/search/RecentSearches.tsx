'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { getRecentSearches, type RecentSearch } from '@/lib/recentSearches';
import { useBookingStore } from '@/store/bookingStore';

export function RecentSearches() {
  const [searches, setSearches] = useState<RecentSearch[]>([]);
  const locale = useLocale();
  const router = useRouter();
  const setSearch = useBookingStore((s) => s.setSearch);

  useEffect(() => {
    setSearches(getRecentSearches());
  }, []);

  if (searches.length === 0) return null;

  function handleClick(s: RecentSearch) {
    setSearch({
      origin: s.origin,
      destination: s.destination,
      date: s.date,
      returnDate: s.returnDate ?? '',
      tripType: s.tripType,
      adults: s.adults,
    });

    const params = new URLSearchParams({
      origin: s.origin.iata_code,
      destination: s.destination.iata_code,
      date: s.date,
      adults: String(s.adults),
      tripType: s.tripType,
      ...(s.returnDate ? { returnDate: s.returnDate } : {}),
    });

    router.push(`/${locale}/search?${params.toString()}`);
  }

  return (
    <div className="mt-8">
      <p className="text-xs font-medium text-[var(--color-text-muted)] mb-3 uppercase tracking-wide">
        Recent searches
      </p>
      <div className="flex flex-wrap gap-2">
        {searches.map((s, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleClick(s)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors group"
          >
            <span className="text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)]">
              🕐
            </span>
            <span className="text-xs text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)]">
              {s.origin.city_name} → {s.destination.city_name}
            </span>
            <span className="text-xs text-[var(--color-text-muted)]">
              {s.date}
              {s.tripType === 'roundtrip' && s.returnDate && ` → ${s.returnDate}`}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}