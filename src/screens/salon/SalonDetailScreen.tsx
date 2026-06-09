import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const SERVICES_MEN = [
  { id:'1', name:'Haircut', price:199, duration:'30 min' },
  { id:'2', name:'Beard Styling', price:149, duration:'20 min' },
  { id:'3', name:'Hair Spa', price:499, duration:'45 min' },
  { id:'4', name:'Head Massage', price:299, duration:'30 min' },
];
const SERVICES_WOMEN = [
  { id:'1', name:'Hair Wash', price:249, duration:'30 min' },
  { id:'2', name:'Hair Cut & Style', price:499, duration:'45 min' },
  { id:'3', name:'Gold Facial', price:999, duration:'60 min' },
  { id:'4', name:'Manicure', price:299, duration:'40 min' },
];

export default function SalonDetailScreen({ navigation, route }: any) {
  const salon = route?.params?.salon || { name: 'Be 4 U Salon', rating: 4.7, reviews: 128, address: '3rd Floor, Shri Ratan Tower, Kachahari Road, Begusarai', queue: 5, wait: '10-15', nextSlot: '5:30 PM', open: true };
  const type = route?.params?.type || 'mens';
  const isMens = type === 'mens';
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState(0);
  const services = isMens ? SERVICES_MEN : SERVICES_WOMEN;
  const TABS = ['Services', 'Reviews', 'Gallery', 'Info'];

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      {/* Hero Image */}
      <View style={s.heroImg}>
        <Text style={s.heroEmoji}>{isMens ? '✂️' : '💅'}</Text>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Text style={{ fontSize: 16, color: '#0F172A', fontWeight: '700' }}>←</Text>
        </TouchableOpacity>
        <View style={s.heroActions}>
          <TouchableOpacity style={s.heroActionBtn}><Text style={{ fontSize: 16 }}>♡</Text></TouchableOpacity>
          <TouchableOpacity style={s.heroActionBtn}><Text style={{ fontSize: 16 }}>⬆</Text></TouchableOpacity>
        </View>
        <View style={s.photoCount}><Text style={{ fontSize: 11, color: '#fff' }}>📷 1/12</Text></View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Salon Info */}
        <View style={s.infoBlock}>
          <View style={s.infoTop}>
            <View style={{ flex: 1 }}>
              <Text style={s.salonName}>{salon.name}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <View style={s.ratingBadge}><Text style={s.ratingText}>★ {salon.rating}</Text></View>
                <Text style={{ fontSize: 12, color: '#64748B' }}>({salon.reviews})</Text>
                <Text style={{ fontSize: 12, color: BLUE, fontWeight: '600' }}>• {isMens ? "Men's Salon" : "Women's Salon"}</Text>
              </View>
            </View>
            <View style={s.openBadge}>
              <Text style={s.openDot}>●</Text>
              <View>
                <Text style={s.openText}>Open</Text>
                <Text style={s.openTime}>10:00 AM – 9:00 PM</Text>
              </View>
            </View>
          </View>
          <Text style={s.address}>📍 {salon.address}</Text>

          {/* Stats row */}
          <View style={s.statsRow}>
            <View style={s.statItem}>
              <Text style={s.statIcon}>👥</Text>
              <Text style={s.statNum}>{salon.queue}</Text>
              <Text style={s.statLabel}>Customers{'\n'}Ahead</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statIcon}>⏰</Text>
              <Text style={[s.statNum, { color: BLUE }]}>{salon.wait} min</Text>
              <Text style={s.statLabel}>Estimated{'\n'}Wait</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statIcon}>📅</Text>
              <Text style={[s.statNum, { color: '#8B5CF6' }]}>Today, {salon.nextSlot}</Text>
              <Text style={s.statLabel}>Next{'\n'}Slot</Text>
            </View>
            <View style={s.statDivider} />
            <View style={s.statItem}>
              <Text style={s.statIcon}>⭐</Text>
              <Text style={s.statNum}>{salon.rating}</Text>
              <Text style={s.statLabel}>{salon.reviews}{'\n'}Reviews</Text>
            </View>
          </View>

          {/* About */}
          <View style={s.aboutBlock}>
            <View style={{ flex: 1 }}>
              <Text style={s.aboutTitle}>About {salon.name}</Text>
              <Text style={s.aboutText} numberOfLines={3}>
                {isMens ? 'Be 4 U Salon is a premium men\'s grooming destination offering top-notch haircuts, styling, beard services, and skincare treatments in a relaxing environment.'
                  : 'Naturals Salon offers a wide range of beauty and wellness services for hair, skin, nails and more. Experience luxury and care from our expert team.'}
              </Text>
              <Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>Read More ▾</Text>
            </View>
            <View style={s.featuresBlock}>
              {['Hygienic Tools', 'Expert Staff', 'Premium Products', 'Clean & Safe'].map((f, i) => (
                <View key={i} style={s.featureRow}>
                  <Text style={{ fontSize: 12 }}>🛡</Text>
                  <Text style={{ fontSize: 11, color: '#64748B' }}>{f}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Tabs */}
        <View style={s.tabs}>
          {TABS.map((t, i) => (
            <TouchableOpacity key={t} style={[s.tab, i === activeTab && s.tabActive]} onPress={() => setActiveTab(i)}>
              <Text style={[s.tabText, i === activeTab && s.tabTextActive]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Services */}
        {activeTab === 0 && (
          <View style={s.servicesBlock}>
            <Text style={s.servicesTitle}>Featured Services</Text>
            <View style={s.servicesGrid}>
              {services.map(sv => (
                <TouchableOpacity key={sv.id} style={s.serviceCard} activeOpacity={0.85}>
                  <View style={s.serviceImgBox}>
                    <Text style={{ fontSize: 28, opacity: 0.5 }}>{isMens ? '✂️' : '💆'}</Text>
                  </View>
                  <Text style={s.serviceName}>{sv.name}</Text>
                  <View style={s.serviceBottom}>
                    <Text style={s.servicePrice}>₹{sv.price}</Text>
                    <TouchableOpacity style={s.addBtn}><Text style={{ fontSize: 18, color: BLUE }}>⊕</Text></TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* Live queue notice */}
        <View style={s.queueNotice}>
          <Text style={{ fontSize: 18 }}>🔔</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>Live Queue Updates</Text>
            <Text style={{ fontSize: 11, color: '#64748B' }}>We'll notify you when it's your turn.</Text>
          </View>
          <TouchableOpacity><Text style={{ fontSize: 12, color: BLUE, fontWeight: '600' }}>How it works? ⓘ</Text></TouchableOpacity>
        </View>
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* Sticky CTA */}
      <View style={[s.cta, { paddingBottom: insets.bottom + 8 }]}>
        <Text style={{ fontSize: 11, color: '#64748B' }}>🛡 Fast, Easy & Secure Booking</Text>
        <TouchableOpacity style={s.bookBtn} onPress={() => navigation.navigate('TokenBooking', { salon, type })}>
          <Text style={s.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  heroImg: { height: 240, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  heroEmoji: { fontSize: 72, opacity: 0.2 },
  backBtn: { position: 'absolute', top: 16, left: 16, width: 38, height: 38, borderRadius: 19, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  heroActions: { position: 'absolute', top: 16, right: 16, flexDirection: 'row', gap: 8 },
  heroActionBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', elevation: 4 },
  photoCount: { position: 'absolute', bottom: 12, right: 12, backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  infoBlock: { padding: 16, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  infoTop: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 8 },
  salonName: { fontSize: 20, fontWeight: '800', color: '#0F172A' },
  ratingBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  ratingText: { fontSize: 12, color: '#166534', fontWeight: '700' },
  openBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#22C55E', borderRadius: 10, padding: 8, gap: 6 },
  openDot: { fontSize: 14, color: '#22C55E' },
  openText: { fontSize: 12, fontWeight: '700', color: '#22C55E' },
  openTime: { fontSize: 10, color: '#64748B' },
  address: { fontSize: 12, color: '#64748B', lineHeight: 18, marginBottom: 14 },
  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF', borderRadius: 14, padding: 12, marginBottom: 14 },
  statItem: { flex: 1, alignItems: 'center' },
  statIcon: { fontSize: 16, marginBottom: 4 },
  statNum: { fontSize: 13, fontWeight: '800', color: '#22C55E', textAlign: 'center', marginBottom: 2 },
  statLabel: { fontSize: 10, color: '#64748B', textAlign: 'center', lineHeight: 14 },
  statDivider: { width: 1, height: 40, backgroundColor: '#E2E8F0' },
  aboutBlock: { flexDirection: 'row', gap: 12 },
  aboutTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 6 },
  aboutText: { fontSize: 12, color: '#64748B', lineHeight: 18, marginBottom: 6 },
  featuresBlock: { gap: 6 },
  featureRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF', borderRadius: 8, padding: 6, gap: 6 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0', backgroundColor: '#fff' },
  tab: { flex: 1, paddingVertical: 12, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: BLUE },
  tabText: { fontSize: 13, color: '#64748B', fontWeight: '500' },
  tabTextActive: { color: BLUE, fontWeight: '700' },
  servicesBlock: { padding: 16 },
  servicesTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  servicesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  serviceCard: { width: (width - 42) / 2, backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  serviceImgBox: { height: 90, backgroundColor: '#F8FAFF', alignItems: 'center', justifyContent: 'center' },
  serviceName: { fontSize: 13, fontWeight: '600', color: '#0F172A', padding: 10, paddingBottom: 4 },
  serviceBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 10, paddingBottom: 10 },
  servicePrice: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  addBtn: { width: 32, height: 32, alignItems: 'center', justifyContent: 'center' },
  queueNotice: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0FDF4', marginHorizontal: 16, borderRadius: 14, padding: 14, gap: 12, borderWidth: 1, borderColor: '#BBF7D0' },
  cta: { backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E2E8F0', elevation: 12 },
  bookBtn: { width: '100%', backgroundColor: BLUE, borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 8, elevation: 6 },
  bookBtnText: { fontSize: 16, fontWeight: '700', color: '#fff' },
});
