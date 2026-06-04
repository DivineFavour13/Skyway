'use client';

import { useState, useRef, useEffect } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

type Props = {
  id?: string;
  label: string;
  value: string;
  onChange: (date: string) => void;
  min?: string;
};

function toLocal(dateStr: string) {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y!, m! - 1, d!);
}

function toISO(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function DatePicker({ id, label, value, onChange, min }: Props) {
  const locale = useLocale();
  const t = useTranslations('search');

  // Locale-aware month and day names
  const monthNames = Array.from({ length: 12 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { month: 'long' }).format(new Date(2024, i, 1))
  );

  // Jan 1 2024 is Monday — gives us Mon-Sun order
  const dayNames = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: 'short' }).format(new Date(2024, 0, i + 1))
  );

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const initial = value ? toLocal(value) : today;
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1));
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const minDate = min ? toLocal(min) : today;
  minDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOfMonth(year: number, month: number) {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  }

  function prevMonth() {
    setView(new Date(view.getFullYear(), view.getMonth() - 1, 1));
  }

  function nextMonth() {
    setView(new Date(view.getFullYear(), view.getMonth() + 1, 1));
  }

  function handleSelect(day: number) {
    const selected = new Date(view.getFullYear(), view.getMonth(), day);
    if (selected < minDate) return;
    onChange(toISO(selected));
    setOpen(false);
  }

  const year = view.getFullYear();
  const month = view.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const selectedDate = value ? toLocal(value) : null;

  const displayValue = selectedDate
    ? selectedDate.toLocaleDateString(locale, { month: 'short', day: 'numeric', year: 'numeric' })
    : '';

  return (
    <div ref={ref} className="relative flex-1">
      {label && (
        <label htmlFor={id} className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}

      <button
        id={id}
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'w-full h-[46px] px-4 rounded-xl border bg-[var(--color-surface)] text-sm text-left transition-colors',
          open ? 'border-[var(--color-accent)] text-[var(--color-text-primary)]' : 'border-[var(--color-border)] text-[var(--color-text-primary)]',
          !value && 'text-[var(--color-text-muted)]'
        )}
      >
        {displayValue || t('selectDate')}
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-2xl p-4"
          style={{ width: '288px', left: '50%', transform: 'translateX(-50%)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <button type="button" onClick={prevMonth} className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors">
              ←
            </button>
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              {monthNames[month]} {year}
            </p>
            <button type="button" onClick={nextMonth} className="h-8 w-8 rounded-lg flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] transition-colors">
              →
            </button>
          </div>

          <div className="grid grid-cols-7 mb-2">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-medium text-[var(--color-text-muted)] py-1">
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-y-0.5">
            {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const date = new Date(year, month, day);
              date.setHours(0, 0, 0, 0);
              const isDisabled = date < minDate;
              const isSelected = selectedDate &&
                selectedDate.getFullYear() === year &&
                selectedDate.getMonth() === month &&
                selectedDate.getDate() === day;
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

              return (
                <button
                  key={day}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleSelect(day)}
                  className={cn(
                    'h-7 w-7 mx-auto rounded-lg text-xs font-medium transition-all flex items-center justify-center',
                    isSelected && 'bg-[var(--color-accent)] text-[var(--color-accent-text)] font-bold',
                    !isSelected && isToday && 'border border-[var(--color-accent)] text-[var(--color-accent)]',
                    !isSelected && !isToday && !isDisabled && 'text-[var(--color-text-primary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-accent)]',
                    isDisabled && 'text-[var(--color-text-muted)] opacity-30 cursor-not-allowed'
                  )}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}