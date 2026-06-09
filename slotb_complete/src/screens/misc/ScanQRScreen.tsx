import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, StatusBar, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';
const FRAME = width * 0.65;

export default function ScanQRScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [torch, setTorch] = useState(false);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A1A" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ color: '#fff', fontSize: 18 }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Scan QR</Text>
        <View style={{ flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity onPress={() => setTorch(!torch)}>
            <Text style={{ fontSize: 20, opacity: torch ? 1 : 0.5 }}>⚡</Text>
          </TouchableOpacity>
          <TouchableOpacity><Text style={{ fontSize: 20 }}>🖼</Text></TouchableOpacity>
        </View>
      </View>

      {/* Instruction */}
      <Text style={s.instruction}>Place QR code within the frame</Text>
      <Text style={s.instructionSub}>It will be scanned automatically</Text>

      {/* Camera area */}
      <View style={s.cameraArea}>
        {/* Scan frame */}
        <View style={s.scanFrame}>
          {/* Corner markers */}
          <View style={[s.corner, { top: -2, left: -2, borderTopWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[s.corner, { top: -2, right: -2, borderTopWidth: 4, borderRightWidth: 4 }]} />
          <View style={[s.corner, { bottom: -2, left: -2, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[s.corner, { bottom: -2, right: -2, borderBottomWidth: 4, borderRightWidth: 4 }]} />

          {/* Scanning line */}
          <View style={s.scanLine} />

          {/* Center slotb label */}
          <View style={s.centerLabel}>
            <Text style={{ fontSize: 13, fontWeight: '800', color: BLUE }}>slotb</Text>
          </View>

          {/* QR icon */}
          <Text style={s.qrIcon}>▪▪▪{'\n'}▪ ▪{'\n'}▪▪▪</Text>
        </View>
      </View>

      {/* Bottom controls */}
      <View style={s.bottomBar}>
        <TouchableOpacity style={s.torchBtn} onPress={() => setTorch(!torch)}>
          <Text style={{ fontSize: 22 }}>🔦</Text>
          <Text style={{ fontSize: 12, color: '#fff', marginTop: 4 }}>Torch</Text>
        </TouchableOpacity>
      </View>

      <View style={s.enterCodeRow}>
        <TouchableOpacity style={s.enterCodeBtn}>
          <Text style={{ fontSize: 18 }}>⌨</Text>
          <Text style={s.enterCodeText}>Enter Code</Text>
        </TouchableOpacity>
      </View>

      {/* Tab bar */}
      <View style={[s.tabBar, { paddingBottom: insets.bottom + 8 }]}>
        {[
          { icon: '🏠', label: 'Home', screen: 'Home' },
          { icon: '🧭', label: 'Explore', screen: 'Search' },
        ].map(t => (
          <TouchableOpacity key={t.label} style={s.tabItem} onPress={() => navigation.navigate(t.screen)}>
            <Text style={{ fontSize: 22, opacity: 0.6 }}>{t.icon}</Text>
            <Text style={[s.tabLabel, { color: '#888' }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={s.qrPill}>
          <Text style={{ fontSize: 20, color: '#fff' }}>⬛</Text>
        </TouchableOpacity>
        {[
          { icon: '📋', label: 'Bookings', screen: 'Bookings' },
          { icon: '👤', label: 'Profile', screen: 'Profile' },
        ].map(t => (
          <TouchableOpacity key={t.label} style={s.tabItem} onPress={() => navigation.navigate(t.screen)}>
            <Text style={{ fontSize: 22, opacity: 0.6 }}>{t.icon}</Text>
            <Text style={[s.tabLabel, { color: '#888' }]}>{t.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0A0A1A' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 14 },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#fff' },
  instruction: { fontSize: 15, fontWeight: '600', color: '#fff', textAlign: 'center', marginTop: 12 },
  instructionSub: { fontSize: 12, color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: 4 },
  cameraArea: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanFrame: { width: FRAME, height: FRAME, alignItems: 'center', justifyContent: 'center', position: 'relative', borderRadius: 16, overflow: 'hidden', backgroundColor: 'rgba(255,255,255,0.05)' },
  corner: { position: 'absolute', width: 28, height: 28, borderColor: BLUE, borderRadius: 4 },
  scanLine: { position: 'absolute', left: 0, right: 0, height: 2.5, backgroundColor: BLUE, top: '45%', shadowColor: BLUE, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 8, elevation: 8 },
  centerLabel: { position: 'absolute', bottom: 16, backgroundColor: 'rgba(26,71,232,0.2)', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 8 },
  qrIcon: { fontSize: 48, color: 'rgba(255,255,255,0.15)', textAlign: 'center', lineHeight: 52 },
  bottomBar: { alignItems: 'center', paddingVertical: 16 },
  torchBtn: { alignItems: 'center', width: 56, height: 56, borderRadius: 28, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center' },
  enterCodeRow: { paddingHorizontal: 32, paddingBottom: 12 },
  enterCodeBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 14, paddingVertical: 14, gap: 10 },
  enterCodeText: { fontSize: 14, fontWeight: '600', color: BLUE },
  tabBar: { flexDirection: 'row', backgroundColor: '#1A1A2E', borderTopWidth: 1, borderTopColor: '#2E2E4E', paddingTop: 10, alignItems: 'center', justifyContent: 'space-around' },
  tabItem: { alignItems: 'center', flex: 1, gap: 2 },
  tabLabel: { fontSize: 10 },
  qrPill: { width: 54, height: 54, borderRadius: 27, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: -18, elevation: 10 },
});
