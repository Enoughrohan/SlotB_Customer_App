import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

const METHODS = [
  { id:'upi', icon:'⚡', label:'UPI', sub:'Pay using any UPI app' },
  { id:'card', icon:'💳', label:'Debit / Credit Card', sub:'Visa, Mastercard, RuPay' },
  { id:'paytm', icon:'💙', label:'Paytm', sub:'Pay using your Paytm account' },
  { id:'gpay', icon:'🌈', label:'Google Pay', sub:'Pay using Google Pay' },
  { id:'phonepe', icon:'💜', label:'PhonePe', sub:'Pay using PhonePe' },
  { id:'netbanking', icon:'🏦', label:'Net Banking', sub:'Pay using your bank' },
];

export default function PaymentScreen({ navigation, route }: any) {
  const [selected, setSelected] = useState('upi');
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.navigate('BookingConfirmed'); }, 1500);
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Payment</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Booking summary */}
        <View style={s.summaryCard}>
          <Text style={s.summaryTitle}>Booking Summary</Text>
          <View style={s.summaryRow}>
            <View style={s.summaryIcon}><Text style={{ fontSize: 24 }}>🧹</Text></View>
            <View style={{ flex: 1 }}>
              <Text style={s.summaryName}>Home Cleaning</Text>
              <Text style={s.summaryMeta}>📅 18 May 2025, 10:00 AM</Text>
              <Text style={s.summaryMeta}>📍 Bandra West, Mumbai</Text>
            </View>
            <View>
              <Text style={s.summaryPrice}>₹499</Text>
              <TouchableOpacity><Text style={{ fontSize: 11, color: BLUE, fontWeight: '600' }}>View Details</Text></TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Payment methods */}
        <Text style={s.sectionTitle}>Select Payment Method</Text>
        {METHODS.map(m => (
          <TouchableOpacity key={m.id} style={[s.methodRow, selected === m.id && s.methodRowActive]} onPress={() => setSelected(m.id)}>
            <View style={[s.radio, selected === m.id && s.radioActive]}>
              {selected === m.id && <View style={s.radioDot} />}
            </View>
            <Text style={{ fontSize: 20 }}>{m.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text style={s.methodLabel}>{m.label}</Text>
              <Text style={s.methodSub}>{m.sub}</Text>
            </View>
            <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
          </TouchableOpacity>
        ))}

        {/* Coupon */}
        <TouchableOpacity style={s.couponRow}>
          <Text style={{ fontSize: 18 }}>🏷</Text>
          <View style={{ flex: 1 }}>
            <Text style={s.couponTitle}>Have a coupon?</Text>
            <Text style={s.couponSub}>Apply coupon to get exciting discounts</Text>
          </View>
          <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Pay CTA */}
      <View style={[s.payBar, { paddingBottom: insets.bottom + 8 }]}>
        <View>
          <Text style={{ fontSize: 12, color: '#64748B' }}>Total Amount</Text>
          <Text style={{ fontSize: 20, fontWeight: '800', color: '#0F172A' }}>₹499</Text>
        </View>
        <TouchableOpacity style={s.payBtn} onPress={handlePay}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.payBtnText}>Pay Now</Text>}
        </TouchableOpacity>
      </View>
      <Text style={{ textAlign: 'center', fontSize: 11, color: '#94A3B8', paddingBottom: 8 }}>🔒 You will be securely redirected to complete the payment</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  summaryCard: { backgroundColor: '#fff', borderRadius: 14, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  summaryTitle: { fontSize: 14, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  summaryIcon: { width: 52, height: 52, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  summaryName: { fontSize: 14, fontWeight: '700', color: '#0F172A' },
  summaryMeta: { fontSize: 11, color: '#64748B', marginTop: 2 },
  summaryPrice: { fontSize: 16, fontWeight: '800', color: '#0F172A', textAlign: 'right' },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A', marginBottom: 10 },
  methodRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, padding: 14, marginBottom: 8, gap: 12, borderWidth: 1.5, borderColor: '#E2E8F0' },
  methodRowActive: { borderColor: BLUE, backgroundColor: '#FAFCFF' },
  radio: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  radioActive: { borderColor: BLUE },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: BLUE },
  methodLabel: { fontSize: 14, fontWeight: '600', color: '#0F172A' },
  methodSub: { fontSize: 11, color: '#64748B', marginTop: 2 },
  couponRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', borderRadius: 14, padding: 14, gap: 12, borderWidth: 1.5, borderColor: '#BFDBFE', borderStyle: 'dashed', marginTop: 4 },
  couponTitle: { fontSize: 13, fontWeight: '700', color: BLUE },
  couponSub: { fontSize: 11, color: '#64748B' },
  payBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: '#E2E8F0', elevation: 12 },
  payBtn: { backgroundColor: BLUE, borderRadius: 14, paddingVertical: 14, paddingHorizontal: 32, elevation: 6 },
  payBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
