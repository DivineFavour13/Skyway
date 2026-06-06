import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Activity } from '@/lib/mockActivities';

export type ActivityGuestDetails = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

type ActivityStore = {
  selectedActivity: Activity | null;
  date: string;
  people: number;
  guestDetails: ActivityGuestDetails | null;
  bookingReference: string | null;

  setSelectedActivity: (activity: Activity) => void;
  setSearchParams: (date: string, people: number) => void;
  setGuestDetails: (details: ActivityGuestDetails) => void;
  setBookingReference: (ref: string) => void;
  reset: () => void;
};

export const useActivityStore = create<ActivityStore>()(
  persist(
    (set) => ({
      selectedActivity: null,
      date: '',
      people: 2,
      guestDetails: null,
      bookingReference: null,

      setSelectedActivity: (activity) => set({ selectedActivity: activity }),
      setSearchParams: (date, people) => set({ date, people }),
      setGuestDetails: (details) => set({ guestDetails: details }),
      setBookingReference: (ref) => set({ bookingReference: ref }),
      reset: () =>
        set({
          selectedActivity: null,
          date: '',
          people: 2,
          guestDetails: null,
          bookingReference: null,
        }),
    }),
    {
      name: 'nextrip-activity-booking',
      partialize: (state) => ({
        selectedActivity: state.selectedActivity,
        date: state.date,
        people: state.people,
        guestDetails: state.guestDetails,
        bookingReference: state.bookingReference,
      }),
    }
  )
);