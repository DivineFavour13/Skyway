'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { DatePicker } from '@/components/ui/DatePicker';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

type ActivityCategory = 'all' | 'tours' | 'experiences' | 'adventure' | 'food' | 'culture';

export function ActivitySearchForm() {
  const t = useTranslations('activities');
  const locale = useLocale();
  const router = useRouter();

  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState(2);
  const [category, setCategory] = useState<ActivityCategory>('all');
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0] ?? '';

  const categories: { value: ActivityCategory; label: string }[] = [
    { value: 'all',         label: t('all') },
    { value: 'tours',       label: t('tours') },
    { value: 'experiences', label: t('experiences') },
    { value: 'adventure',   label: t('adventure') },
    { value: 'food',        label: t('food') },
    { value: 'culture',     label: t('culture') },
  ];

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!destination || !date) {
      setError('Please fill in all fields.');
      return;
    }
    setError('');
    const params = new URLSearchParams({ destination, date, people: String(people), category });
    router.push(`/${locale}/activities?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Destination */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {t('destination')}
        </label>
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder={t('destinationPlaceholder')}
          className="w-full h-[46px] px-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent)] transition-colors"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {t('category')}
        </label>
        <div className="flex gap-1 p-1 rounded-xl bg-[var(--color-surface-raised)] flex-wrap">
          {categories.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setCategory(value)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                category === value
                  ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Date + people + submit */}
      <div className="flex flex-col sm:flex-row gap-3 items-end">
        <DatePicker
          id="activity-date"
          label={t('date')}
          value={date}
          onChange={setDate}
          min={today}
        />

        <div className="w-full sm:w-32">
          <label className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
            {t('people')}
          </label>
          <div className="flex h-[46px] items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
            <button
              type="button"
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              className="h-full w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              −
            </button>
            <span className="flex-1 text-center text-sm font-semibold text-[var(--color-text-primary)]">
              {people}
            </span>
            <button
              type="button"
              onClick={() => setPeople((p) => Math.min(20, p + 1))}
              className="h-full w-10 flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              +
            </button>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full sm:w-auto h-[46px] whitespace-nowrap">
          {t('button')} →
        </Button>
      </div>

      {error && (
        <p className="text-sm text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}