import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

const CATEGORIES = [
  { icon: '📋', label: 'Booking\nIssue' },
  { icon: '💳', label: 'Payment' },
  { icon: '👷', label: 'Provider' },
  { icon: '👤', label: 'Account' },
  { icon: '❓', label: 'Other' },
];
const FAQS = [
  { q: 'How do I book a salon token?', a: 'Go to Men\'s Salon or Women\'s Parlour, select a salon, tap "Book Now" and confirm your token. You\'ll get notified when it\'s your turn.' },
  { q: 'Can I cancel my booking?', a: 'Yes, you can cancel from My Bookings screen up to 30 minutes before your scheduled time.' },
  { q: 'How do I track my service provider?', a: 'After booking confirmation, tap "Track" in My Bookings to see live location of your provider.' },
  { q: 'What if the provider doesn\'t show up?', a: 'Contact our support immediately. We\'ll either find a replacement or issue a full refund.' },
  { q: 'How are refunds processed?', a: 'Refunds are processed within 5-7 business days to your original payment method.' },
];

export default function HelpCentreScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState<number | null>(null);
  const [search, setSearch] = useState('');

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Help Centre</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {/* Search */}
        <View style={s.searchBar}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput style={s.searchInput} placeholder="Search your issue..." placeholderTextColor="#94A3B8" value={search} onChangeText={setSearch} />
        </View>

        {/* Categories */}
        <Text style={s.sectionTitle}>How can we help you?</Text>
        <View style={s.catRow}>
          {CATEGORIES.map((c, i) => (
            <TouchableOpacity key={i} style={s.catCard}>
              <Text style={{ fontSize: 28, marginBottom: 6 }}>{c.icon}</Text>
              <Text style={s.catLabel}>{c.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* FAQs */}
        <Text style={s.sectionTitle}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <TouchableOpacity key={i} style={s.faqCard} onPress={() => setExpanded(expanded === i ? null : i)}>
            <View style={s.faqHeader}>
              <Text style={s.faqQ} numberOfLines={expanded === i ? undefined : 1}>{faq.q}</Text>
              <Text style={{ fontSize: 16, color: BLUE, marginLeft: 8 }}>{expanded === i ? '▲' : '▼'}</Text>
            </View>
            {expanded === i && <Text style={s.faqA}>{faq.a}</Text>}
          </TouchableOpacity>
        ))}

        {/* Support buttons */}
        <View style={s.supportSection}>
          <Text style={s.sectionTitle}>Still need help?</Text>
          <TouchableOpacity style={s.supportBtn}>
            <Text style={{ fontSize: 20 }}>💬</Text>
            <Text style={s.supportBtnText}>Chat Support</Text>
            <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[s.supportBtn, { marginTop: 8 }]}>
            <Text style={{ fontSize: 20 }}>📞</Text>
            <Text style={s.supportBtnText}>Call Support</Text>
            <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, gap: 10, borderWidth: 1.5, borderColor: '#E2E8F0', marginBottom: 20 },
  searchInput: { flex: 1, fontSize: 14, color: '#0F172A', padding: 0 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  catRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  catCard: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  catLabel: { fontSize: 10, fontWeight: '600', color: '#64748B', textAlign: 'center' },
  faqCard: { backgroundColor: '#fff', borderRadius: 12, padding: 14, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  faqHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  faqQ: { flex: 1, fontSize: 13, fontWeight: '600', color: '#0F172A' },
  faqA: { fontSize: 12, color: '#64748B', lineHeight: 18, marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#F1F5F9' },
  supportSection: { marginTop: 8 },
  supportBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 14, gap: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  supportBtnText: { flex: 1, fontSize: 14, fontWeight: '600', color: '#0F172A' },
});
