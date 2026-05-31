import { createOfferRequest } from '@/services/duffel';
import { FlightResultsClient } from './FlightResultsClient';

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

  return <FlightResultsClient offers={offers} locale={locale} />;
}