'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export type BookingTab = 'flights' | 'hotels' | 'cars' | 'activities';

type Props = {
  active: BookingTab;
  onChange: (tab: BookingTab) => void;
};

const TABS: { id: BookingTab; icon: string }[] = [
  { id: 'flights',    icon: '✈' },
  { id: 'hotels',     icon: '⌂' },
  { id: 'cars',       icon: '⊡' },
  { id: 'activities', icon: '◈' },
];

export function BookingTabs({ active, onChange }: Props) {
  const t = useTranslations('tabs');

  return (
    <div className="flex gap-1 p-1 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] mb-6">
      {TABS.map(({ id, icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onChange(id)}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-xl text-sm font-medium transition-all',
            active === id
              ? 'bg-[var(--color-accent)] text-[var(--color-accent-text)] shadow-sm'
              : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
          )}
        >
          <span className="text-base">{icon}</span>
          <span className="hidden sm:inline">{t(id)}</span>
        </button>
      ))}
    </div>
  );
}