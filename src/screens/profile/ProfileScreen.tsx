import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const BLUE = '#1A47E8';

const MENU = [
  { section: 'Account', items: [
    { icon: 'map-marker-outline', label: 'My Addresses' },
    { icon: 'star-outline', label: 'My Reviews' },
    { icon: 'heart-outline', label: 'Saved Services' },
  ]},
  { section: 'Support', items: [
    { icon: 'headphones', label: 'Help & Support' },
    { icon: 'shield-check-outline', label: 'Safety & Security' },
    { icon: 'file-document-outline', label: 'Terms & Conditions' },
    { icon: 'information-outline', label: 'About Slotb' },
  ]},
];

export default function ProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Blue header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <Text style={s.appName}>slotb</Text>
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity style={s.headerIconBtn} onPress={() => navigation.navigate('Notifications')}>
                <Icon name="bell-outline" size={20} color="#fff" />
                <View style={s.badge}><Text style={{ fontSize: 8, color: '#fff', fontWeight: '700' }}>3</Text></View>
              </TouchableOpacity>
              <TouchableOpacity style={s.headerIconBtn}>
                <Icon name="cog-outline" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          {/* City illustration */}
          <View style={s.cityRow}>
            {[40,55,70,45,60,35,50].map((h,i) => (
              <View key={i} style={{ height: h, width: 18+(i%3)*6, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', borderBottomWidth: 0, borderRadius: 2 }} />
            ))}
          </View>
        </View>

        {/* Profile card */}
        <View style={s.profileCard}>
          <View style={s.avatarWrapper}>
            <View style={s.avatar}>
              <Icon name="account" size={36} color={BLUE} />
            </View>
            <TouchableOpacity style={s.editBadge} onPress={() => navigation.navigate('EditProfile')}>
              <Icon name="pencil" size={12} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.userName}>Rohan Kumar</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Icon name="phone" size={14} color="#64748B" />
              <Text style={s.userDetail}>+91 98765 43210</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Icon name="email-outline" size={14} color="#64748B" />
              <Text style={s.userDetail}>rohan.kumar@gmail.com</Text>
            </View>
            <View style={s.verifiedBadge}>
              <Icon name="check-circle" size={12} color={BLUE} />
              <Text style={{ fontSize: 11, color: BLUE, fontWeight: '700' }}>Verified</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="chevron-right" size={20} color="#94A3B8" />
          </TouchableOpacity>
        </View>

        {/* My Orders */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>My Orders</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Bookings')}>
              <Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>View All</Text>
            </TouchableOpacity>
          </View>
          <View style={s.ordersRow}>
            {[
              { icon: 'clipboard-list-outline', label: 'All Orders', color: BLUE },
              { icon: 'check-circle-outline', label: 'Completed', color: '#22C55E' },
              { icon: 'clock-outline', label: 'In Progress', color: '#F59E0B' },
              { icon: 'close-circle-outline', label: 'Cancelled', color: '#EF4444' },
            ].map((o,i) => (
              <TouchableOpacity key={i} style={s.orderItem} onPress={() => navigation.navigate('Bookings')}>
                <View style={[s.orderIconCircle, { borderColor: o.color }]}>
                  <Icon name={o.icon} size={22} color={o.color} />
                </View>
                <Text style={s.orderLabel}>{o.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Menu sections */}
        {MENU.map((group, gi) => (
          <View key={gi} style={s.menuSection}>
            {group.items.map((item, ii) => (
              <TouchableOpacity key={ii} style={s.menuItem} onPress={() => {
                if (item.label === 'Help & Support') navigation.navigate('HelpCentre');
              }}>
                <View style={s.menuIconCircle}>
                  <Icon name={item.icon} size={20} color={BLUE} />
                </View>
                <Text style={s.menuLabel}>{item.label}</Text>
                <Icon name="chevron-right" size={18} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        {/* Logout */}
        <View style={[s.menuSection, { marginBottom: 32 }]}>
          <TouchableOpacity style={s.menuItem} onPress={() => navigation.replace('Login')}>
            <View style={[s.menuIconCircle, { backgroundColor: '#FEE2E2' }]}>
              <Icon name="logout" size={18} color="#EF4444" />
            </View>
            <Text style={[s.menuLabel, { color: '#EF4444' }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Tab bar */}
      <View style={[s.tabBar, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={24} color="#64748B" />
          <Text style={s.tabLabel}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Search')}>
          <Icon name="compass-outline" size={24} color="#64748B" />
          <Text style={s.tabLabel}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.qrPill} onPress={() => navigation.navigate('ScanQR')}>
          <Icon name="qrcode-scan" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Bookings')}>
          <Icon name="clipboard-list-outline" size={24} color="#64748B" />
          <Text style={s.tabLabel}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.tabItem}>
          <Icon name="account" size={24} color={BLUE} />
          <Text style={[s.tabLabel, { color: BLUE, fontWeight: '700' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { backgroundColor: BLUE, padding: 16, paddingBottom: 24 },
  headerTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  appName: { fontSize: 22, fontWeight: '900', color: '#fff' },
  headerIconBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', position: 'relative' },
  badge: { position: 'absolute', top: 4, right: 4, width: 14, height: 14, borderRadius: 7, backgroundColor: '#EF4444', alignItems: 'center', justifyContent: 'center' },
  cityRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, opacity: 0.3 },
  profileCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', marginHorizontal: 16, marginTop: -20, borderRadius: 16, padding: 16, gap: 12, elevation: 4, borderWidth: 1, borderColor: '#E2E8F0' },
  avatarWrapper: { position: 'relative' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#fff' },
  editBadge: { position: 'absolute', bottom: 0, right: 0, width: 22, height: 22, borderRadius: 11, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center' },
  userName: { fontSize: 16, fontWeight: '800', color: '#0F172A' },
  userDetail: { fontSize: 12, color: '#64748B' },
  verifiedBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#EEF2FF', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, gap: 4, alignSelf: 'flex-start', marginTop: 6 },
  section: { backgroundColor: '#fff', margin: 12, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  ordersRow: { flexDirection: 'row', justifyContent: 'space-between' },
  orderItem: { alignItems: 'center', gap: 6 },
  orderIconCircle: { width: 52, height: 52, borderRadius: 26, borderWidth: 2, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFF' },
  orderLabel: { fontSize: 11, color: '#64748B', textAlign: 'center' },
  menuSection: { backgroundColor: '#fff', marginHorizontal: 12, marginBottom: 10, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 14, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  menuIconCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  menuLabel: { flex: 1, fontSize: 14, fontWeight: '500', color: '#0F172A' },
  tabBar: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 10, alignItems: 'center', justifyContent: 'space-around', elevation: 12 },
  tabItem: { alignItems: 'center', flex: 1, gap: 2 },
  tabLabel: { fontSize: 10, color: '#64748B' },
  qrPill: { width: 54, height: 54, borderRadius: 27, backgroundColor: BLUE, alignItems: 'center', justifyContent: 'center', marginTop: -18, elevation: 10 },
});
