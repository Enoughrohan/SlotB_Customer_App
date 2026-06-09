import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, StatusBar } from 'react-native';
const { width, height } = Dimensions.get('window');
const BLUE = '#1A47E8';

export default function SplashScreen({ navigation }: any) {
  const scale = useRef(new Animated.Value(0.6)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const taglineOp = useRef(new Animated.Value(0)).current;
  const iconsOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
    Animated.timing(taglineOp, { toValue: 1, duration: 400, delay: 400, useNativeDriver: true }).start();
    Animated.timing(iconsOp, { toValue: 1, duration: 500, delay: 600, useNativeDriver: true }).start();
    const t = setTimeout(() => navigation.replace('Login'), 2500);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={s.container}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <View style={s.cityBg}>
        {[55,80,100,65,90,50,75,60].map((h, i) => (
          <View key={i} style={[s.building, { height: h, width: 22 + (i % 3) * 8 }]} />
        ))}
      </View>
      <Animated.View style={{ alignItems: 'center', opacity, transform: [{ scale }] }}>
        <Text style={s.logo}>slotb</Text>
      </Animated.View>
      <Animated.Text style={[s.tagline, { opacity: taglineOp }]}>
        Trusted Services. Happy Homes.
      </Animated.Text>
      <Animated.View style={[s.icons, { opacity: iconsOp }]}>
        {['🧹','🔌','🔧','🚰','🎨'].map((icon, i) => (
          <View key={i} style={s.iconCircle}>
            <Text style={{ fontSize: 20 }}>{icon}</Text>
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  cityBg: { position: 'absolute', bottom: 80, flexDirection: 'row', alignItems: 'flex-end', gap: 4, opacity: 0.2, paddingHorizontal: 20 },
  building: { borderWidth: 1.5, borderColor: '#fff', borderBottomWidth: 0, borderRadius: 2 },
  logo: { fontSize: 64, fontWeight: '900', color: '#fff', letterSpacing: -2 },
  tagline: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 10 },
  icons: { position: 'absolute', bottom: 28, flexDirection: 'row', gap: 12 },
  iconCircle: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' },
});
