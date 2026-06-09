export const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`;
export const formatDate = (date: string) => new Date(date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
export const formatTime = (time: string) => time;
export const formatDistance = (km: number) => km < 1 ? `${(km * 1000).toFixed(0)}m` : `${km.toFixed(1)} km`;
