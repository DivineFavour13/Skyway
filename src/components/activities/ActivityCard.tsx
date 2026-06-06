'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useActivityStore } from '@/store/activityStore';
import { useFormattedPrice } from '@/hooks/useFormattedPrice';
import { Button } from '@/components/ui/Button';
import type { Activity } from '@/lib/mockActivities';

type Props = {
  activity: Activity;
  locale: string;
  date: string;
  people: number;
};

export function ActivityCard({ activity, locale, date, people }: Props) {
  const router = useRouter();
  const t = useTranslations('activityResults');
  const { setSelectedActivity, setSearchParams } = useActivityStore();
  const formattedPrice = useFormattedPrice(String(activity.pricePerPerson), activity.currency);

  function handleSelect() {
    setSelectedActivity(activity);
    setSearchParams(date, people);
    router.push(`/${locale}/book/activity/${activity.id}/details`);
  }

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden hover:border-[var(--color-accent)] transition-colors">
      <div className="flex flex-col sm:flex-row">
        {/* Color block */}
        <div
          className="h-36 sm:h-auto sm:w-44 shrink-0 flex items-end p-4"
          style={{ background: `linear-gradient(135deg, ${activity.colorFrom}, ${activity.colorTo})` }}
        >
          <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/20 text-white capitalize">
            {activity.category}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 space-y-2">
            <div>
              <h3 className="text-base font-bold text-[var(--color-text-primary)]">{activity.title}</h3>
              <p className="text-xs text-[var(--color-text-muted)]">{activity.city}, {activity.country} · {activity.duration}</p>
            </div>

            <p className="text-xs text-[var(--color-text-secondary)] line-clamp-2">{activity.description}</p>

            <div className="flex flex-wrap gap-1.5">
              {activity.highlights.slice(0, 3).map((h) => (
                <span key={h} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-[var(--color-surface-raised)] text-[var(--color-text-muted)]">
                  ✓ {h}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg text-xs font-bold bg-[var(--color-accent)] text-[var(--color-accent-text)]">
                {activity.rating.toFixed(1)}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">
                {activity.reviewCount.toLocaleString()} {t('reviews')}
              </span>
              <span className="text-xs text-[var(--color-text-muted)]">· Max {activity.maxGroupSize} people</span>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:w-36 shrink-0">
            <div className="text-right">
              <p className="text-xl font-bold text-[var(--color-text-primary)]">{formattedPrice}</p>
              <p className="text-xs text-[var(--color-text-muted)]">{t('perPerson')}</p>
            </div>
            <Button size="sm" onClick={handleSelect}>{t('select')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}