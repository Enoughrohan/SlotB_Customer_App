import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

const TABS = ['All','Upcoming','In Progress','Completed','Cancelled'];
const BOOKINGS = [
  { id:'1', name: "Women's Hair Spa", provider: 'Lakme Salon, Begusarai', date: '12 May 2025, Mon', time: '05:30 PM', price: 699, bookingId: '#SLTB12567', status: 'Upcoming', statusColor: '#22C55E', emoji: '💆' },
  { id:'2', name: 'Electrician Service', provider: 'Sharma Electrical Services', date: '11 May 2025, Sun', time: '11:00 AM', price: 249, bookingId: '#SLTB12489', status: 'In Progress', statusColor: '#F59E0B', emoji: '⚡' },
  { id:'3', name: 'Home Cleaning', provider: 'Clean & Shine Services', date: '08 May 2025, Thu', time: '10:00 AM', price: 799, bookingId: '#SLTB12234', status: 'Completed', statusColor: '#1A47E8', emoji: '🧹' },
  { id:'4', name: 'Geyser Repair', provider: 'QuickFix Appliances', date: '05 May 2025, Mon', time: '04:00 PM', price: 399, bookingId: '#SLTB12109', status: 'Completed', statusColor: '#1A47E8', emoji: '🔧' },
  { id:'5', name: 'Pest Control', provider: 'SafeHome Pest Control', date: '02 May 2025, Fri', time: '02:00 PM', price: 699, bookingId: '#SLTB11967', status: 'Cancelled', statusColor: '#EF4444', emoji: '🐛' },
];

export default function MyBookingsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const insets = useSafeAreaInsets();

  const filtered = activeTab === 0 ? BOOKINGS : BOOKINGS.filter(b => b.status === TABS[activeTab]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={s.card} activeOpacity={0.9}>
      <View style={s.cardMain}>
        <View style={[s.iconCircle, { backgroundColor: BLUE + '15' }]}>
          <Text style={{ fontSize: 22 }}>{item.emoji}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={s.cardTop}>
            <Text style={s.cardName}>{item.name}</Text>
            <View style={[s.statusBadge, { backgroundColor: item.statusColor + '20' }]}>
              <Text style={[s.statusText, { color: item.statusColor }]}>{item.status}</Text>
            </View>
          </View>
          <Text style={s.cardProvider}>{item.provider}</Text>
          <View style={s.cardMeta}>
            <Text style={s.metaText}>📅 {item.date}</Text>
            <Text style={s.metaText}>⏰ {item.time}</Text>
          </View>
          <View style={s.cardBottom}>
            <View>
              <Text style={s.price}>₹{item.price}</Text>
              <Text style={s.bookingId}>Booking ID: {item.bookingId}</Text>
            </View>
            {item.status === 'Upcoming' && (
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <TouchableOpacity style={s.outlineBtn}><Text style={s.outlineBtnText}>Reschedule</Text></TouchableOpacity>
                <TouchableOpacity style={s.cancelBtn}><Text style={s.cancelBtnText}>Cancel</Text></TouchableOpacity>
              </View>
            )}
            {item.status === 'Completed' && (
              <TouchableOpacity style={s.bookAgainBtn}><Text style={s.bookAgainText}>Book Again</Text></TouchableOpacity>
            )}
          </View>
        </View>
        <Text style={{ fontSize: 16, color: '#94A3B8', alignSelf: 'flex-start', marginTop: 2 }}>›</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: '#fff', fontSize: 18 }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>My Bookings</Text>
        <TouchableOpacity><Text style={{ color: '#fff', fontSize: 18 }}>🔍</Text></TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={s.tabsWrapper}>
        <FlatList data={TABS} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[s.tab, index === activeTab && s.tabActive]} onPress={() => setActiveTab(index)}>
              <Text style={[s.tabText, index === activeTab && s.tabTextActive]}>{item}</Text>
            </TouchableOpacity>
          )} />
      </View>

      {/* Info banner */}
      <View style={s.infoBanner}>
        <View style={s.infoIcon}><Text style={{ fontSize: 16 }}>📋</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.infoTitle}>Manage all your service bookings in one place</Text>
          <Text style={s.infoSub}>Track, reschedule or cancel your bookings easily.</Text>
        </View>
        <TouchableOpacity><Text style={{ fontSize: 16, color: '#94A3B8' }}>✕</Text></TouchableOpacity>
      </View>

      <FlatList data={filtered} keyExtractor={i => i.id} renderItem={renderItem}
        contentContainerStyle={{ padding: 12, gap: 10, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false} />

      {/* Support footer */}
      <View style={s.supportBar}>
        <Text style={{ fontSize: 16 }}>🎧</Text>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 12, fontWeight: '600', color: '#0F172A' }}>Need help with your booking?</Text>
          <Text style={{ fontSize: 11, color: '#64748B' }}>Our support team is here to help you.</Text>
        </View>
        <TouchableOpacity style={s.supportBtn}><Text style={{ fontSize: 12, color: BLUE, fontWeight: '600' }}>🎧 Contact Support</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: BLUE, paddingHorizontal: 16, paddingVertical: 14 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },
  tabsWrapper: { backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F1F5F9' },
  tabActive: { backgroundColor: '#fff', borderWidth: 2, borderColor: BLUE },
  tabText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  tabTextActive: { color: BLUE, fontWeight: '700' },
  infoBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', margin: 12, borderRadius: 12, padding: 12, gap: 10 },
  infoIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  infoTitle: { fontSize: 12, fontWeight: '700', color: BLUE },
  infoSub: { fontSize: 11, color: '#64748B' },
  card: { backgroundColor: '#fff', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#E2E8F0' },
  cardMain: { flexDirection: 'row', gap: 10 },
  iconCircle: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  cardTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 3 },
  cardName: { fontSize: 14, fontWeight: '700', color: '#0F172A', flex: 1 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  statusText: { fontSize: 11, fontWeight: '700' },
  cardProvider: { fontSize: 12, color: '#64748B', marginBottom: 6 },
  cardMeta: { flexDirection: 'row', gap: 12, marginBottom: 8 },
  metaText: { fontSize: 11, color: '#64748B' },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  price: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  bookingId: { fontSize: 10, color: '#94A3B8' },
  outlineBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: BLUE },
  outlineBtnText: { fontSize: 11, color: BLUE, fontWeight: '600' },
  cancelBtn: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#EF4444' },
  cancelBtnText: { fontSize: 11, color: '#EF4444', fontWeight: '600' },
  bookAgainBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: BLUE },
  bookAgainText: { fontSize: 12, color: BLUE, fontWeight: '600' },
  supportBar: { flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0' },
  supportBtn: { paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10, borderWidth: 1, borderColor: BLUE },
});
