import axios from 'axios';
const BASE_URL = 'https://slotb.in';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(async (config) => {
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  const token = await AsyncStorage.getItem('auth_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const authAPI = {
  login: (phone: string) => api.post('/api_auth.php?action=login', { phone }),
  verifyOtp: (phone: string, otp: string) => api.post('/api_auth.php?action=verify_otp', { phone, otp }),
  signup: (data: any) => api.post('/api_auth.php?action=signup', data),
};

export const salonAPI = {
  getList: (type: 'mens' | 'womens') => api.get(`/api_salon.php?action=get_list&type=${type}`),
  getDetail: (id: string) => api.get(`/api_salon.php?action=get_detail&id=${id}`),
  getLiveToken: (salonId: string) => api.get(`/api_token.php?action=get_live_status&salon_id=${salonId}`),
  bookToken: (data: any) => api.post('/api_token.php?action=book_token', data),
};

export const serviceAPI = {
  getCategories: () => api.get('/api_services.php?action=get_categories'),
  getProviders: (category: string) => api.get(`/api_services.php?action=get_providers&category=${category}`),
  createBooking: (data: any) => api.post('/api_bookings.php?action=create_service_booking', data),
};

export const bookingAPI = {
  getUserBookings: () => api.get('/api_bookings.php?action=get_user_bookings'),
  cancelBooking: (id: string) => api.post('/api_bookings.php?action=cancel_booking', { id }),
};

export default api;
