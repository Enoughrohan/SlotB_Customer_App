import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const CATEGORIES = [
  { id: '1', name: "Women's\nParlour", emoji: '👩', screen: 'WomensSalon' },
  { id: '2', name: "Men's\nSalon",    emoji: '✂️', screen: 'MensSalon' },
  { id: '3', name: 'Cleaning',        emoji: '🧹', screen: 'ServiceDetail' },
  { id: '4', name: 'AC\nRepair',      emoji: '❄️', screen: 'ServiceDetail' },
  { id: '5', name: 'Appliance\nRepair',emoji: '🔧', screen: 'ServiceDetail' },
  { id: '6', name: 'Plumber',         emoji: '🚰', screen: 'ServiceDetail' },
  { id: '7', name: 'Electrician',     emoji: '⚡', screen: 'ServiceDetail' },
  { id: '8', name: 'Carpenter',       emoji: '🪚', screen: 'ServiceDetail' },
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
              <Text style={{ fontSize: 16 }}>📍</Text>
              <View>
                <Text style={s.locTime}>In 46 minutes</Text>
                <Text style={s.locCity}>Begusarai, Bihar ▾</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={s.bellBtn} onPress={() => navigation.navigate('Notifications')}>
              <Text style={{ fontSize: 18 }}>🔔</Text>
              <View style={s.bellDot} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.searchBar} onPress={() => navigation.navigate('Search')} activeOpacity={0.95}>
            <Text style={{ fontSize: 15 }}>🔍</Text>
            <Text style={s.searchPh}>Search for services...</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / width))}>
          {BANNERS.map((b) => (
            <View key={b.id} style={s.banner}>
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>{b.title}</Text>
                <Text style={s.bannerSub}>{b.sub}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 48 }}>👷</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 12, fontWeight: '800', color: '#fff' }}>Slot</Text>
                  <Text style={{ fontSize: 12, fontWeight: '800', color: '#F97316' }}>b</Text>
                </View>
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
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, flex: 1 }}>
                  <Text style={{ fontSize: 26 }}>{cat.emoji}</Text>
                  <Text style={s.catName}>{cat.name}</Text>
                </View>
                <Text style={{ fontSize: 18, color: '#94A3B8' }}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom promo */}
        <View style={[s.banner, { marginHorizontal: 16, borderRadius: 14, marginBottom: 8 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>{'20% off on your\nfirst AC servicing'}</Text>
            <Text style={s.bannerSub}>Up to ₹100 off</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 44 }}>👷</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 11, fontWeight: '800', color: '#fff' }}>Slot</Text>
              <Text style={{ fontSize: 11, fontWeight: '800', color: '#F97316' }}>b</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Tab Bar */}
      <View style={[s.tabBar, { paddingBottom: insets.bottom + 8 }]}>
        {[
          { icon: '🏠', label: 'Home', screen: 'Home', active: true },
          { icon: '🧭', label: 'Explore', screen: 'Search' },
        ].map(tab => (
          <TouchableOpacity key={tab.label} style={s.tabItem} onPress={() => navigation.navigate(tab.screen)}>
            <Text style={{ fontSize: 22 }}>{tab.icon}</Text>
            <Text style={[s.tabLabel, tab.active && { color: BLUE, fontWeight: '700' }]}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.qrPill} onPress={() => navigation.navigate('ScanQR')}>
          <Text style={{ fontSize: 20, color: '#fff' }}>⬛</Text>
        </TouchableOpacity>
        {[
          { icon: '📋', label: 'Bookings', screen: 'Bookings' },
          { icon: '👤', label: 'Profile', screen: 'Profile' },
        ].map(tab => (
          <TouchableOpacity key={tab.label} style={s.tabItem} onPress={() => navigation.navigate(tab.screen)}>
            <Text style={{ fontSize: 22 }}>{tab.icon}</Text>
            <Text style={s.tabLabel}>{tab.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { backgroundColor: BLUE, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  locRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  locTime: { fontSize: 14, fontWeight: '700', color: '#fff' },
  locCity: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  bellBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  bellDot: { position: 'absolute', top: 7, right: 7, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: '#fff' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
  searchPh: { fontSize: 14, color: '#94A3B8', flex: 1 },
  banner: { width, height: 150, backgroundColor: BLUE, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, justifyContent: 'space-between' },
  bannerTitle: { fontSize: 17, fontWeight: '800', color: '#fff', lineHeight: 23, marginBottom: 6 },
  bannerSub: { fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 5, paddingVertical: 8, backgroundColor: '#fff' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#CBD5E1' },
  dotActive: { width: 16, backgroundColor: BLUE, borderRadius: 3 },
  section: { backgroundColor: '#fff', marginTop: 8, paddingHorizontal: 16, paddingVertical: 16 },
  sectionTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A', marginBottom: 12 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  catCard: { width: (width - 42) / 2, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 14, paddingHorizontal: 12, paddingVertical: 14 },
  catName: { fontSize: 12, fontWeight: '600', color: '#0F172A', flex: 1 },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 10, alignItems: 'center', justifyContent: 'space-around', elevation: 12 },
  tabItem: { alignItems: 'center', flex: 1, gap: 2 },
  tabLabel: { fontSize: 10, color: '#64748B' },
  qrPill: { width: 54, height: 54, borderRadius: 27, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: -18, elevation: 10 },
});
