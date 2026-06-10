import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, Image, Dimensions, StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import womenParlour from '../../assets/images/women_parlour.jpg';
import mensSalon from '../../assets/images/mens_salon.jpg';
import cleaning from '../../assets/images/cleaning.jpg';
import acRepair from '../../assets/images/ac_repair.jpg';
import applianceRepair from '../../assets/images/appliance_repair.jpg';
import plumber from '../../assets/images/plumber.jpg';
import electrician from '../../assets/images/electrician.jpg';
import carpenter from '../../assets/images/carpenter.jpg';

const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const CATEGORIES = [
  { id:'1', name:"Women's\nParlour", image: womenParlour, screen:'WomensSalon' },
  { id:'2', name:"Men's\nSalon",    image: mensSalon,    screen:'MensSalon' },
  { id:'3', name:'Cleaning',        image: cleaning,       screen:'ServiceDetail' },
  { id:'4', name:'AC\nRepair',      image: acRepair,      screen:'ServiceDetail' },
  { id:'5', name:'Appliance\nRepair',image: applianceRepair, screen:'ServiceDetail' },
  { id:'6', name:'Plumber',         image: plumber,        screen:'ServiceDetail' },
  { id:'7', name:'Electrician',     image: electrician,    screen:'ServiceDetail' },
  { id:'8', name:'Carpenter',       image: carpenter,      screen:'ServiceDetail' },
];

