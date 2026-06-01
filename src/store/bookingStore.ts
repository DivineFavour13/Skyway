import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { DuffelOffer } from '@/types/duffel';
import type { Airport } from '@/lib/airports';

export type CabinClass = 'economy' | 'premium_economy' | 'business' | 'first';

export type PassengerDetails = {
  firstName: string;
  lastName: string;
  email: string;
  passport: string;
};

export type SearchCriteria = {
  origin: Airport | null;
  destination: Airport | null;
  date: string;
  returnDate: string;
  tripType: 'oneway' | 'roundtrip';
  adults: number;
  cabinClass: CabinClass;
};

export type BookingStore = {
  search: SearchCriteria;
  setSearch: (search: Partial<SearchCriteria>) => void;
  selectedOffer: DuffelOffer | null;
  setSelectedOffer: (offer: DuffelOffer) => void;
  selectedSeatIds: string[];
  toggleSeat: (seatId: string) => void;
  passenger: PassengerDetails | null;
  setPassenger: (details: PassengerDetails) => void;
  bookingReference: string | null;
  setBookingReference: (ref: string) => void;
  reset: () => void;
};

const initialSearch: SearchCriteria = {
  origin: null,
  destination: null,
  date: '',
  returnDate: '',
  tripType: 'oneway',
  adults: 1,
  cabinClass: 'economy',
};

export const useBookingStore = create<BookingStore>()(
  persist(
    (set) => ({
      search: initialSearch,
      setSearch: (partial) =>
        set((state) => ({ search: { ...state.search, ...partial } })),
      selectedOffer: null,
      setSelectedOffer: (offer) => set({ selectedOffer: offer }),
      selectedSeatIds: [],
      toggleSeat: (seatId) =>
        set((state) => ({
          selectedSeatIds: state.selectedSeatIds.includes(seatId)
            ? state.selectedSeatIds.filter((id) => id !== seatId)
            : [...state.selectedSeatIds, seatId],
        })),
      passenger: null,
      setPassenger: (details) => set({ passenger: details }),
      bookingReference: null,
      setBookingReference: (ref) => set({ bookingReference: ref }),
      reset: () =>
        set({
          search: initialSearch,
          selectedOffer: null,
          selectedSeatIds: [],
          passenger: null,
          bookingReference: null,
        }),
    }),
    {
      name: 'skyway-booking',
      partialize: (state) => ({
        search: state.search,
        selectedOffer: state.selectedOffer,
        passenger: state.passenger,
        bookingReference: state.bookingReference,
      }),
    }
  )
);