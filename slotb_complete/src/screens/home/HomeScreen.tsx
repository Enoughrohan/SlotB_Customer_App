import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Dimensions, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const CATEGORIES = [
  { id: '1', name: "Women's\nParlour", image: require('../../assets/images/women_parlour.jpg'), screen: 'WomensSalon' },
  { id: '2', name: "Men's\nSalon", image: require('../../assets/images/mens_salon.jpg'), screen: 'MensSalon' },
  { id: '3', name: 'Cleaning', image: require('../../assets/images/cleaning.jpg'), screen: 'ServiceDetail' },
  { id: '4', name: 'AC\nRepair', image: require('../../assets/images/ac_repair.jpg'), screen: 'ServiceDetail' },
  { id: '5', name: 'Appliance\nRepair', image: require('../../assets/images/appliance_repair.jpg'), screen: 'ServiceDetail' },
  { id: '6', name: 'Plumber', image: require('../../assets/images/plumber.jpg'), screen: 'ServiceDetail' },
  { id: '7', name: 'Electrician', image: require('../../assets/images/electrician.jpg'), screen: 'ServiceDetail' },
  { id: '8', name: 'Carpenter', image: require('../../assets/images/carpenter.jpg'), screen: 'ServiceDetail' },
];

const BANNERS = [
  { id: '1', title: '20% off on your\nfirst AC servicing', sub: 'Up to ₹100 off' },
  { id: '2', title: '₹9 first\nHome Cleaning', sub: 'Limited time offer' },
  { id: '3', title: 'Trusted Pros\nNear You', sub: 'Book in 30 seconds' },
];

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

        {/* Sticky Blue Header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <TouchableOpacity style={s.locRow}>
              <Text style={s.locPin}>📍</Text>
              <View>
                <Text style={s.locTime}>In 46 minutes</Text>
                <Text style={s.locCity}>Begusarai, Bihar ▾</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={s.bellBtn} onPress={() => navigation.navigate('Notifications')}>
              <Text style={s.bellIcon}>🔔</Text>
              <View style={s.bellDot} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.searchBar} onPress={() => navigation.navigate('Search')} activeOpacity={0.95}>
            <Text style={s.searchIcon}>🔍</Text>
            <Text style={s.searchPh}>Search for services...</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / width))}>
          {BANNERS.map(b => (
            <View key={b.id} style={s.banner}>
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>{b.title}</Text>
                <Text style={s.bannerSub}>{b.sub}</Text>
              </View>
              <View style={s.bannerRight}>
                <Text style={s.bannerLogoWhite}>Slot</Text>
                <Text style={s.bannerLogoOrange}>b</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={s.dots}>
          {BANNERS.map((_, i) => <View key={i} style={[s.dot, i === activeBanner && s.dotActive]} />)}
        </View>

        {/* All Services */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>All Services</Text>
          <View style={s.grid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.id} style={s.catCard}
                onPress={() => navigation.navigate(cat.screen, { category: cat.name })}
                activeOpacity={0.85}>
                <Image source={cat.image} style={s.catImage} resizeMode="contain" />
                <Text style={s.catName}>{cat.name}</Text>
                <Text style={s.catArrow}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom promo banner */}
        <View style={[s.banner, { width: width - 32, marginHorizontal: 16, borderRadius: 14, marginBottom: 8 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>{'20% off on your\nfirst AC servicing'}</Text>
            <Text style={s.bannerSub}>Up to ₹100 off</Text>
          </View>
          <View style={s.bannerRight}>
            <Text style={s.bannerLogoWhite}>Slot</Text>
            <Text style={s.bannerLogoOrange}>b</Text>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[s.tabBar, { paddingBottom: insets.bottom + 6 }]}>
        <TouchableOpacity style={s.tabItem}>
          <Text style={s.tabIconActive}>🏠</Text>
          <Text style={[s.tabLabel, { color: BLUE, fontWeight: '700' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Search')}>
          <Text style={s.tabIcon}>🧭</Text>
          <Text style={s.tabLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.qrPill} onPress={() => navigation.navigate('ScanQR')}>
          <Text style={s.qrIcon}>⬛</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Bookings')}>
          <Text style={s.tabIcon}>📋</Text>
          <Text style={s.tabLabel}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Text style={s.tabIcon}>👤</Text>
          <Text style={s.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { backgroundColor: BLUE, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locPin: { fontSize: 16 },
  locTime: { fontSize: 14, fontWeight: '700', color: '#fff' },
  locCity: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bellIcon: { fontSize: 18 },
  bellDot: { position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchIcon: { fontSize: 15 },
  searchPh: { fontSize: 14, color: '#94A3B8', flex: 1 },
  banner: { width, height: 155, backgroundColor: BLUE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' },
  bannerTitle: { fontSize: 17, fontWeight: '800', color: '#fff', lineHeight: 23, marginBottom: 6 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  bannerRight: { flexDirection: 'row', alignItems: 'center' },
  bannerLogoWhite: { fontSize: 18, fontWeight: '900', color: '#fff' },
  bannerLogoOrange: { fontSize: 18, fontWeight: '900', color: '#F97316' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, paddingVertical: 8, backgroundColor: '#fff' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CBD5E1' },
  dotActive: { width: 16, backgroundColor: BLUE, borderRadius: 3 },
  section: { backgroundColor: '#fff', marginTop: 8, paddingHorizontal: 16, paddingVertical: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: {
    width: (width - 42) / 2, flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', backgroundColor: '#fff',
    borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14,
    paddingHorizontal: 10, paddingVertical: 12,
  },
  catImage: { width: 46, height: 46, borderRadius: 8 },
  catName: { flex: 1, fontSize: 12, fontWeight: '600', color: '#0F172A', lineHeight: 17, marginHorizontal: 8 },
  catArrow: { fontSize: 18, color: '#94A3B8' },
  tabBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    flexDirection: 'row', backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: '#E2E8F0',
    paddingTop: 10, alignItems: 'center', justifyContent: 'space-around', elevation: 12,
  },
  tabItem: { alignItems: 'center', flex: 1, gap: 2 },
  tabIcon: { fontSize: 22 },
  tabIconActive: { fontSize: 22 },
  tabLabel: { fontSize: 10, color: '#64748B', fontWeight: '500' },
  qrPill: { width: 54, height: 54, borderRadius: 27, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: -18, elevation: 10 },
  qrIcon: { fontSize: 20, color: '#fff' },
});