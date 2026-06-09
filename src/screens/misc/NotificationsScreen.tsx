import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

const TABS = ['All','Orders','Offers','Updates','Reminder'];
const NOTIFS = [
  { id:'1', icon:'📅', bg:'#EEF2FF', title:'Your booking is confirmed!', sub:'Your Electrician service is confirmed for 11 May 2025, 11:00 AM.', time:'10:30 AM', unread:true, section:'Today' },
  { id:'2', icon:'👷', bg:'#F0FDF4', title:'Technician is on the way', sub:'Ravi Kumar is on the way to your location. Track now.', time:'10:15 AM', unread:true, section:'Today' },
  { id:'3', icon:'🔔', bg:'#FEF3C7', title:'Reminder', sub:'Your Home Cleaning is scheduled tomorrow at 10:00 AM.', time:'09:00 AM', unread:true, section:'Today' },
  { id:'4', icon:'🎁', bg:'#F5F3FF', title:'Special offer for you!', sub:'Get 20% OFF on your next service. Use code: SLOTB20', time:'Yesterday, 06:45 PM', unread:false, section:'Yesterday' },
  { id:'5', icon:'🛡', bg:'#F0FDF4', title:'Service completed', sub:"Your Geyser Repair service has been completed. Thank you for choosing Slotb!", time:'Yesterday, 04:30 PM', unread:false, section:'Yesterday' },
  { id:'6', icon:'📢', bg:'#EEF2FF', title:'New service added!', sub:'We have added new service: AC Installation. Book now!', time:'08 May 2025, 11:20 AM', unread:false, section:'This Week' },
  { id:'7', icon:'🎁', bg:'#FEE2E2', title:'You earned a reward!', sub:'You have earned ₹50 SlotB cashback in your wallet.', time:'07 May 2025, 09:10 AM', unread:false, section:'This Week' },
];

export default function NotificationsScreen({ navigation }: any) {
  const [activeTab, setActiveTab] = useState(0);
  const insets = useSafeAreaInsets();
  let section = '';

  const renderItem = ({ item }: any) => {
    const showSection = item.section !== section;
    if (showSection) section = item.section;
    return (
      <>
        {showSection && <Text style={s.sectionLabel}>{item.section}</Text>}
        <TouchableOpacity style={[s.notifItem, item.unread && s.notifUnread]}>
          {item.unread && <View style={s.unreadDot} />}
          <View style={[s.notifIcon, { backgroundColor: item.bg }]}>
            <Text style={{ fontSize: 20 }}>{item.icon}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={s.notifTitle}>{item.title}</Text>
            <Text style={s.notifSub} numberOfLines={2}>{item.sub}</Text>
            <Text style={s.notifTime}>{item.time}</Text>
          </View>
          <Text style={{ fontSize: 16, color: '#94A3B8' }}>›</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Notifications</Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity><Text style={{ fontSize: 18 }}>🔍</Text></TouchableOpacity>
          <TouchableOpacity><Text style={{ fontSize: 18 }}>⚙️</Text></TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={s.tabsRow}>
        <FlatList data={TABS} horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 10, gap: 8 }}
          keyExtractor={(_, i) => String(i)}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[s.tab, index === activeTab && s.tabActive]} onPress={() => setActiveTab(index)}>
              <Text style={[s.tabText, index === activeTab && s.tabTextActive]}>{item}</Text>
            </TouchableOpacity>
          )} />
      </View>

      <FlatList data={NOTIFS} keyExtractor={i => i.id} renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false} />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#0F172A' },
  tabsRow: { borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F1F5F9' },
  tabActive: { backgroundColor: BLUE },
  tabText: { fontSize: 12, color: '#64748B', fontWeight: '500' },
  tabTextActive: { color: '#fff', fontWeight: '700' },
  sectionLabel: { fontSize: 13, fontWeight: '700', color: '#0F172A', paddingHorizontal: 16, paddingTop: 16, paddingBottom: 8 },
  notifItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9', position: 'relative' },
  notifUnread: { backgroundColor: '#FAFCFF' },
  unreadDot: { position: 'absolute', left: 6, top: '50%', width: 8, height: 8, borderRadius: 4, backgroundColor: BLUE },
  notifIcon: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  notifTitle: { fontSize: 13, fontWeight: '700', color: '#0F172A', marginBottom: 3 },
  notifSub: { fontSize: 12, color: '#64748B', lineHeight: 17, marginBottom: 4 },
  notifTime: { fontSize: 11, color: '#94A3B8' },
});
