'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { searchAirportsLocal, type Airport } from '@/lib/airports';
import { cn } from '@/lib/utils';

type Props = {
  label: string;
  placeholder: string;
  value: Airport | null;
  onChange: (airport: Airport) => void;
  id: string;
};

export function AirportInput({ label, placeholder, value, onChange, id }: Props) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Airport[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((q: string) => {
    setQuery(q);
    if (q.length >= 2) {
      setResults(searchAirportsLocal(q));
      setIsOpen(true);
      setActiveIndex(-1);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, []);

  const handleSelect = useCallback(
    (airport: Airport) => {
      onChange(airport);
      setQuery('');
      setIsEditing(false);
      setIsOpen(false);
      setResults([]);
    },
    [onChange]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, -1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const selected = results[activeIndex];
      if (selected) handleSelect(selected);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
        setIsEditing(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const showSelected = value && !isEditing;

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <label
        htmlFor={id}
        className="block text-xs font-medium text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide"
      >
        {label}
      </label>

      <div
        className={cn(
          'rounded-xl border bg-[var(--color-surface)] transition-colors duration-150',
          isFocused || isOpen
            ? 'border-[var(--color-accent)]'
            : 'border-[var(--color-border)]'
        )}
      >
        {showSelected ? (
          <button
            type="button"
            onClick={() => {
              setIsEditing(true);
              setQuery('');
              setTimeout(() => inputRef.current?.focus(), 0);
            }}
            className="w-full text-left px-4 py-3 focus:outline-none"
          >
            <span className="text-sm font-semibold text-[var(--color-text-primary)]">
              {value.city_name}
            </span>
            <span className="ml-2 text-xs font-mono text-[var(--color-accent)]">
              {value.iata_code}
            </span>
          </button>
        ) : (
          <input
            ref={inputRef}
            id={id}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              setIsFocused(true);
              if (query.length >= 2) setIsOpen(true);
            }}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            autoComplete="off"
            className="w-full px-4 py-3 bg-transparent text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] outline-none"
            aria-autocomplete="list"
            aria-controls={`${id}-listbox`}
            aria-activedescendant={
              activeIndex >= 0 ? `${id}-option-${activeIndex}` : undefined
            }
          />
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          id={`${id}-listbox`}
          role="listbox"
          className="absolute z-50 mt-1 w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-2xl overflow-hidden"
        >
          {results.map((airport, i) => (
            <li
              key={airport.iata_code}
              id={`${id}-option-${i}`}
              role="option"
              aria-selected={i === activeIndex}
              onMouseDown={() => handleSelect(airport)}
              className={cn(
                'flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors',
                i === activeIndex
                  ? 'bg-[var(--color-accent-dim)]'
                  : 'hover:bg-[var(--color-surface)]'
              )}
            >
              <span className="font-mono text-xs font-bold text-[var(--color-accent)] w-8 shrink-0">
                {airport.iata_code}
              </span>
              <div className="min-w-0 flex-1">
                <div className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {airport.city_name}
                </div>
                <div className="text-xs text-[var(--color-text-muted)] truncate">
                  {airport.name}
                </div>
              </div>
              <span className="text-xs text-[var(--color-text-muted)] shrink-0">
                {airport.iata_country_code}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}