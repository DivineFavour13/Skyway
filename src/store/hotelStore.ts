import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Hotel, RoomType } from '@/lib/mockHotels';

export type HotelGuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests?: string;
};

type HotelStore = {
  selectedHotel: Hotel | null;
  selectedRoom: RoomType | null;
  checkin: string;
  checkout: string;
  guests: number;
  guestDetails: HotelGuestDetails | null;
  bookingReference: string | null;

  setSelectedHotel: (hotel: Hotel) => void;
  setSelectedRoom: (room: RoomType) => void;
  setSearchParams: (checkin: string, checkout: string, guests: number) => void;
  setGuestDetails: (details: HotelGuestDetails) => void;
  setBookingReference: (ref: string) => void;
  reset: () => void;
};

export const useHotelStore = create<HotelStore>()(
  persist(
    (set) => ({
      selectedHotel: null,
      selectedRoom: null,
      checkin: '',
      checkout: '',
      guests: 2,
      guestDetails: null,
      bookingReference: null,

      setSelectedHotel: (hotel) => set({ selectedHotel: hotel }),
      setSelectedRoom: (room) => set({ selectedRoom: room }),
      setSearchParams: (checkin, checkout, guests) =>
        set({ checkin, checkout, guests }),
      setGuestDetails: (details) => set({ guestDetails: details }),
      setBookingReference: (ref) => set({ bookingReference: ref }),
      reset: () =>
        set({
          selectedHotel: null,
          selectedRoom: null,
          checkin: '',
          checkout: '',
          guests: 2,
          guestDetails: null,
          bookingReference: null,
        }),
    }),
    {
      name: 'nextrip-hotel-booking',
      partialize: (state) => ({
        selectedHotel: state.selectedHotel,
        selectedRoom: state.selectedRoom,
        checkin: state.checkin,
        checkout: state.checkout,
        guests: state.guests,
        guestDetails: state.guestDetails,
        bookingReference: state.bookingReference,
      }),
    }
  )
);