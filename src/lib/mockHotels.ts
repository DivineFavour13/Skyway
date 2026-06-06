export type RoomType = {
  id: string;
  name: string;
  pricePerNight: number;
  maxGuests: number;
  beds: string;
  amenities: string[];
};

export type Hotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  stars: number;
  reviewScore: number;
  reviewCount: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  roomTypes: RoomType[];
  description: string;
  colorFrom: string;
  colorTo: string;
};

export const MOCK_HOTELS: Hotel[] = [
  // ── Lagos ──────────────────────────────────────────────
  {
    id: 'eko-hotel-lagos',
    name: 'Eko Hotel & Suites',
    city: 'Lagos',
    country: 'Nigeria',
    address: 'Plot 1415, Adetokunbo Ademola Street, Victoria Island',
    stars: 5,
    reviewScore: 8.7,
    reviewCount: 2341,
    pricePerNight: 280,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Parking'],
    roomTypes: [
      { id: 'std', name: 'Standard Room', pricePerNight: 280, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Deluxe Room', pricePerNight: 380, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar', 'Lagoon view'] },
      { id: 'ste', name: 'Executive Suite', pricePerNight: 580, maxGuests: 4, beds: '1 King + Sofa', amenities: ['WiFi', 'AC', 'TV', 'Minibar', 'Lounge', 'Jacuzzi'] },
    ],
    description: 'Lagos\'s premier luxury hotel on Victoria Island with stunning lagoon views and world-class amenities.',
    colorFrom: '#1a4a6e',
    colorTo: '#2d7a9a',
  },
  {
    id: 'radisson-blu-lagos',
    name: 'Radisson Blu Anchorage Hotel',
    city: 'Lagos',
    country: 'Nigeria',
    address: '1a Ozumba Mbadiwe Avenue, Victoria Island',
    stars: 5,
    reviewScore: 8.4,
    reviewCount: 1876,
    pricePerNight: 220,
    currency: 'USD',
    amenities: ['Pool', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Business Centre'],
    roomTypes: [
      { id: 'std', name: 'Superior Room', pricePerNight: 220, maxGuests: 2, beds: '1 Queen bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'dlx', name: 'Deluxe Room', pricePerNight: 300, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Sea view'] },
      { id: 'ste', name: 'Junior Suite', pricePerNight: 450, maxGuests: 3, beds: '1 King + Daybed', amenities: ['WiFi', 'AC', 'TV', 'Lounge area'] },
    ],
    description: 'Overlooking the Atlantic Ocean, the Radisson Blu offers contemporary elegance in the heart of Victoria Island.',
    colorFrom: '#c0392b',
    colorTo: '#e74c3c',
  },
  {
    id: 'intercontinental-lagos',
    name: 'InterContinental Lagos',
    city: 'Lagos',
    country: 'Nigeria',
    address: '52A Kofo Abayomi Street, Victoria Island',
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 3102,
    pricePerNight: 350,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge', 'Valet'],
    roomTypes: [
      { id: 'std', name: 'Classic Room', pricePerNight: 350, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Club Room', pricePerNight: 480, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Club lounge access'] },
      { id: 'ste', name: 'Presidential Suite', pricePerNight: 1200, maxGuests: 6, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private dining'] },
    ],
    description: 'The most iconic address in Lagos — a 358-room luxury hotel with panoramic views of the Lagos Bar Beach.',
    colorFrom: '#1a3a5c',
    colorTo: '#2e5f8a',
  },

  // ── London ─────────────────────────────────────────────
  {
    id: 'the-savoy-london',
    name: 'The Savoy',
    city: 'London',
    country: 'United Kingdom',
    address: 'Strand, London WC2R 0EZ',
    stars: 5,
    reviewScore: 9.4,
    reviewCount: 5621,
    pricePerNight: 650,
    currency: 'USD',
    amenities: ['Spa', 'Pool', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge', 'River views'],
    roomTypes: [
      { id: 'std', name: 'Deluxe Room', pricePerNight: 650, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Superior Room', pricePerNight: 850, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'River view'] },
      { id: 'ste', name: 'Thames Suite', pricePerNight: 2200, maxGuests: 4, beds: '1 King + Sofa', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Panoramic views'] },
    ],
    description: 'London\'s most legendary hotel since 1889, where history, art and exceptional service converge on the Thames.',
    colorFrom: '#2c3e50',
    colorTo: '#4a6fa5',
  },
  {
    id: 'claridges-london',
    name: 'Claridge\'s',
    city: 'London',
    country: 'United Kingdom',
    address: 'Brook Street, Mayfair, London W1K 4HR',
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 4231,
    pricePerNight: 700,
    currency: 'USD',
    amenities: ['Spa', 'Restaurant', 'WiFi', 'Bar', 'Concierge', 'Ballroom'],
    roomTypes: [
      { id: 'std', name: 'Classic Room', pricePerNight: 700, maxGuests: 2, beds: '1 Queen bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'dlx', name: 'Art Deco Room', pricePerNight: 950, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'ste', name: 'Mayfair Suite', pricePerNight: 2800, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Dining room'] },
    ],
    description: 'Mayfair\'s iconic Art Deco masterpiece — a favourite of royalty, heads of state and discerning travellers since 1812.',
    colorFrom: '#7d6608',
    colorTo: '#b7950b',
  },
  {
    id: 'premier-inn-london',
    name: 'Premier Inn London City',
    city: 'London',
    country: 'United Kingdom',
    address: '10 Upper Thames Street, London EC4V 3AG',
    stars: 3,
    reviewScore: 8.1,
    reviewCount: 9871,
    pricePerNight: 140,
    currency: 'USD',
    amenities: ['Restaurant', 'WiFi', 'Bar', 'Parking'],
    roomTypes: [
      { id: 'std', name: 'Standard Room', pricePerNight: 140, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'fam', name: 'Family Room', pricePerNight: 180, maxGuests: 4, beds: '1 King + 2 Singles', amenities: ['WiFi', 'AC', 'TV'] },
    ],
    description: 'Great value in the City of London with Thames views, just steps from Blackfriars Bridge.',
    colorFrom: '#5b2c6f',
    colorTo: '#8e44ad',
  },

  // ── Dubai ──────────────────────────────────────────────
  {
    id: 'burj-al-arab-dubai',
    name: 'Burj Al Arab Jumeirah',
    city: 'Dubai',
    country: 'UAE',
    address: 'Jumeirah Beach Road, Dubai',
    stars: 5,
    reviewScore: 9.6,
    reviewCount: 7823,
    pricePerNight: 2500,
    currency: 'USD',
    amenities: ['Private Beach', 'Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Butler', 'Helipad'],
    roomTypes: [
      { id: 'dlx', name: 'Deluxe Suite', pricePerNight: 2500, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Sea view'] },
      { id: 'ulx', name: 'Ultra Deluxe Suite', pricePerNight: 3800, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Panoramic sea view'] },
      { id: 'pen', name: 'Royal Suite', pricePerNight: 18000, maxGuests: 8, beds: '4 King beds', amenities: ['WiFi', 'AC', 'TV', 'Personal butler', 'Private cinema', 'Pool'] },
    ],
    description: 'The world\'s most luxurious hotel — a sail-shaped icon rising 321m above the Arabian Gulf.',
    colorFrom: '#c5a028',
    colorTo: '#f0c040',
  },
  {
    id: 'atlantis-palm-dubai',
    name: 'Atlantis The Palm',
    city: 'Dubai',
    country: 'UAE',
    address: 'Palm Jumeirah, Dubai',
    stars: 5,
    reviewScore: 9.0,
    reviewCount: 12450,
    pricePerNight: 550,
    currency: 'USD',
    amenities: ['Waterpark', 'Private Beach', 'Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Aquarium'],
    roomTypes: [
      { id: 'std', name: 'Coral Room', pricePerNight: 550, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Garden view'] },
      { id: 'dlx', name: 'Palm Room', pricePerNight: 750, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Palm view'] },
      { id: 'ste', name: 'Regal Suite', pricePerNight: 1800, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Lounge', 'Ocean view'] },
    ],
    description: 'An iconic resort destination on the Palm Jumeirah with Aquaventure Waterpark and direct beach access.',
    colorFrom: '#1a6b8a',
    colorTo: '#2596be',
  },
  {
    id: 'address-downtown-dubai',
    name: 'Address Downtown Dubai',
    city: 'Dubai',
    country: 'UAE',
    address: 'Sheikh Mohammed Bin Rashid Blvd, Downtown Dubai',
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 6102,
    pricePerNight: 480,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Burj Khalifa views'],
    roomTypes: [
      { id: 'std', name: 'Deluxe Room', pricePerNight: 480, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'City view'] },
      { id: 'dlx', name: 'Sky Room', pricePerNight: 650, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Burj Khalifa view'] },
      { id: 'ste', name: 'Presidential Suite', pricePerNight: 2400, maxGuests: 6, beds: '3 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private terrace'] },
    ],
    description: 'Steps from the Burj Khalifa and Dubai Mall — a sleek luxury address in the heart of Downtown Dubai.',
    colorFrom: '#1c2833',
    colorTo: '#2e4057',
  },

  // ── New York ───────────────────────────────────────────
  {
    id: 'the-plaza-nyc',
    name: 'The Plaza Hotel',
    city: 'New York',
    country: 'USA',
    address: '768 Fifth Avenue, New York, NY 10019',
    stars: 5,
    reviewScore: 9.1,
    reviewCount: 8921,
    pricePerNight: 895,
    currency: 'USD',
    amenities: ['Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge', 'Valet', 'Central Park views'],
    roomTypes: [
      { id: 'std', name: 'Deluxe Room', pricePerNight: 895, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Central Park View', pricePerNight: 1200, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar', 'Park view'] },
      { id: 'ste', name: 'Grand Suite', pricePerNight: 3500, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Dining room'] },
    ],
    description: 'Since 1907, The Plaza has set the gold standard for luxury hospitality at the corner of Fifth Avenue and Central Park South.',
    colorFrom: '#2e4a1e',
    colorTo: '#4a7a32',
  },
  {
    id: 'four-seasons-nyc',
    name: 'Four Seasons New York',
    city: 'New York',
    country: 'USA',
    address: '57 East 57th Street, New York, NY 10022',
    stars: 5,
    reviewScore: 9.3,
    reviewCount: 5432,
    pricePerNight: 950,
    currency: 'USD',
    amenities: ['Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge'],
    roomTypes: [
      { id: 'std', name: 'Superior Room', pricePerNight: 950, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Deluxe Room', pricePerNight: 1150, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar', 'City view'] },
      { id: 'ste', name: 'Ty Warner Penthouse', pricePerNight: 50000, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Rooftop terrace', '360° views'] },
    ],
    description: 'I.M. Pei\'s architectural masterpiece offers 52 floors of understated luxury in Midtown Manhattan.',
    colorFrom: '#1a2a4a',
    colorTo: '#2e4a7a',
  },
  {
    id: 'pod-hotel-nyc',
    name: 'Pod 51 Hotel',
    city: 'New York',
    country: 'USA',
    address: '230 East 51st Street, New York, NY 10022',
    stars: 3,
    reviewScore: 8.2,
    reviewCount: 14230,
    pricePerNight: 180,
    currency: 'USD',
    amenities: ['Rooftop Bar', 'WiFi', 'Restaurant', 'Gym'],
    roomTypes: [
      { id: 'pod', name: 'Pod Room', pricePerNight: 180, maxGuests: 1, beds: '1 Twin bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'std', name: 'Standard Room', pricePerNight: 240, maxGuests: 2, beds: '1 Queen bed', amenities: ['WiFi', 'AC', 'TV'] },
    ],
    description: 'Smart, stylish rooms in the heart of Midtown — the best value for your Manhattan adventure.',
    colorFrom: '#7d3c98',
    colorTo: '#a569bd',
  },

  // ── Paris ──────────────────────────────────────────────
  {
    id: 'ritz-paris',
    name: 'Ritz Paris',
    city: 'Paris',
    country: 'France',
    address: '15 Place Vendôme, 75001 Paris',
    stars: 5,
    reviewScore: 9.7,
    reviewCount: 3241,
    pricePerNight: 1800,
    currency: 'USD',
    amenities: ['Spa', 'Pool', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge', 'Garden'],
    roomTypes: [
      { id: 'dlx', name: 'Deluxe Room', pricePerNight: 1800, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'ste', name: 'Junior Suite', pricePerNight: 3200, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Lounge', 'Place Vendôme view'] },
      { id: 'imp', name: 'Imperial Suite', pricePerNight: 22000, maxGuests: 8, beds: '4 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private dining', 'Grand salon'] },
    ],
    description: 'The epitome of Parisian grandeur — César Ritz\'s legendary palace on Place Vendôme since 1898.',
    colorFrom: '#7d6608',
    colorTo: '#d4ac0d',
  },
  {
    id: 'hotel-de-crillon-paris',
    name: 'Hôtel de Crillon',
    city: 'Paris',
    country: 'France',
    address: '10 Place de la Concorde, 75008 Paris',
    stars: 5,
    reviewScore: 9.5,
    reviewCount: 2876,
    pricePerNight: 1400,
    currency: 'USD',
    amenities: ['Spa', 'Pool', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge'],
    roomTypes: [
      { id: 'std', name: 'Classic Room', pricePerNight: 1400, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Concorde Room', pricePerNight: 2100, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Place de la Concorde view'] },
      { id: 'ste', name: 'Les Ambassadeurs Suite', pricePerNight: 8500, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private terrace'] },
    ],
    description: 'An 18th-century palace reimagined — one of the world\'s finest hotels overlooking Place de la Concorde.',
    colorFrom: '#2c1810',
    colorTo: '#5d3522',
  },
  {
    id: 'ibis-paris-centre',
    name: 'Ibis Paris Gare de Lyon',
    city: 'Paris',
    country: 'France',
    address: '21 Rue de Bercy, 75012 Paris',
    stars: 2,
    reviewScore: 7.8,
    reviewCount: 18942,
    pricePerNight: 120,
    currency: 'USD',
    amenities: ['Restaurant', 'WiFi', 'Bar'],
    roomTypes: [
      { id: 'std', name: 'Standard Room', pricePerNight: 120, maxGuests: 2, beds: '1 Double bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'fam', name: 'Family Room', pricePerNight: 160, maxGuests: 4, beds: '1 Double + 1 Bunk', amenities: ['WiFi', 'AC', 'TV'] },
    ],
    description: 'Comfortable, affordable rooms steps from Gare de Lyon station — the smart choice for Paris on a budget.',
    colorFrom: '#1f618d',
    colorTo: '#2e86c1',
  },

  // ── Nairobi ────────────────────────────────────────────
  {
    id: 'fairmont-norfolk-nairobi',
    name: 'Fairmont The Norfolk',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Harry Thuku Road, Nairobi',
    stars: 5,
    reviewScore: 9.0,
    reviewCount: 3421,
    pricePerNight: 320,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Garden', 'Concierge'],
    roomTypes: [
      { id: 'std', name: 'Fairmont Room', pricePerNight: 320, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Garden view'] },
      { id: 'dlx', name: 'Deluxe Room', pricePerNight: 450, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Pool view'] },
      { id: 'ste', name: 'Lord Delamere Suite', pricePerNight: 1200, maxGuests: 4, beds: '2 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private garden'] },
    ],
    description: 'Nairobi\'s grande dame since 1904 — a colonial landmark in the heart of the city with legendary hospitality.',
    colorFrom: '#1e5631',
    colorTo: '#2d8a4e',
  },
  {
    id: 'villa-rosa-kempinski-nairobi',
    name: 'Villa Rosa Kempinski',
    city: 'Nairobi',
    country: 'Kenya',
    address: 'Chiromo Road, Westlands, Nairobi',
    stars: 5,
    reviewScore: 9.2,
    reviewCount: 4102,
    pricePerNight: 280,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Concierge'],
    roomTypes: [
      { id: 'std', name: 'Deluxe Room', pricePerNight: 280, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Minibar'] },
      { id: 'dlx', name: 'Grand Deluxe', pricePerNight: 380, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'City view'] },
      { id: 'ste', name: 'Presidential Suite', pricePerNight: 1800, maxGuests: 6, beds: '3 King beds', amenities: ['WiFi', 'AC', 'TV', 'Butler', 'Private pool'] },
    ],
    description: 'Nairobi\'s most glamorous address in Westlands — Italian-inspired luxury with African warmth.',
    colorFrom: '#6e2c0e',
    colorTo: '#b7530a',
  },

  // ── Accra ──────────────────────────────────────────────
  {
    id: 'kempinski-gold-coast-accra',
    name: 'Kempinski Hotel Gold Coast City',
    city: 'Accra',
    country: 'Ghana',
    address: 'Gamel Abdul Nasser Avenue, Accra',
    stars: 5,
    reviewScore: 8.9,
    reviewCount: 2134,
    pricePerNight: 240,
    currency: 'USD',
    amenities: ['Pool', 'Spa', 'Gym', 'Restaurant', 'WiFi', 'Bar', 'Business Centre'],
    roomTypes: [
      { id: 'std', name: 'Deluxe Room', pricePerNight: 240, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'dlx', name: 'Superior Deluxe', pricePerNight: 320, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'City view'] },
      { id: 'ste', name: 'Junior Suite', pricePerNight: 550, maxGuests: 3, beds: '1 King + Sofa', amenities: ['WiFi', 'AC', 'TV', 'Lounge'] },
    ],
    description: 'Ghana\'s most prestigious hotel in the heart of Accra — where African heritage meets modern luxury.',
    colorFrom: '#1a4a1a',
    colorTo: '#2d7a2d',
  },
  {
    id: 'labadi-beach-hotel-accra',
    name: 'Labadi Beach Hotel',
    city: 'Accra',
    country: 'Ghana',
    address: 'La Beach Road, Accra',
    stars: 4,
    reviewScore: 8.3,
    reviewCount: 3456,
    pricePerNight: 160,
    currency: 'USD',
    amenities: ['Private Beach', 'Pool', 'Restaurant', 'WiFi', 'Bar', 'Tennis Court'],
    roomTypes: [
      { id: 'std', name: 'Standard Room', pricePerNight: 160, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV'] },
      { id: 'dlx', name: 'Beach Room', pricePerNight: 220, maxGuests: 2, beds: '1 King bed', amenities: ['WiFi', 'AC', 'TV', 'Beach view'] },
      { id: 'ste', name: 'Ocean Suite', pricePerNight: 420, maxGuests: 4, beds: '1 King + Sofa', amenities: ['WiFi', 'AC', 'TV', 'Ocean view', 'Terrace'] },
    ],
    description: 'Accra\'s classic beachfront retreat with direct access to La Pleasure Beach and Atlantic Ocean views.',
    colorFrom: '#1a4a6e',
    colorTo: '#2980b9',
  },
];

export function searchHotels(destination: string): Hotel[] {
  if (!destination) return MOCK_HOTELS;
  const q = destination.toLowerCase();
  return MOCK_HOTELS.filter(
    (h) =>
      h.city.toLowerCase().includes(q) ||
      h.country.toLowerCase().includes(q) ||
      h.name.toLowerCase().includes(q)
  );
}

export function getHotelById(id: string): Hotel | undefined {
  return MOCK_HOTELS.find((h) => h.id === id);
}

export function calculateNights(checkin: string, checkout: string): number {
  const a = new Date(checkin);
  const b = new Date(checkout);
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}