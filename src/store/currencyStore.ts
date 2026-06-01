import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Currency = {
  code: string;
  symbol: string;
  label: string;
};

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$',  label: 'US Dollar' },
  { code: 'GBP', symbol: '£',  label: 'British Pound' },
  { code: 'EUR', symbol: '€',  label: 'Euro' },
  { code: 'NGN', symbol: '₦',  label: 'Nigerian Naira' },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham' },
  { code: 'CAD', symbol: 'CA$', label: 'Canadian Dollar' },
  { code: 'GHS', symbol: 'GH₵', label: 'Ghanaian Cedi' },
];

type CurrencyStore = {
  selected: Currency;
  setSelected: (c: Currency) => void;
};

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      selected: CURRENCIES[0]!,
      setSelected: (c) => set({ selected: c }),
    }),
    { name: 'skyway-currency' }
  )
);