import { Suspense } from 'react';
import { Link } from '@/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { HotelResultsClient } from '@/components/hotels/HotelResultsClient';
import { HotelCardSkeleton } from '@/components/hotels/HotelCardSkeleton';
import type { NormalizedHotel } from '@/types/hotel';
import type { Hotel } from '@/lib/mockHotels';

const GRADIENT_PAIRS = [
  ['#1a4a6e', '#2d7a9a'], ['#922b21', '#cb4335'], ['#1d6a3a', '#27ae60'],
  ['#17202a', '#2c3e50'], ['#4a235a', '#7d3c98'], ['#7d6608', '#b7950b'],
  ['#1c2833', '#2e4057'], ['#2e4a1e', '#4a7a32'], ['#1a3a5c', '#2e6da4'],
  ['#6e2c0e', '#b7530a'], ['#1e5631', '#2d8a4e'], ['#7d1d1d', '#c0392b'],
];

function normalizeMockHotel(hotel: Hotel): NormalizedHotel {
  return {
    id: hotel.id,
    name: hotel.name,
    city: hotel.city,
    country: hotel.country,
    address: hotel.address,
    stars: hotel.stars,
    pricePerNight: hotel.pricePerNight,
    currency: hotel.currency,
    amenities: hotel.amenities,
    colorFrom: hotel.colorFrom,
    colorTo: hotel.colorTo,
    reviewScore: hotel.reviewScore,
    reviewCount: hotel.reviewCount,
    description: hotel.description,
  };
}

function normalizeAmadeusHotels(data: unknown[], destination: string): NormalizedHotel[] {
  return (data as any[])
    .filter((item) => item.available && item.offers?.length > 0)
    .map((item, idx) => {
      const offer = item.offers[0];
      const [colorFrom, colorTo] = GRADIENT_PAIRS[idx % GRADIENT_PAIRS.length]!;
      return {
        id: item.hotel.hotelId,
        name: item.hotel.name,
        city: item.hotel.address?.cityName ?? destination,
        country: item.hotel.address?.countryCode ?? '',
        address: item.hotel.address?.lines?.[0] ?? '',
        stars: item.hotel.rating ? Math.min(5, Math.round(Number(item.hotel.rating))) : 3,
        pricePerNight: Math.round(Number(offer.price.total)),
        currency: offer.price.currency ?? 'USD',
        amenities: (item.hotel.amenities ?? [])
          .slice(0, 6)
          .map((a: string) =>
            a.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (c: string) => c.toUpperCase())
          ),
        colorFrom: colorFrom!,
        colorTo: colorTo!,
        offerId: offer.id,
      } satisfies NormalizedHotel;
    })
    .filter((h) => h.pricePerNight > 0);
}

async function fetchHotels(
  destination: string,
  checkin: string,
  checkout: string,
  adults: number
): Promise<{ hotels: NormalizedHotel[]; source: 'amadeus' | 'mock' }> {
  const hasCredentials =
    !!process.env.AMADEUS_CLIENT_ID && !!process.env.AMADEUS_CLIENT_SECRET;

  if (hasCredentials) {
    try {
      const { searchHotelsByCity, getHotelOffers, getCityCode } = await import('@/services/amadeus');
      const cityCode = getCityCode(destination);

      if (cityCode) {
        const listRes = await searchHotelsByCity(cityCode);
        const hotelIds: string[] = (listRes.data ?? []).map((h: { hotelId: string }) => h.hotelId);

        if (hotelIds.length > 0) {
          const offersRes = await getHotelOffers(hotelIds, checkin, checkout, adults);
          const hotels = normalizeAmadeusHotels(offersRes.data ?? [], destination);
          if (hotels.length > 0) return { hotels, source: 'amadeus' };
        }
      }
    } catch {
      // Fall through to mock
    }
  }

  // Fallback — mock data
  const { searchHotels } = await import('@/lib/mockHotels');
  return {
    hotels: searchHotels(destination).map(normalizeMockHotel),
    source: 'mock',
  };
}

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    destination?: string;
    checkin?: string;
    checkout?: string;
    guests?: string;
  }>;
};

async function HotelData({
  destination, checkin, checkout, guests, locale,
}: {
  destination: string; checkin: string; checkout: string; guests: string; locale: string;
}) {
  const nights = Math.max(1, Math.round(
    (new Date(checkout).getTime() - new Date(checkin).getTime()) / (1000 * 60 * 60 * 24)
  ));

  const { hotels } = await fetchHotels(destination, checkin, checkout, Number(guests));

  return (
    <HotelResultsClient
      hotels={hotels}
      locale={locale}
      checkin={checkin}
      checkout={checkout}
      guests={Number(guests)}
      nights={nights}
      destination={destination}
    />
  );
}

export default async function HotelsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { destination, checkin, checkout, guests } = await searchParams;

  if (!destination || !checkin || !checkout) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-[var(--color-text-secondary)]">Missing search parameters.</p>
          <Link href="/" className="text-[var(--color-accent)] text-sm hover:underline">
            ← Back to search
          </Link>
        </div>
      </div>
    );
  }

  const center = (
    <span>
      <span className="font-semibold text-[var(--color-text-primary)]">{destination}</span>
      {' · '}{checkin} → {checkout}
      {' · '}{guests ?? '2'} guests
    </span>
  );

  return (
    <div className="min-h-screen">
      <Navbar center={center} />
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-10">
        <Suspense
          fallback={
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))}
            </div>
          }
        >
          <HotelData
            destination={destination}
            checkin={checkin}
            checkout={checkout}
            guests={guests ?? '2'}
            locale={locale}
          />
        </Suspense>
      </main>
    </div>
  );
}