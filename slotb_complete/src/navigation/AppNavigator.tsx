import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Auth
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OtpVerifyScreen from '../screens/auth/OtpVerifyScreen';

// Home
import HomeScreen from '../screens/home/HomeScreen';

// Salon
import SalonListScreen from '../screens/salon/SalonListScreen';
import SalonDetailScreen from '../screens/salon/SalonDetailScreen';
import TokenBookingScreen from '../screens/salon/TokenBookingScreen';
import BookingConfirmedScreen from '../screens/salon/BookingConfirmedScreen';

// Services
import ServiceDetailScreen from '../screens/services/ServiceDetailScreen';
import BookServiceScreen from '../screens/services/BookServiceScreen';

// Bookings
import MyBookingsScreen from '../screens/bookings/MyBookingsScreen';

// Profile
import ProfileScreen from '../screens/profile/ProfileScreen';
import EditProfileScreen from '../screens/profile/EditProfileScreen';

// Misc
import NotificationsScreen from '../screens/misc/NotificationsScreen';
import PaymentScreen from '../screens/misc/PaymentScreen';
import SearchScreen from '../screens/misc/SearchScreen';
import ScanQRScreen from '../screens/misc/ScanQRScreen';
import HelpCentreScreen from '../screens/misc/HelpCentreScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>

        {/* ── Auth ── */}
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="OtpVerify" component={OtpVerifyScreen} />

        {/* ── Main ── */}
        <Stack.Screen name="Main" component={HomeScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="Home" component={HomeScreen} />

        {/* ── Salon ── */}
        <Stack.Screen name="MensSalon" component={SalonListScreen} initialParams={{ type: 'mens' }} />
        <Stack.Screen name="WomensSalon" component={SalonListScreen} initialParams={{ type: 'womens' }} />
        <Stack.Screen name="SalonDetail" component={SalonDetailScreen} />
        <Stack.Screen name="TokenBooking" component={TokenBookingScreen} />
        <Stack.Screen name="BookingConfirmed" component={BookingConfirmedScreen} options={{ animation: 'fade', gestureEnabled: false }} />

        {/* ── Services ── */}
        <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
        <Stack.Screen name="BookService" component={BookServiceScreen} />

        {/* ── Bookings ── */}
        <Stack.Screen name="Bookings" component={MyBookingsScreen} />

        {/* ── Profile ── */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />

        {/* ── Misc ── */}
        <Stack.Screen name="Notifications" component={NotificationsScreen} />
        <Stack.Screen name="Payment" component={PaymentScreen} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ animation: 'fade' }} />
        <Stack.Screen name="ScanQR" component={ScanQRScreen} />
        <Stack.Screen name="HelpCentre" component={HelpCentreScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
