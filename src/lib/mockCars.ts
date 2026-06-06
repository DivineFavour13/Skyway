export type Car = {
  id: string;
  make: string;
  model: string;
  year: number;
  category: 'economy' | 'compact' | 'suv' | 'luxury' | 'van';
  pricePerDay: number;
  currency: string;
  seats: number;
  doors: number;
  transmission: 'automatic' | 'manual';
  fuelType: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  provider: string;
  features: string[];
  colorFrom: string;
  colorTo: string;
  availableCities: string[];
};

export const MOCK_CARS: Car[] = [
  // Economy
  {
    id: 'toyota-corolla-hertz',
    make: 'Toyota', model: 'Corolla', year: 2024,
    category: 'economy', pricePerDay: 45, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Hertz',
    features: ['AC', 'Bluetooth', 'USB', 'Backup Camera'],
    colorFrom: '#1a4a6e', colorTo: '#2d7a9a',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai', 'Nairobi', 'Accra'],
  },
  {
    id: 'honda-civic-avis',
    make: 'Honda', model: 'Civic', year: 2024,
    category: 'economy', pricePerDay: 42, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Avis',
    features: ['AC', 'Bluetooth', 'Apple CarPlay'],
    colorFrom: '#922b21', colorTo: '#cb4335',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai', 'Nairobi', 'Accra'],
  },
  {
    id: 'vw-polo-budget',
    make: 'Volkswagen', model: 'Polo', year: 2023,
    category: 'economy', pricePerDay: 38, currency: 'USD',
    seats: 5, doors: 4, transmission: 'manual', fuelType: 'petrol',
    provider: 'Budget',
    features: ['AC', 'Bluetooth', 'USB'],
    colorFrom: '#1d6a3a', colorTo: '#27ae60',
    availableCities: ['London', 'Paris', 'Dubai', 'Nairobi'],
  },
  // Compact
  {
    id: 'bmw-series3-enterprise',
    make: 'BMW', model: '3 Series', year: 2024,
    category: 'compact', pricePerDay: 95, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Enterprise',
    features: ['AC', 'Bluetooth', 'Navigation', 'Sunroof', 'Heated Seats'],
    colorFrom: '#17202a', colorTo: '#2c3e50',
    availableCities: ['London', 'New York', 'Paris', 'Dubai'],
  },
  {
    id: 'mercedes-cclass-hertz',
    make: 'Mercedes-Benz', model: 'C-Class', year: 2024,
    category: 'compact', pricePerDay: 110, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Hertz',
    features: ['AC', 'Bluetooth', 'Navigation', 'Leather Seats', 'Sunroof'],
    colorFrom: '#4a235a', colorTo: '#7d3c98',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai'],
  },
  // SUV
  {
    id: 'toyota-rav4-national',
    make: 'Toyota', model: 'RAV4', year: 2024,
    category: 'suv', pricePerDay: 85, currency: 'USD',
    seats: 5, doors: 5, transmission: 'automatic', fuelType: 'hybrid',
    provider: 'National',
    features: ['AC', 'Bluetooth', 'Navigation', 'AWD', 'Roof Rails', 'Backup Camera'],
    colorFrom: '#7d6608', colorTo: '#b7950b',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai', 'Nairobi', 'Accra'],
  },
  {
    id: 'ford-explorer-avis',
    make: 'Ford', model: 'Explorer', year: 2024,
    category: 'suv', pricePerDay: 95, currency: 'USD',
    seats: 7, doors: 5, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Avis',
    features: ['AC', 'Bluetooth', 'Navigation', '4WD', '3rd Row Seating'],
    colorFrom: '#1a5276', colorTo: '#2980b9',
    availableCities: ['Lagos', 'New York', 'Dubai', 'Nairobi'],
  },
  {
    id: 'land-rover-defender-hertz',
    make: 'Land Rover', model: 'Defender', year: 2024,
    category: 'suv', pricePerDay: 180, currency: 'USD',
    seats: 5, doors: 5, transmission: 'automatic', fuelType: 'diesel',
    provider: 'Hertz',
    features: ['AC', 'Bluetooth', 'Navigation', '4WD', 'Terrain Response', 'Sunroof'],
    colorFrom: '#1e5631', colorTo: '#27ae60',
    availableCities: ['London', 'Dubai', 'Nairobi'],
  },
  // Luxury
  {
    id: 'mercedes-sclass-hertz',
    make: 'Mercedes-Benz', model: 'S-Class', year: 2024,
    category: 'luxury', pricePerDay: 280, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'hybrid',
    provider: 'Hertz',
    features: ['AC', 'Massage Seats', 'Navigation', 'Ambient Lighting', 'Sunroof', 'Burmester Sound'],
    colorFrom: '#1c2833', colorTo: '#2e4057',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai'],
  },
  {
    id: 'bmw-7series-avis',
    make: 'BMW', model: '7 Series', year: 2024,
    category: 'luxury', pricePerDay: 260, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'electric',
    provider: 'Avis',
    features: ['AC', 'Navigation', 'Panoramic Roof', 'Gesture Control', 'Harman Kardon Sound'],
    colorFrom: '#17202a', colorTo: '#1a252f',
    availableCities: ['London', 'New York', 'Paris', 'Dubai'],
  },
  {
    id: 'rolls-royce-ghost-enterprise',
    make: 'Rolls-Royce', model: 'Ghost', year: 2024,
    category: 'luxury', pricePerDay: 1200, currency: 'USD',
    seats: 5, doors: 4, transmission: 'automatic', fuelType: 'petrol',
    provider: 'Enterprise',
    features: ['AC', 'Starlight Headliner', 'Bespoke Audio', 'Champagne Cooler', 'Partition'],
    colorFrom: '#7d6608', colorTo: '#d4ac0d',
    availableCities: ['London', 'Dubai', 'New York'],
  },
  // Van
  {
    id: 'mercedes-vclass-national',
    make: 'Mercedes-Benz', model: 'V-Class', year: 2024,
    category: 'van', pricePerDay: 120, currency: 'USD',
    seats: 8, doors: 5, transmission: 'automatic', fuelType: 'diesel',
    provider: 'National',
    features: ['AC', 'Bluetooth', 'Navigation', 'Sliding Doors', 'Fold-flat Seats'],
    colorFrom: '#4a1942', colorTo: '#7b2d8b',
    availableCities: ['Lagos', 'London', 'New York', 'Paris', 'Dubai', 'Nairobi', 'Accra'],
  },
  {
    id: 'ford-transit-budget',
    make: 'Ford', model: 'Transit', year: 2024,
    category: 'van', pricePerDay: 95, currency: 'USD',
    seats: 9, doors: 5, transmission: 'manual', fuelType: 'diesel',
    provider: 'Budget',
    features: ['AC', 'Bluetooth', 'Rear Sensors'],
    colorFrom: '#1a3a5c', colorTo: '#2e6da4',
    availableCities: ['Lagos', 'London', 'Nairobi', 'Accra'],
  },
];

export function searchCars(city: string, category: string): Car[] {
  const q = city.toLowerCase();
  return MOCK_CARS.filter((c) => {
    const cityMatch = c.availableCities.some((city) =>
      city.toLowerCase().includes(q)
    );
    const catMatch = category === 'any' || c.category === category;
    return cityMatch && catMatch;
  });
}

export function getCarById(id: string): Car | undefined {
  return MOCK_CARS.find((c) => c.id === id);
}

export function calculateRentalDays(pickupDate: string, returnDate: string): number {
  const a = new Date(pickupDate);
  const b = new Date(returnDate);
  return Math.max(1, Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24)));
}