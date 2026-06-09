import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const FILTERS = ['All', 'Open Now', 'Nearest', 'Top Rated', 'Under ₹200'];
const SALONS_MEN = [
  { id: '1', name: 'Be 4 U Salon', rating: 4.7, reviews: 128, address: '3rd Floor, Shri Ratan Tower, Kachahari Road, Begusarai', queue: 5, wait: '10-15', nextSlot: '5:30 PM', status: 'Low Wait', statusColor: '#22C55E', open: true },
  { id: '2', name: 'Hair by Sahil', rating: 4.6, reviews: 98, address: '1st Floor, Sri Ram Market, Begusarai', queue: 8, wait: '15-20', nextSlot: '4:45 PM', status: 'Moderate', statusColor: '#F59E0B', open: true },
  { id: '3', name: 'Naturals Salon', rating: 4.5, reviews: 215, address: '1st Floor, Annapurna Complex, Vishwanath Nagar, Begusarai', queue: 6, wait: '15-20', nextSlot: '4:20 PM', status: 'Moderate', statusColor: '#F59E0B', open: true },
  { id: '4', name: 'VLCC', rating: 4.4, reviews: 180, address: 'Mir Ganj, GD College Road, Vishwanath Nagar, Begusarai', queue: 3, wait: '5-10', nextSlot: '4:10 PM', status: 'Low Wait', statusColor: '#22C55E', open: true },
  { id: '5', name: 'The Jawed Habib Salon', rating: 4.6, reviews: 220, address: 'GD College Road / Kalisthan Road, Begusarai', queue: 9, wait: '20-30', nextSlot: '6:00 PM', status: 'Moderate', statusColor: '#F59E0B', open: true },
];
const SALONS_WOMEN = [
  { id: '1', name: 'Lakme Salon', rating: 4.8, reviews: 245, address: 'DAK Bungalow Road, Ratanpur, Begusarai', queue: 18, wait: '40-45', nextSlot: '5:30 PM', status: 'High Demand', statusColor: '#EF4444', open: true },
  { id: '2', name: 'The Jawed Habib Salons', rating: 4.6, reviews: 160, address: 'Kalpana Market, GD College Road, Begusarai', queue: 7, wait: '15-20', nextSlot: '4:45 PM', status: 'Moderate', statusColor: '#F59E0B', open: true },
  { id: '3', name: 'New Looks Unisex Saloon', rating: 4.5, reviews: 130, address: 'Near Mahila College, Kalisthan Road, Begusarai', queue: 2, wait: '5-10', nextSlot: '4:15 PM', status: 'Low Wait', statusColor: '#22C55E', open: true },
  { id: '4', name: 'Roshni Fresh Look', rating: 4.4, reviews: 95, address: 'Near Ambedkar Chowk (V Mart), Kachahari Road, Begusarai', queue: 24, wait: '55-60', nextSlot: '6:10 PM', status: 'High Demand', statusColor: '#EF4444', open: true },
  { id: '5', name: 'Aashi Singh Makeup Studio', rating: 4.9, reviews: 310, address: 'Asha Palace, Kalisthan Road, Begusarai', queue: 0, wait: '0', nextSlot: 'Available Now', status: 'No Wait', statusColor: '#22C55E', open: true },
];

