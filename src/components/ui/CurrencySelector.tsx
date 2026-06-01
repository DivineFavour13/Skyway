'use client';

import { useState, useRef, useEffect } from 'react';
import { useCurrencyStore, CURRENCIES } from '@/store/currencyStore';
import { cn } from '@/lib/utils';

export function CurrencySelector() {
  const { selected, setSelected } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors',
          'border bg-[var(--color-surface)]',
          open
            ? 'border-[var(--color-accent)] text-[var(--color-accent)]'
            : 'border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]'
        )}
      >
        <span className="text-base">{selected.symbol}</span>
        <span>{selected.code}</span>
        <span className="text-[10px] opacity-50">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-2xl z-50 overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-[var(--color-border)]">
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-wide">
              Select currency
            </p>
          </div>

          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-3 text-sm transition-colors',
                c.code === selected.code
                  ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-base w-6 text-center">{c.symbol}</span>
                <span className="font-semibold">{c.code}</span>
              </div>
              <span className="text-xs text-[var(--color-text-muted)]">{c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}