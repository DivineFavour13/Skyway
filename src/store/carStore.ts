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
  dropoff: string;
  pickupDate: string;
  pickupTime: string;
  returnDate: string;
  returnTime: string;
  driverDetails: CarDriverDetails | null;
  bookingReference: string | null;

  setSelectedCar: (car: Car) => void;
  setSearchParams: (params: {
    pickup: string;
    dropoff: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
  }) => void;
  setDriverDetails: (details: CarDriverDetails) => void;
  setBookingReference: (ref: string) => void;
  reset: () => void;
};

export const useCarStore = create<CarStore>()(
  persist(
    (set) => ({
      selectedCar: null,
      pickup: '',
      dropoff: '',
      pickupDate: '',
      pickupTime: '10:00',
      returnDate: '',
      returnTime: '10:00',
      driverDetails: null,
      bookingReference: null,

      setSelectedCar: (car) => set({ selectedCar: car }),
      setSearchParams: (params) => set({ ...params }),
      setDriverDetails: (details) => set({ driverDetails: details }),
      setBookingReference: (ref) => set({ bookingReference: ref }),
      reset: () =>
        set({
          selectedCar: null,
          pickup: '',
          dropoff: '',
          pickupDate: '',
          pickupTime: '10:00',
          returnDate: '',
          returnTime: '10:00',
          driverDetails: null,
          bookingReference: null,
        }),
    }),
    {
      name: 'nextrip-car-booking',
      partialize: (state) => ({
        selectedCar: state.selectedCar,
        pickup: state.pickup,
        dropoff: state.dropoff,
        pickupDate: state.pickupDate,
        pickupTime: state.pickupTime,
        returnDate: state.returnDate,
        returnTime: state.returnTime,
        driverDetails: state.driverDetails,
        bookingReference: state.bookingReference,
      }),
    }
  )
);