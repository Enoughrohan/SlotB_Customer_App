import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
const BLUE = '#1A47E8';

export default function OtpVerifyScreen({ navigation, route }: any) {
  const phone = route?.params?.phone || '98765 43210';
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timer, setTimer] = useState(25);
  const [loading, setLoading] = useState(false);
  const refs = useRef<any[]>([]);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (timer <= 0) return;
    const t = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(t);
  }, [timer]);

  const handleChange = (val: string, i: number) => {
    const n = [...otp]; n[i] = val; setOtp(n);
    if (val && i < 5) refs.current[i + 1]?.focus();
  };
  const handleKey = (e: any, i: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[i] && i > 0) refs.current[i - 1]?.focus();
  };
  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.replace('Main'); }, 1200);
  };
  const isComplete = otp.join('').length === 6;

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.topBar}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Text style={{ fontSize: 13 }}>🛡</Text>
          <Text style={{ fontSize: 12, color: BLUE, fontWeight: '600' }}>Secure Verification</Text>
        </View>
      </View>
      <View style={s.content}>
        <Text style={s.title}>Verify your number</Text>
        <Text style={s.sub}>We've sent a 6-digit OTP to</Text>
        <View style={s.phoneChip}>
          <Text style={{ fontSize: 14 }}>📞</Text>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#0F172A', flex: 1 }}>+91 {phone}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 12, color: BLUE, fontWeight: '700' }}>Change</Text></TouchableOpacity>
        </View>
        <Text style={s.otpLabel}>Enter 6-digit OTP</Text>
        <View style={s.otpRow}>
          {Array(6).fill(0).map((_, i) => (
            <TextInput key={i} ref={r => (refs.current[i] = r)} style={[s.box, otp[i] ? s.boxFilled : null]} value={otp[i]} onChangeText={v => handleChange(v.slice(-1), i)} onKeyPress={e => handleKey(e, i)} keyboardType="number-pad" maxLength={1} autoFocus={i === 0} textAlign="center" selectionColor={BLUE} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <Text style={{ fontSize: 12, color: '#64748B' }}>🛡 OTP is valid for </Text>
          <Text style={{ fontSize: 12, color: BLUE, fontWeight: '700' }}>2:00 minutes</Text>
        </View>
        <TouchableOpacity style={[s.btn, !isComplete && s.btnDis]} onPress={handleVerify} disabled={!isComplete}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={s.btnText}>Verify & Continue</Text>}
        </TouchableOpacity>
        <View style={s.orRow}><View style={s.orLine} /><Text style={{ fontSize: 12, color: '#64748B' }}>or</Text><View style={s.orLine} /></View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 13, color: '#64748B' }}>↺ Didn't receive OTP? </Text>
          <TouchableOpacity onPress={() => setTimer(30)} disabled={timer > 0}>
            <Text style={{ fontSize: 13, color: timer > 0 ? '#64748B' : BLUE, fontWeight: '700' }}>{timer > 0 ? `Resend in 00:${String(timer).padStart(2,'0')}` : 'Resend Now'}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* City illustration */}
      <View style={s.city}>
        {[40,60,80,50,70,45,65,55,75].map((h, i) => (
          <View key={i} style={{ height: h, width: 20 + (i%3)*6, borderWidth: 1.5, borderColor: '#DBEAFE', borderBottomWidth: 0, borderRadius: 2 }} />
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  topBar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 16, paddingBottom: 8 },
  backBtn: { width: 40, height: 40, borderRadius: 10, borderWidth: 1.5, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 24 },
  title: { fontSize: 24, fontWeight: '800', color: '#0F172A', marginBottom: 6 },
  sub: { fontSize: 13, color: '#64748B', marginBottom: 10 },
  phoneChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, gap: 8, alignSelf: 'flex-start', marginBottom: 22 },
  otpLabel: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginBottom: 12 },
  otpRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  box: { flex: 1, height: 52, borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, fontSize: 20, fontWeight: '700', color: '#0F172A', backgroundColor: '#FAFAFA', textAlign: 'center' },
  boxFilled: { borderColor: '#1A47E8', backgroundColor: '#EEF2FF', color: '#1A47E8' },
  btn: { backgroundColor: '#1A47E8', borderRadius: 14, paddingVertical: 15, alignItems: 'center', elevation: 6 },
  btnDis: { backgroundColor: '#93AEED', elevation: 0 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  orRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 18, gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  city: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', gap: 3, paddingHorizontal: 8, opacity: 0.4 },
});
