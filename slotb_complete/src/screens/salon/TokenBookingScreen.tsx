import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

export default function TokenBookingScreen({ navigation, route }: any) {
  const salon = route?.params?.salon || { name: 'Be 4 U Salon', queue: 5, wait: '10-15', nextSlot: '5:30 PM' };
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: '#fff', fontSize: 18 }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Booking Details</Text>
        <TouchableOpacity><Text style={{ color: '#fff', fontSize: 18 }}>⋮</Text></TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, gap: 14 }}>
        {/* Salon card */}
        <View style={s.salonCard}>
          <View style={s.salonImg}><Text style={{ fontSize: 28 }}>✂️</Text></View>
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={s.salonName}>{salon.name}</Text>
              <View style={s.ratingBadge}><Text style={{ fontSize: 11, color: '#166534', fontWeight: '700' }}>★ 4.8</Text></View>
            </View>
            <Text style={{ fontSize: 11, color: '#64748B', marginTop: 2 }}>📍 Begusarai, Bihar</Text>
          </View>
        </View>

        {/* Serving now */}
        <View style={s.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <View style={s.greenDot} />
            <Text style={{ fontSize: 12, color: '#64748B' }}>Serving Now</Text>
          </View>
          <Text style={[s.bigNum, { color: '#22C55E' }]}>Token #18</Text>
        </View>

        {/* Your token */}
        <View style={s.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 16 }}>🎟</Text>
            <Text style={{ fontSize: 12, color: '#64748B' }}>Your Token</Text>
          </View>
          <Text style={[s.bigNum, { color: BLUE }]}>#26</Text>
        </View>

        {/* Wait time */}
        <View style={s.infoCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <Text style={{ fontSize: 16 }}>⏰</Text>
            <Text style={{ fontSize: 12, color: '#64748B' }}>Estimated Wait</Text>
          </View>
          <Text style={[s.bigNum, { color: BLUE }]}>42 Minutes</Text>
        </View>

        {/* Progress bar */}
        <View style={s.progressCard}>
          <View style={s.progressBar}>
            <View style={[s.progressFill, { width: '35%' }]} />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: '#22C55E' }}>18</Text>
              <Text style={{ fontSize: 10, color: '#64748B' }}>Now Serving</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 13, fontWeight: '800', color: BLUE }}>26</Text>
              <Text style={{ fontSize: 10, color: '#64748B' }}>Your Token</Text>
            </View>
          </View>
        </View>

        {/* Queue info */}
        <TouchableOpacity style={s.queueCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={s.queueIcon}><Text style={{ fontSize: 16 }}>👥</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 13, fontWeight: '700', color: '#0F172A' }}>You are 8th in queue</Text>
              <Text style={{ fontSize: 11, color: '#64748B' }}>7 people ahead of you</Text>
            </View>
            <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
          </View>
        </TouchableOpacity>

        {/* Notify */}
        <View style={s.notifyCard}>
          <Text style={{ fontSize: 16 }}>🔔</Text>
          <Text style={{ fontSize: 12, color: '#64748B', flex: 1 }}>We will notify you when it's almost your turn.</Text>
        </View>

        {/* Cancel */}
        <TouchableOpacity style={s.cancelBtn}>
          <Text style={{ fontSize: 14, color: '#EF4444', fontWeight: '700' }}>Cancel Booking</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  salonCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, gap: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  salonImg: { width: 70, height: 60, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  salonName: { fontSize: 15, fontWeight: '800', color: '#0F172A' },
  ratingBadge: { backgroundColor: '#DCFCE7', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
  infoCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  greenDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#22C55E' },
  bigNum: { fontSize: 28, fontWeight: '900' },
  progressCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  progressBar: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#22C55E', borderRadius: 4 },
  queueCard: { backgroundColor: '#EEF2FF', borderRadius: 14, padding: 14, borderWidth: 1, borderColor: '#BFDBFE' },
  queueIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  notifyCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF', borderRadius: 14, padding: 14, gap: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  cancelBtn: { borderWidth: 1.5, borderColor: '#EF4444', borderRadius: 14, paddingVertical: 14, alignItems: 'center' },
});
