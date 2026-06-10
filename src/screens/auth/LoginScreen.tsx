import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Dimensions, StatusBar, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

export default function LoginScreen({ navigation }: any) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();

  const handleContinue = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); navigation.navigate('OtpVerify', { phone: '98765 43210' }); }, 1000);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={s.scroll} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={s.logoRow}>
          <Text style={s.logoBlue}>Slot</Text><Text style={s.logoOrange}>b</Text>
        </View>
        <Text style={s.tagline}><Text style={{ color: BLUE, fontWeight: '600' }}>Fast Booking. </Text><Text style={{ color: '#F97316', fontWeight: '600' }}>Zero Waiting.</Text></Text>

        {/* Illustration */}
        <View style={s.illuBox}>
          <Icon name="calendar-month-outline" size={24} color={BLUE} style={[s.floatIcon, { top: 12, left: 16 }]} />
          <Icon name="clock-outline" size={24} color="#F97316" style={[s.floatIcon, { top: 12, right: 16 }]} />
          <View style={s.phoneMock}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>Booking{'\n'}Confirmed!</Text>
            <View style={s.checkCircle}><Icon name="check" size={16} color="#fff" /></View>
          </View>
        </View>

        {/* Welcome */}
        <Text style={s.welcome}>Welcome Back 👋</Text>
        <Text style={s.subtitle}>Book appointments, services and slots in seconds.</Text>

        {/* Phone input */}
        <View style={s.inputRow}>
          <View style={s.flagBox}>
            <Text style={{ fontSize: 18 }}>🇮🇳</Text>
            <Text style={{ fontSize: 10, color: '#64748B', marginLeft: 2 }}>▾</Text>
            <View style={{ width: 1, height: 20, backgroundColor: '#E2E8F0', marginHorizontal: 8 }} />
            <Text style={{ fontSize: 14, fontWeight: '600', color: '#0F172A' }}>+91</Text>
          </View>
          <Text style={{ flex: 1, fontSize: 14, color: '#94A3B8', paddingVertical: 14, paddingRight: 12 }}>Enter Mobile Number</Text>
        </View>

        {/* Continue */}
        <Animated.View style={{ transform: [{ scale }] }}>
          <TouchableOpacity style={s.btn} onPress={handleContinue} onPressIn={onPressIn} onPressOut={onPressOut} activeOpacity={1}>
            {loading ? <ActivityIndicator color="#fff" /> : <><Text style={s.btnText}>Continue</Text><Icon name="arrow-right" size={18} color="#fff" /></>}
          </TouchableOpacity>
        </Animated.View>

        {/* OR */}
        <View style={s.orRow}>
          <View style={s.orLine} /><Text style={{ fontSize: 12, color: '#64748B' }}>OR</Text><View style={s.orLine} />
        </View>

        {/* Google */}
        <TouchableOpacity style={s.googleBtn}>
          <Icon name="google" size={18} color="#4285F4" />
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#0F172A' }}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginTop: 16, marginBottom: 12 }} onPress={() => navigation.replace('Main')}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
            <Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>Skip for now</Text>
            <Icon name="arrow-right" size={14} color={BLUE} />
          </View>
        </TouchableOpacity>
        <Text style={{ fontSize: 11, color: '#64748B', textAlign: 'center' }}>By continuing, you agree to <Text style={{ color: BLUE, fontWeight: '600' }}>Terms</Text> & <Text style={{ color: BLUE, fontWeight: '600' }}>Privacy Policy</Text></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  scroll: { paddingHorizontal: 24, paddingTop: 48, paddingBottom: 32, alignItems: 'center' },
  logoRow: { flexDirection: 'row', marginBottom: 4 },
  logoBlue: { fontSize: 40, fontWeight: '900', color: '#1A47E8', letterSpacing: -1 },
  logoOrange: { fontSize: 40, fontWeight: '900', color: '#F97316', letterSpacing: -1 },
  tagline: { fontSize: 13, marginBottom: 20 },
  illuBox: { width: width - 48, height: 180, backgroundColor: '#EEF2FF', borderRadius: 20, marginBottom: 24, alignItems: 'center', justifyContent: 'center' },
  floatIcon: { position: 'absolute', fontSize: 20, opacity: 0.3 },
  phoneMock: { width: 90, height: 120, backgroundColor: '#1C1C2E', borderRadius: 14, alignItems: 'center', justifyContent: 'center', padding: 10 },
  checkCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#1A47E8', alignItems: 'center', justifyContent: 'center' },
  welcome: { fontSize: 24, fontWeight: '800', color: '#0F172A', alignSelf: 'flex-start', marginBottom: 6 },
  subtitle: { fontSize: 13, color: '#64748B', alignSelf: 'flex-start', marginBottom: 22, lineHeight: 19 },
  inputRow: { flexDirection: 'row', alignItems: 'center', width: '100%', borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 12, marginBottom: 14, backgroundColor: '#FAFAFA', overflow: 'hidden' },
  flagBox: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 14 },
  btn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A47E8', borderRadius: 14, paddingVertical: 15, width: width - 48, gap: 8, elevation: 6 },
  btnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
  btnArrow: { color: '#fff', fontSize: 17, fontWeight: '700' },
  orRow: { flexDirection: 'row', alignItems: 'center', width: '100%', marginVertical: 18, gap: 12 },
  orLine: { flex: 1, height: 1, backgroundColor: '#E2E8F0' },
  googleBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: width - 48, borderWidth: 1.5, borderColor: '#E2E8F0', borderRadius: 14, paddingVertical: 14, gap: 10 },
});
