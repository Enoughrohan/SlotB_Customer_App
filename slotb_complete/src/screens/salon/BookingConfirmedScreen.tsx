import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

export default function BookingConfirmedScreen({ navigation, route }: any) {
  const salon = route?.params?.salon || { name: 'Be 4 U Salon', address: '3rd Floor, Shri Ratan Tower, Kachahari Road, Begusarai', queue: 5, wait: '10-15', nextSlot: '5:30 PM' };
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingBottom: insets.bottom + 16 }]}>
      <TouchableOpacity style={s.closeBtn} onPress={() => navigation.replace('Main')}><Text style={{ fontSize: 18, color: '#64748B' }}>✕</Text></TouchableOpacity>
      {/* Confetti */}
      <View style={s.confetti}>
        {['🟦','🟨','🟥','🟩','🟪','🟦','🟨','🟥','🟩'].map((c,i) => (
          <Text key={i} style={[s.confettiPiece, { top: 20 + (i*15)%60, left: 20 + (i*40)%260, transform:[{rotate: `${i*25}deg`}] }]}>{c}</Text>
        ))}
      </View>
      {/* Check */}
      <View style={s.checkCircle}><Text style={{ fontSize: 40, color: '#fff' }}>✓</Text></View>
      <Text style={s.title}>Booking Confirmed!</Text>
      <Text style={s.subtitle}>You're all set 🎉</Text>

      {/* Salon card */}
      <View style={s.card}>
        <View style={s.cardImg}><Text style={{ fontSize: 24 }}>✂️</Text></View>
        <View style={{ flex: 1 }}>
          <Text style={s.cardName}>{salon.name}</Text>
          <Text style={s.cardAddr} numberOfLines={2}>📍 {salon.address}</Text>
        </View>
      </View>

      {/* Info rows */}
      {[
        { icon: '👥', label: 'Your Queue', val: `${salon.queue} Customers Ahead`, color: '#22C55E' },
        { icon: '⏰', label: 'Estimated Wait Time', val: `${salon.wait} min`, color: BLUE },
        { icon: '📅', label: 'Your Slot', val: `Today, ${salon.nextSlot}`, color: '#8B5CF6' },
      ].map((row, i) => (
        <View key={i} style={s.infoRow}>
          <Text style={{ fontSize: 20 }}>{row.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, color: '#64748B' }}>{row.label}</Text>
            <Text style={[s.infoVal, { color: row.color }]}>{row.val}</Text>
          </View>
        </View>
      ))}

      {/* Notify */}
      <View style={s.notifyBanner}>
        <Text style={{ fontSize: 18 }}>🔔</Text>
        <Text style={{ fontSize: 13, color: '#64748B', flex: 1 }}>We will notify you when it's your turn!</Text>
      </View>

      {/* CTA */}
      <TouchableOpacity style={s.primaryBtn} onPress={() => navigation.navigate('TokenBooking', { salon })}>
        <Text style={s.primaryBtnText}>Track My Queue</Text>
        <Text style={s.primaryBtnArrow}>→</Text>
      </TouchableOpacity>
      <TouchableOpacity style={s.secondaryBtn} onPress={() => navigation.navigate('Bookings')}>
        <Text style={s.secondaryBtnText}>View My Booking</Text>
      </TouchableOpacity>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 24, alignItems: 'center', justifyContent: 'center' },
  closeBtn: { position: 'absolute', top: 20, right: 20, width: 36, height: 36, borderRadius: 18, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  confetti: { position: 'absolute', top: 0, left: 0, right: 0, height: 120 },
  confettiPiece: { position: 'absolute', fontSize: 10 },
  checkCircle: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#22C55E', alignItems: 'center', justifyContent: 'center', marginBottom: 16, elevation: 6 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#64748B', marginBottom: 20 },
  card: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#F8FAFF', borderRadius: 14, padding: 14, gap: 12, marginBottom: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  cardImg: { width: 60, height: 56, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  cardName: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  cardAddr: { fontSize: 11, color: '#64748B', marginTop: 2 },
  infoRow: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#F8FAFF', borderRadius: 14, padding: 14, gap: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  infoVal: { fontSize: 16, fontWeight: '800' },
  notifyBanner: { flexDirection: 'row', alignItems: 'center', width: '100%', backgroundColor: '#EEF2FF', borderRadius: 14, padding: 14, gap: 12, marginBottom: 16, borderWidth: 1, borderColor: '#BFDBFE' },
  primaryBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A47E8', borderRadius: 14, paddingVertical: 15, width: '100%', gap: 8, elevation: 6, marginBottom: 10 },
  primaryBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  primaryBtnArrow: { width: 28, height: 28, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.25)', textAlign: 'center', lineHeight: 28, color: '#fff', fontWeight: '700', overflow: 'hidden' },
  secondaryBtn: { paddingVertical: 10 },
  secondaryBtnText: { fontSize: 14, color: '#1A47E8', fontWeight: '600', textAlign: 'center' },
});
