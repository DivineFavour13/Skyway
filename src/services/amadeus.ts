const BASE_URL = 'https://test.api.amadeus.com';

// City name → IATA city code
const CITY_CODES: Record<string, string> = {
  'lagos': 'LOS', 'abuja': 'ABV', 'port harcourt': 'PHC', 'kano': 'KAN',
  'london': 'LON', 'paris': 'PAR', 'amsterdam': 'AMS', 'frankfurt': 'FRA',
  'rome': 'ROM', 'madrid': 'MAD', 'istanbul': 'IST', 'zurich': 'ZRH',
  'dubai': 'DXB', 'abu dhabi': 'AUH', 'doha': 'DOH', 'riyadh': 'RUH',
  'new york': 'NYC', 'los angeles': 'LAX', 'miami': 'MIA', 'chicago': 'CHI',
  'toronto': 'YTO', 'nairobi': 'NBO', 'accra': 'ACC', 'johannesburg': 'JNB',
  'cape town': 'CPT', 'cairo': 'CAI', 'casablanca': 'CAS', 'dakar': 'DKR',
  'singapore': 'SIN', 'bangkok': 'BKK', 'tokyo': 'TYO', 'mumbai': 'BOM',
  'new delhi': 'DEL', 'seoul': 'SEL', 'hong kong': 'HKG',
};

export function getCityCode(destination: string): string | null {
  return CITY_CODES[destination.toLowerCase().trim()] ?? null;
}

async function getToken(): Promise<string> {
  const res = await fetch(`${BASE_URL}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_CLIENT_ID!,
      client_secret: process.env.AMADEUS_CLIENT_SECRET!,
    }),
  });
  if (!res.ok) throw new Error('Failed to get Amadeus token');
  const data = await res.json();
  return data.access_token as string;
}

export async function searchHotelsByCity(cityCode: string) {
  const token = await getToken();
  const res = await fetch(
    `${BASE_URL}/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}&radius=10&radiusUnit=KM&hotelSource=ALL`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Hotel search failed: ${res.status}`);
  return res.json();
}

export async function getHotelOffers(
  hotelIds: string[],
  checkInDate: string,
  checkOutDate: string,
  adults: number
) {
  const token = await getToken();
  // Amadeus limits to 50 hotel IDs per call
  const ids = hotelIds.slice(0, 50).join(',');
  const params = new URLSearchParams({
    hotelIds: ids,
    checkInDate,
    checkOutDate,
    adults: String(adults),
    currency: 'USD',
    bestRateOnly: 'true',
  });
  const res = await fetch(
    `${BASE_URL}/v3/shopping/hotel-offers?${params.toString()}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) throw new Error(`Hotel offers failed: ${res.status}`);
  return res.json();
}