import type { Airport } from './airports';

export type RecentSearch = {
  origin: Airport;
  destination: Airport;
  date: string;
  adults: number;
  tripType: 'oneway' | 'roundtrip';
  returnDate?: string;
  searchedAt: string;
};

const KEY = 'skyway-recent-searches';
const MAX = 3;

export function saveRecentSearch(search: Omit<RecentSearch, 'searchedAt'>) {
  const existing = getRecentSearches();

  // Remove duplicate if same route already exists
  const filtered = existing.filter(
    (s) =>
      !(
        s.origin.iata_code === search.origin.iata_code &&
        s.destination.iata_code === search.destination.iata_code
      )
  );

  const updated = [
    { ...search, searchedAt: new Date().toISOString() },
    ...filtered,
  ].slice(0, MAX);

  localStorage.setItem(KEY, JSON.stringify(updated));
}

export function getRecentSearches(): RecentSearch[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? '[]');
  } catch {
    return [];
  }
}