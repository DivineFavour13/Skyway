'use client';

import { useTranslations } from 'next-intl';
import { Building2, Car, Compass, Plane, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export type BookingTab = 'flights' | 'hotels' | 'cars' | 'activities';

type Props = {
  active: BookingTab;
  onChange: (tab: BookingTab) => void;
};

const TABS: { id: BookingTab; Icon: LucideIcon }[] = [
  { id: 'flights', Icon: Plane },
  { id: 'hotels', Icon: Building2 },
  { id: 'cars', Icon: Car },
  { id: 'activities', Icon: Compass },
];

export function BookingTabs({ active, onChange }: Props) {
  const t = useTranslations('tabs');

  return (
    <div className="flex gap-1 p-1 rounded-2xl bg-[var(--color-surface-raised)] border border-[var(--color-border)] mb-6">
      {TABS.map(({ id, Icon }) => (
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
          <Icon size={18} strokeWidth={2} aria-hidden="true" />
          <span className="hidden sm:inline">{t(id)}</span>
        </button>
      ))}
    </div>
  );
}
