import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Car } from '@/lib/mockCars';

export type CarDriverDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  licenseNumber: string;
};

type CarStore = {
  selectedCar: Car | null;
  pickup: string;
  pickupDate: string;
  returnDate: string;
  driverDetails: CarDriverDetails | null;
  bookingReference: string | null;

  setSelectedCar: (car: Car) => void;
  setSearchParams: (pickup: string, pickupDate: string, returnDate: string) => void;
  setDriverDetails: (details: CarDriverDetails) => void;
  setBookingReference: (ref: string) => void;
  reset: () => void;
};

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      selectedCar: null,
      pickup: '',
      pickupDate: '',
      returnDate: '',
      driverDetails: null,
      bookingReference: null,

      setSelectedCar: (car) => set({ selectedCar: car }),
      setSearchParams: (pickup, pickupDate, returnDate) =>
        set({ pickup, pickupDate, returnDate }),
      setDriverDetails: (details) => set({ driverDetails: details }),
      setBookingReference: (ref) => set({ bookingReference: ref }),
      reset: () =>
        set({
          selectedCar: null,
          pickup: '',
          pickupDate: '',
          returnDate: '',
          driverDetails: null,
          bookingReference: null,
        }),
    }),
    {
      name: 'nextrip-car-booking',
      partialize: (state) => ({
        selectedCar: state.selectedCar,
        pickup: state.pickup,
        pickupDate: state.pickupDate,
        returnDate: state.returnDate,
        driverDetails: state.driverDetails,
        bookingReference: state.bookingReference,
      }),
    }
  )
);