// Car rental via RapidAPI (booking-com15 endpoint — free 500 req/month)
// Sign up: https://rapidapi.com/DataCrawler/api/booking-com15
// Add to .env.local: RAPIDAPI_KEY=your_key_here

import type { Car } from '@/lib/mockCars';

const RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com';
const RAPIDAPI_BASE = `https://${RAPIDAPI_HOST}`;

// Location → Booking.com search ID mapping for car pickup
const CAR_LOCATION_IDS: Record<string, string> = {
  'lagos':     '-2093601',
  'london':    '-2601889',
  'dubai':     '-782831',
  'new york':  '-74003',
  'paris':     '-1456928',
  'nairobi':   '-938268',
  'accra':     '-2220655',
  'amsterdam': '-2140479',
  'frankfurt': '-1773645',
  'istanbul':  '-760490',
};

export type RentalCar = {
  id: string;
  name: string;
  category: string;
  pricePerDay: number;
  currency: string;
  supplier: string;
  seats: number;
  transmission: string;
  fuelType: string;
  features: string[];
  imageUrl?: string;
  colorFrom: string;
  colorTo: string;
  make: string;
  model: string;
  year: number;
  doors: number;
  availableCities: string[];
};

const GRADIENT_PAIRS = [
  ['#1a4a6e', '#2d7a9a'], ['#922b21', '#cb4335'], ['#1d6a3a', '#27ae60'],
  ['#17202a', '#2c3e50'], ['#4a235a', '#7d3c98'], ['#7d6608', '#b7950b'],
  ['#1c2833', '#2e4057'], ['#2e4a1e', '#4a7a32'], ['#1a3a5c', '#2e6da4'],
];

function normalizeBookingCom(data: unknown[]): RentalCar[] {
  return (data as any[])
    .slice(0, 20)
    .map((item: any, idx: number) => {
      const [colorFrom, colorTo] = GRADIENT_PAIRS[idx % GRADIENT_PAIRS.length]!;
      const name: string = item.vehicle_info?.name ?? item.name ?? 'Vehicle';
      const parts = name.split(' ');
      return {
        id: String(item.vehicle_id ?? idx),
        name,
        make: parts[0] ?? 'Unknown',
        model: parts.slice(1).join(' ') || 'Model',
        year: 2024,
        category: (item.vehicle_info?.category ?? 'economy').toLowerCase(),
        pricePerDay: Math.round(Number(item.pricing_info?.base_price ?? item.price ?? 80)),
        currency: item.pricing_info?.currency ?? 'USD',
        supplier: item.supplier?.name ?? 'Partner Supplier',
        seats: Number(item.vehicle_info?.seats ?? 5),
        doors: Number(item.vehicle_info?.doors ?? 4),
        transmission: item.vehicle_info?.transmission?.toLowerCase() ?? 'automatic',
        fuelType: item.vehicle_info?.fuel_type?.toLowerCase() ?? 'petrol',
        features: [
          item.vehicle_info?.air_conditioning && 'AC',
          'Bluetooth',
          item.vehicle_info?.unlimited_mileage && 'Unlimited mileage',
        ].filter(Boolean) as string[],
        imageUrl: item.vehicle_info?.image_url,
        colorFrom: colorFrom!,
        colorTo: colorTo!,
        availableCities: [],
      };
    })
    .filter((c) => c.pricePerDay > 0);
}

export async function searchCarRentals(
  pickup: string,
  pickupDate: string,
  pickupTime: string,
  returnDate: string,
  returnTime: string
): Promise<{ cars: Car[]; source: 'api' | 'mock' }> {
  const apiKey = process.env.RAPIDAPI_KEY;

  if (apiKey) {
    try {
      const locationId = CAR_LOCATION_IDS[pickup.toLowerCase().trim()];

      if (locationId) {
        const searchParams = new URLSearchParams({
          pick_up_latitude: '',
          pick_up_longitude: '',
          drop_off_latitude: '',
          drop_off_longitude: '',
          from_date: pickupDate,
          from_time: pickupTime,
          to_date: returnDate,
          to_time: returnTime,
          currency_code: 'USD',
        });

        const res = await fetch(
          `${RAPIDAPI_BASE}/api/v1/cars/searchCarRentals?pick_up_id=${locationId}&${searchParams.toString()}`,
          {
            headers: {
              'x-rapidapi-key': apiKey,
              'x-rapidapi-host': RAPIDAPI_HOST,
            },
          }
        );

        if (res.ok) {
          const json = await res.json();
          const raw = json?.data?.search_results ?? json?.data ?? [];
          if (Array.isArray(raw) && raw.length > 0) {
            const normalized = normalizeBookingCom(raw);
            if (normalized.length > 0) {
              // Return as Car[] compatible shape (mock Car type is compatible)
              return { cars: normalized as unknown as Car[], source: 'api' };
            }
          }
        }
      }
    } catch {
      // Fall through to mock
    }
  }

  // Fallback — rich mock data
  const { searchCars } = await import('@/lib/mockCars');
  return { cars: searchCars(pickup, 'any'), source: 'mock' };
}