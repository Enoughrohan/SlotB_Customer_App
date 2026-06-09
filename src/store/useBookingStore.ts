import { create } from 'zustand';

interface BookingState {
  activeToken: any | null;
  bookingHistory: any[];
  setActiveToken: (token: any) => void;
  clearToken: () => void;
  addBooking: (booking: any) => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  activeToken: null,
  bookingHistory: [],
  setActiveToken: (token) => set({ activeToken: token }),
  clearToken: () => set({ activeToken: null }),
  addBooking: (booking) => set((state) => ({ bookingHistory: [booking, ...state.bookingHistory] })),
}));
