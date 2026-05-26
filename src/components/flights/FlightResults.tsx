import { createOfferRequest } from '@/services/duffel';
import { FlightCard } from './FlightCard';

type Props = {
  origin: string;
  destination: string;
  date: string;
  adults: number;
  locale: string;
};

export async function FlightResults({ origin, destination, date, adults, locale }: Props) {
  let offers;

  try {
    offers = await createOfferRequest(origin, destination, date, adults);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-[var(--color-text-secondary)]">
          Could not load flights: {message}
        </p>
      </div>
    );
  }

  if (!offers || offers.length === 0) {
    return (
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="text-2xl mb-2">✈️</p>
        <p className="text-[var(--color-text-secondary)]">
          No flights found for this route.
        </p>
      </div>
    );
  }

  // Sort by price ascending
  const sorted = [...offers].sort(
    (a, b) => Number(a.total_amount) - Number(b.total_amount)
  );

  return (
    <div className="space-y-3">
      <p className="text-sm text-[var(--color-text-muted)] mb-6">
        {sorted.length} flight{sorted.length !== 1 ? 's' : ''} found
      </p>
      {sorted.map((offer) => (
        <FlightCard key={offer.id} offer={offer} locale={locale} />
      ))}
    </div>
  );
}