'use client';

import { useCurrencyStore } from '@/store/currencyStore';
import { convertPrice, formatConverted } from '@/lib/currency';

export function useFormattedPrice(amount: string, fromCurrency: string): string {
  const { selected } = useCurrencyStore();
  const converted = convertPrice(amount, fromCurrency, selected.code);
  return formatConverted(converted, selected.symbol);
}