const BANNERS = [
  { id:'1', title:'20% off on your\nfirst AC servicing', sub:'Up to ₹100 off' },
  { id:'2', title:'₹9 first\nHome Cleaning',             sub:'Limited time offer' },
  { id:'3', title:'Trusted Pros\nNear You',              sub:'Book in 30 seconds' },
];

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [activeBanner, setActiveBanner] = useState(0);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={BLUE} />

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>

        {/* Sticky Blue Header */}
        <View style={s.header}>
          <View style={s.headerTop}>
            <TouchableOpacity style={s.locRow}>
              <Icon name="map-marker" size={20} color="#fff" />
              <View style={{ marginLeft: 8 }}>
                <Text style={s.locTime}>In 46 minutes</Text>
                <View style={{ flexDirection:'row', alignItems:'center' }}>
                  <Text style={s.locCity}>Begusarai, Bihar</Text>
                  <Icon name="chevron-down" size={14} color="rgba(255,255,255,0.85)" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={s.bellBtn} onPress={() => navigation.navigate('Notifications')}>
              <Icon name="bell-outline" size={20} color={BLUE} />
              <View style={s.bellDot} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={s.searchBar} onPress={() => navigation.navigate('Search')} activeOpacity={0.95}>
            <Icon name="magnify" size={20} color="#94A3B8" />
            <Text style={s.searchPh}>Search for services...</Text>
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={e => setActiveBanner(Math.round(e.nativeEvent.contentOffset.x / width))}>
          {BANNERS.map(b => (
            <View key={b.id} style={s.banner}>
              <View style={{ flex: 1 }}>
                <Text style={s.bannerTitle}>{b.title}</Text>
                <Text style={s.bannerSub}>{b.sub}</Text>
              </View>
              <View style={s.bannerRight}>
                <Text style={s.bannerLogo}>
                  <Text style={{ color:'#fff' }}>Slot</Text>
                  <Text style={{ color:'#F97316' }}>b</Text>
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Dots */}
        <View style={s.dots}>
          {BANNERS.map((_, i) => <View key={i} style={[s.dot, i === activeBanner && s.dotActive]} />)}
        </View>

        {/* All Services */}
        <View style={s.section}>
          <Text style={s.sectionTitle}>All Services</Text>
          <View style={s.grid}>
            {CATEGORIES.map(cat => (
              <TouchableOpacity key={cat.id} style={s.catCard}
                onPress={() => navigation.navigate(cat.screen, { category: cat.name })}
                activeOpacity={0.85}>
                <Image source={cat.image} style={s.catImage} resizeMode="contain" />
                <Text style={s.catName}>{cat.name}</Text>
                <Icon name="chevron-right" size={16} color="#94A3B8" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Bottom promo banner */}
        <View style={[s.banner, { width: width - 32, marginHorizontal: 16, borderRadius: 14, marginBottom: 8 }]}>
          <View style={{ flex: 1 }}>
            <Text style={s.bannerTitle}>{'20% off on your\nfirst AC servicing'}</Text>
            <Text style={s.bannerSub}>Up to ₹100 off</Text>
          </View>
          <View style={s.bannerRight}>
            <Text style={s.bannerLogo}>
              <Text style={{ color:'#fff' }}>Slot</Text>
              <Text style={{ color:'#F97316' }}>b</Text>
            </Text>
          </View>
        </View>

        <View style={{ height: 90 }} />
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[s.tabBar, { paddingBottom: insets.bottom + 6 }]}>
        <TouchableOpacity style={s.tabItem}>
          <Icon name="home" size={24} color={BLUE} />
          <Text style={[s.tabLabel, { color: BLUE, fontWeight:'700' }]}>Home</Text>
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
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-outline" size={24} color="#64748B" />
          <Text style={s.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex:1, backgroundColor:'#F8FAFF' },
  header: { backgroundColor:BLUE, paddingHorizontal:16, paddingTop:12, paddingBottom:14 },
  headerTop: { flexDirection:'row', alignItems:'center', justifyContent:'space-between', marginBottom:12 },
  locRow: { flexDirection:'row', alignItems:'center' },
  locTime: { fontSize:15, fontWeight:'700', color:'#fff' },
  locCity: { fontSize:12, color:'rgba(255,255,255,0.85)' },
  bellBtn: { width:42, height:42, borderRadius:21, backgroundColor:'#fff', alignItems:'center', justifyContent:'center', position:'relative' },
  bellDot: { position:'absolute', top:8, right:9, width:8, height:8, borderRadius:4, backgroundColor:'#EF4444', borderWidth:1.5, borderColor:'#fff' },
  searchBar: { flexDirection:'row', alignItems:'center', backgroundColor:'#fff', borderRadius:12, paddingHorizontal:14, paddingVertical:12, gap:10 },
  searchPh: { fontSize:14, color:'#94A3B8', flex:1 },
  banner: { width, height:155, backgroundColor:BLUE, flexDirection:'row', alignItems:'center', paddingHorizontal:20, justifyContent:'space-between' },
  bannerTitle: { fontSize:18, fontWeight:'800', color:'#fff', lineHeight:24, marginBottom:6 },
  bannerSub: { fontSize:13, color:'rgba(255,255,255,0.85)' },
  bannerRight: { alignItems:'center', justifyContent:'center' },
  bannerLogo: { fontSize:20, fontWeight:'900' },
  dots: { flexDirection:'row', justifyContent:'center', gap:6, paddingVertical:8, backgroundColor:'#fff' },
  dot: { width:6, height:6, borderRadius:3, backgroundColor:'#CBD5E1' },
  dotActive: { width:18, backgroundColor:BLUE, borderRadius:3 },
  section: { backgroundColor:'#fff', marginTop:8, paddingHorizontal:16, paddingVertical:16 },
  sectionTitle: { fontSize:18, fontWeight:'800', color:'#0F172A', marginBottom:14 },
  grid: { flexDirection:'row', flexWrap:'wrap', gap:10 },
  catCard: {
    width: (width - 42) / 2,
    flexDirection:'row', alignItems:'center', justifyContent:'space-between',
    backgroundColor:'#fff', borderWidth:1, borderColor:'#E2E8F0',
    borderRadius:14, paddingHorizontal:10, paddingVertical:12,
  },
  catImage: { width:46, height:46, borderRadius:8 },
  catName: { flex:1, fontSize:12, fontWeight:'600', color:'#0F172A', lineHeight:17, marginHorizontal:8 },
  tabBar: {
    position:'absolute', bottom:0, left:0, right:0,
    flexDirection:'row', backgroundColor:'#fff',
    borderTopWidth:1, borderTopColor:'#E2E8F0',
    paddingTop:10, alignItems:'center', justifyContent:'space-around', elevation:12,
  },
  tabItem: { alignItems:'center', flex:1, gap:2 },
  tabLabel: { fontSize:10, color:'#64748B', fontWeight:'500' },
  qrPill: {
    width:56, height:56, borderRadius:28, backgroundColor:BLUE,
    alignItems:'center', justifyContent:'center', marginTop:-20, elevation:10,
  },
});