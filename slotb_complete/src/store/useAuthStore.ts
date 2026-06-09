import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  user: { name: string; phone: string; email: string } | null;
  token: string | null;
  isLoggedIn: boolean;
  login: (user: any, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  login: (user, token) => {
    AsyncStorage.setItem('auth_token', token);
    set({ user, token, isLoggedIn: true });
  },
  logout: () => {
    AsyncStorage.removeItem('auth_token');
    set({ user: null, token: null, isLoggedIn: false });
  },
}));
