import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: string, fromCurrency: string): string {
  // Dynamic import avoided — components should call convertAndFormat directly
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: fromCurrency,
  }).format(Number(amount));
}

export function formatDuration(iso: string): string {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
  if (!match) return iso;
  const hours = match[1] ? `${match[1]}h` : '';
  const mins = match[2] ? `${match[2]}m` : '';
  return `${hours} ${mins}`.trim();
}

export function formatDateTime(iso: string): { date: string; time: string } {
  const d = new Date(iso);
  return {
    date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    time: d.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }),
  };
}