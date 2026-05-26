export type Airport = {
  iata_code: string;
  name: string;
  city_name: string;
  iata_country_code: string;
};

export const POPULAR_AIRPORTS: Airport[] = [
  // Nigeria
  { iata_code: 'LOS', name: 'Murtala Muhammed International Airport', city_name: 'Lagos', iata_country_code: 'NG' },
  { iata_code: 'ABV', name: 'Nnamdi Azikiwe International Airport', city_name: 'Abuja', iata_country_code: 'NG' },
  { iata_code: 'PHC', name: 'Port Harcourt International Airport', city_name: 'Port Harcourt', iata_country_code: 'NG' },
  { iata_code: 'KAN', name: 'Mallam Aminu Kano International Airport', city_name: 'Kano', iata_country_code: 'NG' },
  { iata_code: 'ENU', name: 'Akanu Ibiam International Airport', city_name: 'Enugu', iata_country_code: 'NG' },
  // Africa
  { iata_code: 'ACC', name: 'Kotoka International Airport', city_name: 'Accra', iata_country_code: 'GH' },
  { iata_code: 'NBO', name: 'Jomo Kenyatta International Airport', city_name: 'Nairobi', iata_country_code: 'KE' },
  { iata_code: 'JNB', name: 'O.R. Tambo International Airport', city_name: 'Johannesburg', iata_country_code: 'ZA' },
  { iata_code: 'CPT', name: 'Cape Town International Airport', city_name: 'Cape Town', iata_country_code: 'ZA' },
  { iata_code: 'ADD', name: 'Bole International Airport', city_name: 'Addis Ababa', iata_country_code: 'ET' },
  { iata_code: 'CAI', name: 'Cairo International Airport', city_name: 'Cairo', iata_country_code: 'EG' },
  { iata_code: 'CMN', name: 'Mohammed V International Airport', city_name: 'Casablanca', iata_country_code: 'MA' },
  { iata_code: 'DAR', name: 'Julius Nyerere International Airport', city_name: 'Dar es Salaam', iata_country_code: 'TZ' },
  { iata_code: 'DKR', name: 'Blaise Diagne International Airport', city_name: 'Dakar', iata_country_code: 'SN' },
  { iata_code: 'ABJ', name: 'Félix-Houphouët-Boigny International Airport', city_name: 'Abidjan', iata_country_code: 'CI' },
  { iata_code: 'LUN', name: 'Kenneth Kaunda International Airport', city_name: 'Lusaka', iata_country_code: 'ZM' },
  // Europe
  { iata_code: 'LHR', name: 'Heathrow Airport', city_name: 'London', iata_country_code: 'GB' },
  { iata_code: 'LGW', name: 'Gatwick Airport', city_name: 'London', iata_country_code: 'GB' },
  { iata_code: 'CDG', name: 'Charles de Gaulle Airport', city_name: 'Paris', iata_country_code: 'FR' },
  { iata_code: 'AMS', name: 'Amsterdam Airport Schiphol', city_name: 'Amsterdam', iata_country_code: 'NL' },
  { iata_code: 'FRA', name: 'Frankfurt Airport', city_name: 'Frankfurt', iata_country_code: 'DE' },
  { iata_code: 'MAD', name: 'Adolfo Suárez Madrid–Barajas Airport', city_name: 'Madrid', iata_country_code: 'ES' },
  { iata_code: 'FCO', name: 'Leonardo da Vinci International Airport', city_name: 'Rome', iata_country_code: 'IT' },
  { iata_code: 'IST', name: 'Istanbul Airport', city_name: 'Istanbul', iata_country_code: 'TR' },
  { iata_code: 'ZRH', name: 'Zurich Airport', city_name: 'Zurich', iata_country_code: 'CH' },
  { iata_code: 'MUC', name: 'Munich Airport', city_name: 'Munich', iata_country_code: 'DE' },
  // Middle East
  { iata_code: 'DXB', name: 'Dubai International Airport', city_name: 'Dubai', iata_country_code: 'AE' },
  { iata_code: 'AUH', name: 'Abu Dhabi International Airport', city_name: 'Abu Dhabi', iata_country_code: 'AE' },
  { iata_code: 'DOH', name: 'Hamad International Airport', city_name: 'Doha', iata_country_code: 'QA' },
  { iata_code: 'RUH', name: 'King Khalid International Airport', city_name: 'Riyadh', iata_country_code: 'SA' },
  // Asia
  { iata_code: 'SIN', name: 'Singapore Changi Airport', city_name: 'Singapore', iata_country_code: 'SG' },
  { iata_code: 'HKG', name: 'Hong Kong International Airport', city_name: 'Hong Kong', iata_country_code: 'HK' },
  { iata_code: 'BOM', name: 'Chhatrapati Shivaji Maharaj International Airport', city_name: 'Mumbai', iata_country_code: 'IN' },
  { iata_code: 'DEL', name: 'Indira Gandhi International Airport', city_name: 'New Delhi', iata_country_code: 'IN' },
  { iata_code: 'PEK', name: 'Beijing Capital International Airport', city_name: 'Beijing', iata_country_code: 'CN' },
  { iata_code: 'NRT', name: 'Narita International Airport', city_name: 'Tokyo', iata_country_code: 'JP' },
  { iata_code: 'ICN', name: 'Incheon International Airport', city_name: 'Seoul', iata_country_code: 'KR' },
  { iata_code: 'BKK', name: 'Suvarnabhumi Airport', city_name: 'Bangkok', iata_country_code: 'TH' },
  // Americas
  { iata_code: 'JFK', name: 'John F. Kennedy International Airport', city_name: 'New York', iata_country_code: 'US' },
  { iata_code: 'LAX', name: 'Los Angeles International Airport', city_name: 'Los Angeles', iata_country_code: 'US' },
  { iata_code: 'ORD', name: "O'Hare International Airport", city_name: 'Chicago', iata_country_code: 'US' },
  { iata_code: 'MIA', name: 'Miami International Airport', city_name: 'Miami', iata_country_code: 'US' },
  { iata_code: 'YYZ', name: 'Toronto Pearson International Airport', city_name: 'Toronto', iata_country_code: 'CA' },
  { iata_code: 'GRU', name: 'São Paulo–Guarulhos International Airport', city_name: 'São Paulo', iata_country_code: 'BR' },
];

export function searchAirportsLocal(query: string): Airport[] {
  if (query.length < 2) return [];
  const q = query.toLowerCase();
  return POPULAR_AIRPORTS.filter(
    (a) =>
      a.city_name.toLowerCase().includes(q) ||
      a.iata_code.toLowerCase().includes(q) ||
      a.name.toLowerCase().includes(q)
  ).slice(0, 6);
}