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
          'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors',
          'border border-[var(--color-border)] bg-[var(--color-surface)]',
          'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
          'hover:border-[var(--color-accent)]'
        )}
      >
        <span>{selected.symbol}</span>
        <span>{selected.code}</span>
        <span className="text-[10px] opacity-60">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-44 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-xl z-50 overflow-hidden">
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              type="button"
              onClick={() => {
                setSelected(c);
                setOpen(false);
              }}
              className={cn(
                'w-full flex items-center justify-between px-4 py-2.5 text-xs transition-colors',
                c.code === selected.code
                  ? 'bg-[var(--color-accent-dim)] text-[var(--color-accent)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
              )}
            >
              <span className="font-semibold">{c.code}</span>
              <span className="text-[var(--color-text-muted)]">{c.symbol} {c.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}