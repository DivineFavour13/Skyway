export type NormalizedHotel = {
  id: string;
  name: string;
  city: string;
  country: string;
  address: string;
  stars: number;
  pricePerNight: number;
  currency: string;
  amenities: string[];
  colorFrom: string;
  colorTo: string;
  offerId?: string;
  reviewScore?: number;
  reviewCount?: number;
  description?: string;
};