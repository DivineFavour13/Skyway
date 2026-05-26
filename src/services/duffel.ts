const DUFFEL_BASE_URL = 'https://api.duffel.com';
const DUFFEL_VERSION = 'v2';

async function duffelFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const apiKey = process.env.DUFFEL_API_KEY;
  if (!apiKey) throw new Error('DUFFEL_API_KEY is not set');

  const res = await fetch(`${DUFFEL_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Duffel-Version': DUFFEL_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(
      (error as { errors?: { message: string }[] })?.errors?.[0]?.message ??
        `Duffel API error: ${res.status}`
    );
  }

  return res.json() as Promise<T>;
}

export async function searchAirports(query: string) {
  const data = await duffelFetch<{ data: import('@/types/duffel').DuffelAirport[] }>(
    `/air/airports?query=${encodeURIComponent(query)}&limit=7`
  );
  return data.data;
}

export async function createOfferRequest(
  origin: string,
  destination: string,
  date: string,
  adults: number
) {
  const data = await duffelFetch<{ data: { id: string; offers: import('@/types/duffel').DuffelOffer[] } }>(
    '/air/offer_requests?return_offers=true',
    {
      method: 'POST',
      body: JSON.stringify({
        data: {
          slices: [{ origin, destination, departure_date: date }],
          passengers: Array.from({ length: adults }, () => ({ type: 'adult' })),
          cabin_class: 'economy',
        },
      }),
    }
  );
  return data.data.offers;
}

export async function getOffer(offerId: string) {
  const data = await duffelFetch<{ data: import('@/types/duffel').DuffelOffer }>(
    `/air/offers/${offerId}`
  );
  return data.data;
}

export async function getSeatMaps(offerId: string) {
  const data = await duffelFetch<{ data: import('@/types/duffel').SeatMap[] }>(
    `/air/seat_maps?offer_id=${offerId}`
  );
  return data.data;
}