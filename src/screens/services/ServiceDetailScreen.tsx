import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const INCLUDED = ['Inspection and issue diagnosis','Repair of switches, sockets','Installation of lights, fans','Wiring and re-wiring','MCB, fuse and breaker replacement','Safety check and testing'];
const EXCLUDED = ['Major rewiring of entire property','Repair of heavy appliances','Civil work (chasing, wall cutting)','Supply or purchase of materials','HT/LT electrical works','Repairs for inverter, UPS'];

const getCategoryIcon = (cat: string) => {
  const c = cat.toLowerCase();
  if (c.includes('electrician')) return { name: 'flash', color: '#F59E0B' };
  if (c.includes('cleaning')) return { name: 'vacuum', color: '#1A47E8' };
  if (c.includes('ac')) return { name: 'air-conditioner', color: '#0EA5E9' };
  if (c.includes('appliance')) return { name: 'television-play', color: '#0EA5E9' };
  if (c.includes('plumb')) return { name: 'wrench', color: '#3B82F6' };
  if (c.includes('carpenter')) return { name: 'hammer-screwdriver', color: '#8B5CF6' };
  return { name: 'tools', color: '#1A47E8' };
};

export default function ServiceDetailScreen({ navigation, route }: any) {
  const category = route?.params?.category || 'Electrician';
  const insets = useSafeAreaInsets();

  const iconInfo = getCategoryIcon(category);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity style={s.backBtn} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <View style={[s.headerIcon, { backgroundColor: iconInfo.color + '15' }]}>
          <Icon name={iconInfo.name} size={22} color={iconInfo.color} />
        </View>
        <Text style={s.headerTitle}>{category} Services</Text>
        <TouchableOpacity style={s.shareBtn}>
          <Icon name="share-variant-outline" size={20} color="#0F172A" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero image */}
        <View style={s.heroImg}>
          <Icon name={iconInfo.name} size={72} color={iconInfo.color} style={{ opacity: 0.2 }} />
          <View style={s.verifiedBadge}>
            <Icon name="shield-check" size={16} color="#fff" />
            <Text style={{ fontSize: 12, color: '#fff', fontWeight: '700' }}>Verified & Background Checked</Text>
          </View>
        </View>

        <View style={s.body}>
          {/* Rating */}
          <View style={s.ratingRow}>
            <Icon name="star" size={20} color="#F59E0B" />
            <Text style={s.rating}>4.8</Text>
            <Text style={s.ratingCount}>(12.8k ratings)</Text>
          </View>

          {/* Description */}
          <Text style={s.description}>Our professional {category.toLowerCase()}s handle all types of installations, repairs, and maintenance with safety and precision. From fixing switches to full wiring, we've got you covered.</Text>

          {/* What's included */}
          <View style={[s.listCard, { borderColor: '#BFDBFE' }]}>
            <View style={s.listHeader}>
              <Icon name="check-circle" size={20} color={BLUE} />
              <Text style={[s.listTitle, { color: BLUE }]}>What's included</Text>
            </View>
            <View style={s.listGrid}>
              {INCLUDED.map((item, i) => (
                <View key={i} style={s.listItem}>
                  <View style={s.checkCircle}>
                    <Icon name="check" size={11} color="#fff" />
                  </View>
                  <Text style={s.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* What's not included */}
          <View style={[s.listCard, { borderColor: '#FECACA' }]}>
            <View style={s.listHeader}>
              <Icon name="close-circle" size={20} color="#EF4444" />
              <Text style={[s.listTitle, { color: '#EF4444' }]}>What's not included</Text>
            </View>
            <View style={s.listGrid}>
              {EXCLUDED.map((item, i) => (
                <View key={i} style={s.listItem}>
                  <View style={[s.checkCircle, { backgroundColor: '#EF4444' }]}>
                    <Icon name="close" size={11} color="#fff" />
                  </View>
                  <Text style={s.listText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* About this service */}
          <View style={[s.listCard, { borderColor: '#E2E8F0' }]}>
            <View style={s.listHeader}>
              <Icon name="information-outline" size={20} color={BLUE} />
              <Text style={[s.listTitle, { color: BLUE }]}>About this service</Text>
            </View>
            <View style={s.aboutRow}>
              {[
                { name: 'shield-check-outline', color: '#22C55E', label: 'Skilled &\nVerified Experts' },
                { name: 'flash-outline', color: '#F59E0B', label: 'Safe &\nReliable Service' },
                { name: 'thumb-up-outline', color: BLUE, label: 'Satisfaction\nGuaranteed' },
              ].map((a, i) => (
                <View key={i} style={s.aboutItem}>
                  <Icon name={a.name} size={28} color={a.color} />
                  <Text style={s.aboutLabel}>{a.label}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Book CTA */}
      <View style={[s.cta, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={s.bookBtn} onPress={() => navigation.navigate('Payment')}>
          <Text style={s.bookBtnText}>BOOK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 12, gap: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  backBtn: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  headerIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, fontSize: 15, fontWeight: '700', color: '#0F172A' },
  shareBtn: { width: 36, height: 36, borderRadius: 10, borderWidth: 1, borderColor: '#E2E8F0', alignItems: 'center', justifyContent: 'center' },
  heroImg: { height: 200, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', position: 'relative', marginHorizontal: 16, marginTop: 12, borderRadius: 16, overflow: 'hidden' },
  heroEmoji: { fontSize: 72, opacity: 0.2 },
  verifiedBadge: { position: 'absolute', bottom: 14, left: 14, flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: BLUE, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  body: { padding: 16 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  rating: { fontSize: 16, fontWeight: '700', color: '#0F172A' },
  ratingCount: { fontSize: 13, color: '#64748B' },
  description: { fontSize: 13, color: '#64748B', lineHeight: 20, marginBottom: 16 },
  listCard: { borderWidth: 1.5, borderRadius: 14, padding: 14, marginBottom: 12 },
  listHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  listTitle: { fontSize: 14, fontWeight: '700' },
  listGrid: { gap: 8 },
  listItem: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  checkCircle: { width: 18, height: 18, borderRadius: 9, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: 1 },
  listText: { flex: 1, fontSize: 12, color: '#0F172A', lineHeight: 18 },
  aboutRow: { flexDirection: 'row', justifyContent: 'space-around' },
  aboutItem: { alignItems: 'center', flex: 1, gap: 6 },
  aboutLabel: { fontSize: 11, color: '#64748B', textAlign: 'center', lineHeight: 16 },
  cta: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', elevation: 12 },
  bookBtn: { backgroundColor: BLUE, borderRadius: 14, paddingVertical: 16, alignItems: 'center', elevation: 6 },
  bookBtnText: { fontSize: 16, fontWeight: '800', color: '#fff', letterSpacing: 1 },
});
