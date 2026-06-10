import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width } = Dimensions.get('window');
const BLUE = '#1A47E8';

const STEPS = ['Booking Details', 'Address', 'Schedule', 'Review & Pay'];
const HOME_TYPES = [
  { id:'1bhk', label:'1 BHK', sub:'Up to 600 sq ft', icon:'home-variant-outline' },
  { id:'2bhk', label:'2 BHK', sub:'601 – 1000 sq ft', icon:'office-building-outline' },
  { id:'3bhk', label:'3 BHK', sub:'1001 – 1500 sq ft', icon:'domain' },
  { id:'4bhk', label:'4+ BHK', sub:'1500+ sq ft', icon:'castle' },
];
const EXTRAS = [
  { id:'window', label:'Window Cleaning', sub:'Interior windows cleaning', price:99, icon:'window-closed-variant' },
  { id:'fridge', label:'Refrigerator Cleaning', sub:'Deep cleaning of refrigerator', price:149, icon:'fridge-outline' },
  { id:'balcony', label:'Balcony Cleaning', sub:'Balcony and utility area cleaning', price:99, icon:'sprout' },
  { id:'fan', label:'Fan Cleaning', sub:'Cleaning of ceiling fans', price:79, icon:'fan' },
];

export default function BookServiceScreen({ navigation, route }: any) {
  const insets = useSafeAreaInsets();
  const [step, setStep] = useState(0);
  const [homeType, setHomeType] = useState('1bhk');
  const [extras, setExtras] = useState<string[]>([]);
  const [instructions, setInstructions] = useState('');

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const total = 499 + extras.reduce((sum, id) => {
    const e = EXTRAS.find(x => x.id === id);
    return sum + (e?.price || 0);
  }, 0);

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#0F172A" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>Book Service</Text>
        <TouchableOpacity>
          <Icon name="headphones" size={20} color={BLUE} />
        </TouchableOpacity>
      </View>

      {/* Service summary card */}
      <View style={s.serviceCard}>
        <View style={s.serviceIcon}>
          <Icon name="vacuum" size={28} color={BLUE} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.serviceName}>Home Deep Cleaning</Text>
          <Text style={s.serviceSub}>Complete deep cleaning of your home including all rooms and kitchen.</Text>
          <TouchableOpacity><Text style={{ fontSize: 12, color: BLUE, fontWeight: '600' }}>View Details</Text></TouchableOpacity>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={s.servicePrice}>₹{total}</Text>
          <Text style={{ fontSize: 11, color: '#64748B' }}>Starting from</Text>
          <View style={s.durationBadge}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Icon name="clock-outline" size={11} color="#22C55E" />
              <Text style={{ fontSize: 11, color: '#22C55E', fontWeight: '600' }}>60-90 mins</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Step indicators */}
      <View style={s.stepsRow}>
        {STEPS.map((st, i) => (
          <React.Fragment key={i}>
            <View style={s.stepItem}>
              <View style={[s.stepCircle, i <= step && s.stepCircleActive, i < step && s.stepCircleDone]}>
                {i < step ? <Icon name="check" size={12} color="#fff" />
                  : <Text style={[s.stepNum, i === step && { color: '#fff' }]}>{i + 1}</Text>}
              </View>
              <Text style={[s.stepLabel, i === step && s.stepLabelActive]}>{st}</Text>
            </View>
            {i < STEPS.length - 1 && <View style={[s.stepLine, i < step && s.stepLineDone]} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
        {/* Home type selection */}
        <Text style={s.sectionTitle}>Select Home Type</Text>
        <View style={s.homeGrid}>
          {HOME_TYPES.map(ht => (
            <TouchableOpacity key={ht.id} style={[s.homeCard, homeType === ht.id && s.homeCardActive]} onPress={() => setHomeType(ht.id)}>
              <View style={[s.homeCardRadio, homeType === ht.id && s.homeCardRadioActive]}>
                {homeType === ht.id && <View style={s.radioDot} />}
              </View>
              <Icon name={ht.icon} size={32} color={homeType === ht.id ? BLUE : '#64748B'} style={{ marginBottom: 6 }} />
              <Text style={[s.homeCardLabel, homeType === ht.id && { color: BLUE }]}>{ht.label}</Text>
              <Text style={s.homeCardSub}>{ht.sub}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add extras */}
        <Text style={s.sectionTitle}>Add Extra Services <Text style={{ fontSize: 12, color: '#94A3B8', fontWeight: '400' }}>(Optional)</Text></Text>
        <View style={s.extrasList}>
          {EXTRAS.map(ex => (
            <TouchableOpacity key={ex.id} style={s.extraRow} onPress={() => toggleExtra(ex.id)}>
              <View style={[s.checkbox, extras.includes(ex.id) && s.checkboxActive]}>
                {extras.includes(ex.id) && <Icon name="check" size={12} color="#fff" />}
              </View>
              <Icon name={ex.icon} size={20} color={BLUE} style={{ marginRight: 6 }} />
              <View style={{ flex: 1 }}>
                <Text style={s.extraLabel}>{ex.label}</Text>
                <Text style={s.extraSub}>{ex.sub}</Text>
              </View>
              <Text style={s.extraPrice}>₹{ex.price}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Special instructions */}
        <Text style={s.sectionTitle}>Special Instructions <Text style={{ fontSize: 12, color: '#94A3B8', fontWeight: '400' }}>(Optional)</Text></Text>
        <TextInput style={s.textArea} multiline numberOfLines={4} placeholder="Any special instructions for our professional..." placeholderTextColor="#94A3B8" value={instructions} onChangeText={setInstructions} maxLength={200} textAlignVertical="top" />
        <Text style={{ fontSize: 11, color: '#94A3B8', textAlign: 'right', marginTop: 4 }}>{instructions.length}/200</Text>
      </ScrollView>

      {/* CTA */}
      <View style={[s.cta, { paddingBottom: insets.bottom + 8 }]}>
        <TouchableOpacity style={s.continueBtn} onPress={() => step < 3 ? setStep(s => s + 1) : navigation.navigate('Payment')}>
          <Text style={s.continueBtnText}>{step < 3 ? 'Continue' : 'Proceed to Pay'}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom tab bar */}
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
        <TouchableOpacity style={s.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Icon name="account-outline" size={24} color="#64748B" />
          <Text style={s.tabLabel}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container:{flex:1,backgroundColor:'#F8FAFF'},
  header:{flexDirection:'row',alignItems:'center',justifyContent:'space-between',backgroundColor:'#fff',paddingHorizontal:16,paddingVertical:14,borderBottomWidth:1,borderBottomColor:'#E2E8F0'},
  headerTitle:{fontSize:17,fontWeight:'700',color:'#0F172A'},
  serviceCard:{flexDirection:'row',alignItems:'flex-start',backgroundColor:'#fff',margin:12,borderRadius:14,padding:14,gap:12,borderWidth:1,borderColor:'#E2E8F0'},
  serviceIcon:{width:56,height:56,borderRadius:12,backgroundColor:'#EEF2FF',alignItems:'center',justifyContent:'center'},
  serviceName:{fontSize:14,fontWeight:'700',color:'#0F172A',marginBottom:4},
  serviceSub:{fontSize:11,color:'#64748B',lineHeight:16,marginBottom:4},
  servicePrice:{fontSize:18,fontWeight:'800',color:'#0F172A'},
  durationBadge:{backgroundColor:'#F0FDF4',paddingHorizontal:8,paddingVertical:3,borderRadius:8,marginTop:4},
  stepsRow:{flexDirection:'row',alignItems:'center',paddingHorizontal:16,paddingVertical:12,backgroundColor:'#fff',borderBottomWidth:1,borderBottomColor:'#E2E8F0'},
  stepItem:{alignItems:'center',gap:4},
  stepCircle:{width:28,height:28,borderRadius:14,borderWidth:2,borderColor:'#E2E8F0',alignItems:'center',justifyContent:'center',backgroundColor:'#fff'},
  stepCircleActive:{borderColor:BLUE,backgroundColor:BLUE},
  stepCircleDone:{borderColor:BLUE,backgroundColor:BLUE},
  stepNum:{fontSize:12,fontWeight:'700',color:'#94A3B8'},
  stepLabel:{fontSize:9,color:'#94A3B8',textAlign:'center',maxWidth:60},
  stepLabelActive:{color:BLUE,fontWeight:'700'},
  stepLine:{flex:1,height:2,backgroundColor:'#E2E8F0',marginBottom:12},
  stepLineDone:{backgroundColor:BLUE},
  sectionTitle:{fontSize:15,fontWeight:'700',color:'#0F172A',marginBottom:12,marginTop:8},
  homeGrid:{flexDirection:'row',gap:8,marginBottom:16},
  homeCard:{flex:1,backgroundColor:'#fff',borderRadius:14,padding:10,alignItems:'center',borderWidth:1.5,borderColor:'#E2E8F0'},
  homeCardActive:{borderColor:BLUE,backgroundColor:'#F0F5FF'},
  homeCardRadio:{width:18,height:18,borderRadius:9,borderWidth:2,borderColor:'#CBD5E1',alignItems:'center',justifyContent:'center',alignSelf:'flex-end',marginBottom:6},
  homeCardRadioActive:{borderColor:BLUE},
  radioDot:{width:9,height:9,borderRadius:5,backgroundColor:BLUE},
  homeCardLabel:{fontSize:12,fontWeight:'700',color:'#0F172A'},
  homeCardSub:{fontSize:9,color:'#64748B',textAlign:'center',marginTop:2},
  extrasList:{backgroundColor:'#fff',borderRadius:14,borderWidth:1,borderColor:'#E2E8F0',overflow:'hidden',marginBottom:16},
  extraRow:{flexDirection:'row',alignItems:'center',padding:14,gap:10,borderBottomWidth:1,borderBottomColor:'#F1F5F9'},
  checkbox:{width:20,height:20,borderRadius:5,borderWidth:2,borderColor:'#CBD5E1',alignItems:'center',justifyContent:'center'},
  checkboxActive:{backgroundColor:BLUE,borderColor:BLUE},
  extraLabel:{fontSize:13,fontWeight:'600',color:'#0F172A'},
  extraSub:{fontSize:11,color:'#64748B'},
  extraPrice:{fontSize:14,fontWeight:'700',color:'#0F172A'},
  textArea:{backgroundColor:'#fff',borderWidth:1.5,borderColor:'#E2E8F0',borderRadius:12,padding:14,fontSize:13,color:'#0F172A',minHeight:100,lineHeight:20},
  cta:{paddingHorizontal:16,paddingTop:10,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#E2E8F0'},
  continueBtn:{backgroundColor:BLUE,borderRadius:14,paddingVertical:15,alignItems:'center',elevation:6},
  continueBtnText:{fontSize:15,fontWeight:'700',color:'#fff'},
  tabBar:{flexDirection:'row',backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#E2E8F0',paddingTop:10,alignItems:'center',justifyContent:'space-around',elevation:12},
  tabItem:{alignItems:'center',flex:1,gap:2},
  tabLabel:{fontSize:10,color:'#64748B'},
  qrPill:{width:54,height:54,borderRadius:27,backgroundColor:BLUE,alignItems:'center',justifyContent:'center',marginTop:-18,elevation:10},
});
