export type DuffelAirport = {
  id: string;
  iata_code: string;
  name: string;
  city: { name: string } | null;
  country: { name: string } | null;
};

export type DuffelSlice = {
  origin: DuffelAirport;
  destination: DuffelAirport;
  departure_date: string;
};

export type DuffelSegment = {
  id: string;
  origin: DuffelAirport;
  destination: DuffelAirport;
  departing_at: string;
  arriving_at: string;
  duration: string;
  operating_carrier: {
    name: string;
    iata_code: string;
    logo_symbol_url: string | null;
  };
  aircraft: { name: string } | null;
};

export type DuffelOfferSlice = {
  id: string;
  origin: DuffelAirport;
  destination: DuffelAirport;
  departure_date: string;
  duration: string;
  segments: DuffelSegment[];
};

export type DuffelOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  base_amount: string;
  tax_amount: string;
  slices: DuffelOfferSlice[];
  passengers: { id: string; type: string }[];
  owner: {
    name: string;
    iata_code: string;
    logo_symbol_url: string | null;
  };
  expires_at: string;
};

export type SearchParams = {
  origin: string;
  destination: string;
  date: string;
  adults: number;
};

export type SeatMap = {
  id: string;
  slice_id: string;
  segment_id: string;
  cabins: Cabin[];
};

export type Cabin = {
  cabin_class: string;
  rows: Row[];
  wings: { first_row_index: number; last_row_index: number };
};

export type Row = {
  sections: Section[];
};

export type Section = {
  elements: SeatElement[];
};

export type SeatElement = {
  type: 'seat' | 'bassinet' | 'exit_row' | 'lavatory' | 'galley' | 'empty' | 'stairs';
  designator?: string;
  available_services?: { id: string; total_amount: string; total_currency: string }[];
  disclosures?: string[];
};