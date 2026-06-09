import { create } from 'zustand';

interface LocationState {
  city: string;
  state: string;
  coords: { lat: number; lng: number } | null;
  setLocation: (city: string, state: string, coords?: any) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  city: 'Begusarai',
  state: 'Bihar',
  coords: null,
  setLocation: (city, state, coords) => set({ city, state, coords }),
}));
