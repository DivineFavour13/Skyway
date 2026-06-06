export type Activity = {
  id: string;
  title: string;
  city: string;
  country: string;
  category: 'tours' | 'experiences' | 'adventure' | 'food' | 'culture';
  duration: string;
  pricePerPerson: number;
  currency: string;
  rating: number;
  reviewCount: number;
  description: string;
  highlights: string[];
  includes: string[];
  colorFrom: string;
  colorTo: string;
  maxGroupSize: number;
};

export const MOCK_ACTIVITIES: Activity[] = [
  // Lagos
  {
    id: 'lagos-boat-tour',
    title: 'Lagos Waterways Boat Tour',
    city: 'Lagos', country: 'Nigeria',
    category: 'tours', duration: '3 hours',
    pricePerPerson: 45, currency: 'USD',
    rating: 4.8, reviewCount: 312,
    description: 'Explore Lagos from the water on this scenic boat tour through the city\'s iconic lagoons and creeks.',
    highlights: ['Victoria Island skyline views', 'Traditional fishing villages', 'Tarkwa Bay Beach stop'],
    includes: ['Boat transport', 'Life jackets', 'Refreshments', 'Guide'],
    colorFrom: '#1a4a6e', colorTo: '#2d7a9a',
    maxGroupSize: 20,
  },
  {
    id: 'lagos-food-tour',
    title: 'Lagos Street Food Safari',
    city: 'Lagos', country: 'Nigeria',
    category: 'food', duration: '4 hours',
    pricePerPerson: 60, currency: 'USD',
    rating: 4.9, reviewCount: 541,
    description: 'Taste your way through Lagos\'s vibrant street food scene — from suya to puff-puff to fresh palm wine.',
    highlights: ['Balogun Market visit', '8+ food tastings', 'Local chef stories'],
    includes: ['All food tastings', 'Water', 'Guide', 'Transport between stops'],
    colorFrom: '#7d3c00', colorTo: '#ca6f1e',
    maxGroupSize: 12,
  },
  {
    id: 'lekki-conservation',
    title: 'Lekki Conservation Centre Canopy Walk',
    city: 'Lagos', country: 'Nigeria',
    category: 'adventure', duration: '2 hours',
    pricePerPerson: 25, currency: 'USD',
    rating: 4.7, reviewCount: 892,
    description: 'Walk Africa\'s longest canopy walkway at 401 metres, suspended high above the rainforest floor.',
    highlights: ['Longest canopy walk in Africa', 'Wildlife spotting', 'Mangrove ecosystem'],
    includes: ['Entrance fee', 'Safety equipment', 'Guide'],
    colorFrom: '#1e5631', colorTo: '#27ae60',
    maxGroupSize: 30,
  },
  // London
  {
    id: 'london-thames-cruise',
    title: 'Thames River Sightseeing Cruise',
    city: 'London', country: 'United Kingdom',
    category: 'tours', duration: '1.5 hours',
    pricePerPerson: 22, currency: 'USD',
    rating: 4.6, reviewCount: 4231,
    description: 'See London\'s iconic landmarks from the river — Tower Bridge, Big Ben, the Shard and more.',
    highlights: ['Tower Bridge up close', 'Westminster views', 'Live commentary'],
    includes: ['Boat ticket', 'Live guided commentary'],
    colorFrom: '#1a3a5c', colorTo: '#2e6da4',
    maxGroupSize: 100,
  },
  {
    id: 'london-afternoon-tea',
    title: 'Traditional Afternoon Tea Experience',
    city: 'London', country: 'United Kingdom',
    category: 'food', duration: '2 hours',
    pricePerPerson: 65, currency: 'USD',
    rating: 4.9, reviewCount: 1823,
    description: 'Indulge in a classic British afternoon tea with finger sandwiches, scones and champagne.',
    highlights: ['3-tier cake stand', 'Freshly baked scones', 'Fine loose-leaf teas', 'Optional champagne'],
    includes: ['Full tea service', 'Sandwiches', 'Pastries', 'Scones'],
    colorFrom: '#7d6608', colorTo: '#b7950b',
    maxGroupSize: 20,
  },
  {
    id: 'london-tower-tour',
    title: 'Tower of London Private Tour',
    city: 'London', country: 'United Kingdom',
    category: 'culture', duration: '2.5 hours',
    pricePerPerson: 55, currency: 'USD',
    rating: 4.8, reviewCount: 2341,
    description: 'Explore 1000 years of royal history with a Yeoman Warder guide — including the Crown Jewels.',
    highlights: ['Crown Jewels viewing', 'Beefeater guide', 'Medieval palace', 'Ravens of the Tower'],
    includes: ['Entry tickets', 'Expert guide', 'Crown Jewels access'],
    colorFrom: '#4a1e0e', colorTo: '#7d3c1e',
    maxGroupSize: 15,
  },
  // Dubai
  {
    id: 'dubai-desert-safari',
    title: 'Dubai Desert Safari with BBQ Dinner',
    city: 'Dubai', country: 'UAE',
    category: 'adventure', duration: '6 hours',
    pricePerPerson: 85, currency: 'USD',
    rating: 4.9, reviewCount: 8921,
    description: 'Experience the thrill of dune bashing, camel riding, and a spectacular Bedouin camp dinner under the stars.',
    highlights: ['Dune bashing', 'Camel ride', 'Sandboarding', 'BBQ dinner', 'Belly dancing show'],
    includes: ['Hotel pickup/drop-off', 'BBQ dinner', 'Soft drinks', 'Sandboarding'],
    colorFrom: '#7d6608', colorTo: '#f0c040',
    maxGroupSize: 40,
  },
  {
    id: 'burj-khalifa-observation',
    title: 'Burj Khalifa At The Top Experience',
    city: 'Dubai', country: 'UAE',
    category: 'experiences', duration: '1.5 hours',
    pricePerPerson: 45, currency: 'USD',
    rating: 4.7, reviewCount: 12340,
    description: 'Ascend to the 124th floor of the world\'s tallest building for panoramic views of Dubai and beyond.',
    highlights: ['Floor 124 viewing deck', '360° city views', 'Arabian Gulf views', 'Desert views'],
    includes: ['Skip-the-line entry', 'High-speed elevator', 'Telescope access'],
    colorFrom: '#1c2833', colorTo: '#2e4057',
    maxGroupSize: 50,
  },
  {
    id: 'dubai-food-tour',
    title: 'Old Dubai Food & Culture Walk',
    city: 'Dubai', country: 'UAE',
    category: 'food', duration: '3 hours',
    pricePerPerson: 70, currency: 'USD',
    rating: 4.8, reviewCount: 654,
    description: 'Explore the historic Deira district and taste authentic Emirati and Middle Eastern cuisine.',
    highlights: ['Spice Souk visit', 'Gold Souk', 'Traditional Emirati dishes', 'Abra boat ride'],
    includes: ['6+ food tastings', 'Abra crossing', 'Guide', 'Water'],
    colorFrom: '#5d4037', colorTo: '#8d6e63',
    maxGroupSize: 12,
  },
  // Paris
  {
    id: 'paris-louvre-tour',
    title: 'Louvre Museum Guided Tour',
    city: 'Paris', country: 'France',
    category: 'culture', duration: '3 hours',
    pricePerPerson: 75, currency: 'USD',
    rating: 4.9, reviewCount: 5621,
    description: 'Skip the queues and explore the world\'s greatest museum with an expert art historian guide.',
    highlights: ['Mona Lisa', 'Venus de Milo', 'Winged Victory', 'Egyptian antiquities'],
    includes: ['Skip-the-line tickets', 'Expert guide', 'Headsets'],
    colorFrom: '#7d6608', colorTo: '#d4ac0d',
    maxGroupSize: 15,
  },
  {
    id: 'paris-seine-cruise',
    title: 'Seine River Dinner Cruise',
    city: 'Paris', country: 'France',
    category: 'food', duration: '2.5 hours',
    pricePerPerson: 120, currency: 'USD',
    rating: 4.8, reviewCount: 3241,
    description: 'Dine on classic French cuisine as you glide past Paris\'s most illuminated landmarks at night.',
    highlights: ['Eiffel Tower at night', 'Notre-Dame views', '3-course French dinner', 'Live music'],
    includes: ['3-course dinner', 'Welcome drink', 'Live music', 'Commentary'],
    colorFrom: '#1c2833', colorTo: '#2c4a7c',
    maxGroupSize: 60,
  },
  {
    id: 'paris-cooking-class',
    title: 'French Cooking Class with Market Visit',
    city: 'Paris', country: 'France',
    category: 'experiences', duration: '4 hours',
    pricePerPerson: 95, currency: 'USD',
    rating: 4.9, reviewCount: 1234,
    description: 'Shop at a Parisian market with a chef, then cook a 3-course French meal in a professional kitchen.',
    highlights: ['Market shopping', 'Cook 3 courses', 'Wine pairing', 'Recipe booklet'],
    includes: ['Market visit', 'All ingredients', 'Wine', 'Recipe card', 'Apron'],
    colorFrom: '#7d2d00', colorTo: '#c0392b',
    maxGroupSize: 10,
  },
  // Nairobi
  {
    id: 'nairobi-national-park-safari',
    title: 'Nairobi National Park Game Drive',
    city: 'Nairobi', country: 'Kenya',
    category: 'adventure', duration: '4 hours',
    pricePerPerson: 90, currency: 'USD',
    rating: 4.9, reviewCount: 2341,
    description: 'The world\'s only national park within a capital city — spot lions, rhinos and giraffes with Nairobi\'s skyline as backdrop.',
    highlights: ['Big Five possible', 'City skyline backdrop', 'Professional guide', '200+ bird species'],
    includes: ['Park entry fees', '4WD safari vehicle', 'Expert guide', 'Water'],
    colorFrom: '#1e5631', colorTo: '#2ecc71',
    maxGroupSize: 6,
  },
  {
    id: 'giraffe-centre-nairobi',
    title: 'Giraffe Centre & Karen Blixen Experience',
    city: 'Nairobi', country: 'Kenya',
    category: 'experiences', duration: '3 hours',
    pricePerPerson: 55, currency: 'USD',
    rating: 4.8, reviewCount: 4521,
    description: 'Hand-feed endangered Rothschild giraffes up close, then visit the historic Karen Blixen Museum.',
    highlights: ['Feed giraffes by hand', 'Eye-level giraffe platform', 'Karen Blixen Museum', 'Souvenir shop'],
    includes: ['Entry fees', 'Giraffe food', 'Transport', 'Guide'],
    colorFrom: '#7d4e00', colorTo: '#ca8a04',
    maxGroupSize: 20,
  },
  // New York
  {
    id: 'nyc-statue-of-liberty',
    title: 'Statue of Liberty & Ellis Island Tour',
    city: 'New York', country: 'USA',
    category: 'culture', duration: '4 hours',
    pricePerPerson: 65, currency: 'USD',
    rating: 4.7, reviewCount: 9871,
    description: 'Visit America\'s most iconic landmark and explore the history of immigration at Ellis Island.',
    highlights: ['Ferry to Liberty Island', 'Crown access (limited)', 'Ellis Island museum', 'Manhattan skyline views'],
    includes: ['Ferry tickets', 'Entry fees', 'Audio guide'],
    colorFrom: '#2e4057', colorTo: '#3d6b8c',
    maxGroupSize: 40,
  },
  {
    id: 'nyc-food-tour-manhattan',
    title: 'Manhattan Food & Culture Walking Tour',
    city: 'New York', country: 'USA',
    category: 'food', duration: '3 hours',
    pricePerPerson: 75, currency: 'USD',
    rating: 4.8, reviewCount: 2341,
    description: 'Taste your way through NYC\'s most iconic neighbourhoods — from Chelsea Market to Little Italy.',
    highlights: ['Chelsea Market', 'Little Italy', '8+ tastings', 'NYC history stories'],
    includes: ['All food tastings', 'Water', 'Expert guide'],
    colorFrom: '#7d1d1d', colorTo: '#c0392b',
    maxGroupSize: 14,
  },
];

export function searchActivities(destination: string, category: string): Activity[] {
  const q = destination.toLowerCase();
  return MOCK_ACTIVITIES.filter((a) => {
    const cityMatch =
      a.city.toLowerCase().includes(q) ||
      a.country.toLowerCase().includes(q) ||
      a.title.toLowerCase().includes(q);
    const catMatch = category === 'all' || a.category === category;
    return cityMatch && catMatch;
  });
}

export function getActivityById(id: string): Activity | undefined {
  return MOCK_ACTIVITIES.find((a) => a.id === id);
}