export default function SalonListScreen({ navigation, route }: any) {
  const type = route?.params?.type || 'mens';
  const isMens = type === 'mens';
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState(0);
  const salons = isMens ? SALONS_MEN : SALONS_WOMEN;

  const renderSalon = ({ item }: any) => (
    <TouchableOpacity style={s.card} onPress={() => navigation.navigate('SalonDetail', { salon: item, type })} activeOpacity={0.9}>
      {/* Salon image placeholder */}
      <View style={s.imgBox}>
        <View style={[s.openBadge, { backgroundColor: item.open ? '#22C55E' : '#EF4444' }]}>
          <Text style={s.openText}>● {item.open ? 'Open' : 'Closed'}</Text>
        </View>
        <View style={[s.statusBadge, { backgroundColor: item.statusColor + '22', borderColor: item.statusColor }]}>
          <Text style={[s.statusText, { color: item.statusColor }]}>{item.status}</Text>
        </View>
        <Text style={s.imgEmoji}>{isMens ? '✂️' : '💅'}</Text>
      </View>

      <View style={s.cardBody}>
        <View style={s.cardTop}>
          <Text style={s.salonName}>{item.name}</Text>
          <View style={s.ratingBadge}><Text style={s.ratingText}>★ {item.rating}</Text></View>
        </View>
        <Text style={s.address} numberOfLines={2}>📍 {item.address}</Text>

        <View style={s.statsRow}>
          <View style={s.statBox}>
            <Text style={{ fontSize: 15, marginBottom: 2 }}>👥</Text>
            <Text style={s.statVal}>{item.queue}</Text>
            <Text style={s.statLabel}>Queue</Text>
          </View>
          <View style={s.statBox}>
            <Text style={{ fontSize: 15, marginBottom: 2 }}>⏰</Text>
            <Text style={s.statVal}>{item.wait} min</Text>
            <Text style={s.statLabel}>Wait Time</Text>
          </View>
          <TouchableOpacity style={s.bookBtn} onPress={() => navigation.navigate('SalonDetail', { salon: item, type })}>
            <Text style={s.bookBtnText}>Book Now ›</Text>
          </TouchableOpacity>
        </View>
        <Text style={s.nextSlot}>📅 Next: <Text style={{ color: BLUE, fontWeight: '700' }}>{item.nextSlot}</Text></Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* Header */}
      <View style={s.header}>
        <View style={s.headerTop}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={s.backBtn}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>←</Text>
          </TouchableOpacity>
          <View>
            <Text style={s.headerTitle}>{isMens ? "Men's Salon" : "Women's Parlour"}</Text>
            <Text style={s.headerSub}>📍 Begusarai, Bihar ▾</Text>
          </View>
          <TouchableOpacity style={s.bellBtn}>
            <Text style={{ fontSize: 16 }}>🔔</Text>
            <View style={s.bellDot} />
          </TouchableOpacity>
        </View>
        <View style={s.searchRow}>
          <View style={s.searchBar}>
            <Text style={{ fontSize: 14 }}>🔍</Text>
            <Text style={{ fontSize: 13, color: '#94A3B8', flex: 1 }}>Search salons...</Text>
          </View>
          <TouchableOpacity style={s.filterBtn}>
            <Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>⚙ Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Live queue banner */}
      <View style={s.queueBanner}>
        <View style={s.queueIcon}><Text style={{ fontSize: 16 }}>👥</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.queueTitle}>Live queue updates</Text>
          <Text style={s.queueSub}>See how many people are ahead before you book.</Text>
        </View>
        <Text style={{ fontSize: 16, color: BLUE }}>ℹ</Text>
      </View>

      {/* Filter chips */}
      <View style={{ backgroundColor: '#fff' }}>
        <FlatList data={FILTERS} horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 10, gap: 8 }}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[s.chip, index === activeFilter && s.chipActive]} onPress={() => setActiveFilter(index)}>
              <Text style={[s.chipText, index === activeFilter && s.chipTextActive]}>{item}</Text>
            </TouchableOpacity>
          )} />
      </View>

      {/* Salon list */}
      <FlatList data={salons} keyExtractor={i => i.id} renderItem={renderSalon}
        contentContainerStyle={{ padding: 12, gap: 12, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false} />

      {/* Bottom info */}
      <View style={s.bottomInfo}>
        <Text style={{ fontSize: 13 }}>🛡</Text>
        <Text style={{ fontSize: 11, color: '#64748B', flex: 1 }}>You will get a token and we will notify you when it's your turn.</Text>
        <TouchableOpacity><Text style={{ fontSize: 11, color: BLUE, fontWeight: '600' }}>How it works?</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { backgroundColor: BLUE, paddingHorizontal: 16, paddingTop: 12, paddingBottom: 14 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },
  headerSub: { fontSize: 11, color: 'rgba(255,255,255,0.85)' },
  bellBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginLeft: 'auto', position: 'relative' },
  bellDot: { position: 'absolute', top: 6, right: 7, width: 7, height: 7, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1.5, borderColor: BLUE },
  searchRow: { flexDirection: 'row', gap: 10, alignItems: 'center' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, gap: 8 },
  filterBtn: { backgroundColor: '#fff', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10 },
  queueBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', marginHorizontal: 12, marginTop: 8, borderRadius: 12, padding: 12, gap: 10 },
  queueIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  queueTitle: { fontSize: 13, fontWeight: '700', color: BLUE },
  queueSub: { fontSize: 11, color: '#64748B' },
  chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#fff' },
  chipActive: { backgroundColor: BLUE, borderColor: BLUE },
  chipText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  chipTextActive: { color: '#fff', fontWeight: '700' },
  card: { backgroundColor: '#fff', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  imgBox: { height: 140, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  imgEmoji: { fontSize: 52, opacity: 0.3 },
  openBadge: { position: 'absolute', top: 10, left: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
  openText: { fontSize: 11, color: '#fff', fontWeight: '700' },
  statusBadge: { position: 'absolute', top: 10, right: 10, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, borderWidth: 1 },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardBody: { padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  salonName: { fontSize: 15, fontWeight: '800', color: '#0F172A', flex: 1 },
  ratingBadge: { backgroundColor: '#FEF3C7', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  ratingText: { fontSize: 12, color: '#92400E', fontWeight: '700' },
  address: { fontSize: 11, color: '#64748B', marginBottom: 10, lineHeight: 16 },
  statsRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  statBox: { flex: 1, backgroundColor: '#F8FAFF', borderRadius: 10, padding: 8, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statVal: { fontSize: 13, fontWeight: '800', color: BLUE },
  statLabel: { fontSize: 10, color: '#64748B' },
  bookBtn: { flex: 1.2, backgroundColor: BLUE, borderRadius: 10, paddingVertical: 10, alignItems: 'center' },
  bookBtnText: { fontSize: 12, color: '#fff', fontWeight: '700' },
  nextSlot: { fontSize: 11, color: '#64748B' },
  bottomInfo: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
});
