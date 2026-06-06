'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ActivityCard } from './ActivityCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { cn } from '@/lib/utils';
import type { Activity } from '@/lib/mockActivities';

type SortBy = 'price' | 'rating';

type Props = {
  activities: Activity[];
  locale: string;
  date: string;
  people: number;
  destination: string;
};

export function ActivityResultsClient({ activities, locale, date, people, destination }: Props) {
  const t = useTranslations('activityResults');
  const [sortBy, setSortBy] = useState<SortBy>('rating');

  const sorted = [...activities].sort((a, b) => {
    if (sortBy === 'price') return a.pricePerPerson - b.pricePerPerson;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <p className="text-sm text-[var(--color-text-muted)]">
          {activities.length === 1
            ? t('found', { count: activities.length })
            : t('foundPlural', { count: activities.length })}
          <span className="ml-1 text-[var(--color-text-primary)] font-medium">in {destination}</span>
        </p>

        <div className="flex items-center gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)]">
          {([
            { value: 'rating' as SortBy, label: t('topRated') },
            { value: 'price'  as SortBy, label: t('priceLow') },
          ]).map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setSortBy(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                sortBy === value
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {sorted.length === 0 ? (
        <EmptyState type="filtered" message={t('noResults', { city: destination })} />
      ) : (
        <div className="space-y-4">
          {sorted.map((activity) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              locale={locale}
              date={date}
              people={people}
            />
          ))}
        </div>
      )}
    </div>
  );
}