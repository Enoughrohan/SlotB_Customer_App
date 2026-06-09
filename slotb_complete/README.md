# SlotB Customer App — Complete UI

React Native CLI | Blue #1A47E8 | TypeScript | Zustand | React Navigation 6

---

## 📱 Total Screens: 19

### Auth (3)
| Screen | File |
|--------|------|
| Splash | src/screens/auth/SplashScreen.tsx |
| Login | src/screens/auth/LoginScreen.tsx |
| OTP Verify | src/screens/auth/OtpVerifyScreen.tsx |

### Home (1)
| Screen | File |
|--------|------|
| Home | src/screens/home/HomeScreen.tsx |

### Salon (4)
| Screen | File |
|--------|------|
| Salon List (Men's/Women's) | src/screens/salon/SalonListScreen.tsx |
| Salon Detail | src/screens/salon/SalonDetailScreen.tsx |
| Token Booking | src/screens/salon/TokenBookingScreen.tsx |
| Booking Confirmed | src/screens/salon/BookingConfirmedScreen.tsx |

### Services (2)
| Screen | File |
|--------|------|
| Service Detail | src/screens/services/ServiceDetailScreen.tsx |
| Book Service | src/screens/services/BookServiceScreen.tsx |

### Bookings (1)
| Screen | File |
|--------|------|
| My Bookings | src/screens/bookings/MyBookingsScreen.tsx |

### Profile (2)
| Screen | File |
|--------|------|
| Profile | src/screens/profile/ProfileScreen.tsx |
| Edit Profile | src/screens/profile/EditProfileScreen.tsx |

### Misc (6)
| Screen | File |
|--------|------|
| Notifications | src/screens/misc/NotificationsScreen.tsx |
| Payment | src/screens/misc/PaymentScreen.tsx |
| Search | src/screens/misc/SearchScreen.tsx |
| Scan QR | src/screens/misc/ScanQRScreen.tsx |
| Help Centre | src/screens/misc/HelpCentreScreen.tsx |

---

## 🚀 Setup Instructions

### Step 1 — New React Native Project banao
```bash
npx react-native init SlotBApp --template react-native-template-typescript
cd SlotBApp
```

### Step 2 — Is ZIP ki src/ aur App.tsx copy karo project mein
```bash
# ZIP extract karo, phir:
cp -r slotb_complete/src/ ./src/
cp slotb_complete/App.tsx ./App.tsx
```

### Step 3 — Dependencies install karo
```bash
npm install @react-navigation/native @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install @react-native-async-storage/async-storage
npm install zustand axios
```

### Step 4 — iOS pods (Mac only)
```bash
cd ios && pod install && cd ..
```

### Step 5 — Run karo
```bash
# Android
npx react-native run-android

# iOS
npx react-native run-ios
```

---

## 🎨 Design System

| Token | Value |
|-------|-------|
| Primary Blue | #1A47E8 |
| Background | #F8FAFF |
| Text Dark | #0F172A |
| Text Gray | #64748B |
| Border | #E2E8F0 |
| Success | #22C55E |
| Error | #EF4444 |
| Orange | #F97316 |

---

## 📂 Folder Structure

```
src/
├── screens/
│   ├── auth/          (Splash, Login, OTP)
│   ├── home/          (Home)
│   ├── salon/         (SalonList, SalonDetail, TokenBooking, BookingConfirmed)
│   ├── services/      (ServiceDetail, BookService)
│   ├── bookings/      (MyBookings)
│   ├── profile/       (Profile, EditProfile)
│   └── misc/          (Notifications, Payment, Search, ScanQR, HelpCentre)
├── navigation/
│   └── AppNavigator.tsx
├── store/
│   ├── useAuthStore.ts
│   ├── useLocationStore.ts
│   └── useBookingStore.ts
├── services/
│   └── api.ts
├── theme/
│   └── index.ts
└── utils/
    ├── constants.ts
    └── formatters.ts
```

---

*Built for SlotB — Fast Booking. Zero Waiting.*
