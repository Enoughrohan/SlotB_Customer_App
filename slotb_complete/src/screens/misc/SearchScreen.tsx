import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

const POPULAR = ['Home Cleaning','Electrician','AC Repair','Plumber','Salon at Home','Pest Control','Deep Cleaning','Car Wash'];
const RECENT = ['Home Cleaning','Electrician near me','AC Repair','Plumber','Geyser Repair'];

export default function SearchScreen({ navigation }: any) {
  const [query, setQuery] = useState('');
  const insets = useSafeAreaInsets();

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <View style={s.searchBar}>
          <Text style={{ fontSize: 16 }}>🔍</Text>
          <TextInput style={s.input} placeholder="Search for services, categories or professionals..." placeholderTextColor="#94A3B8" value={query} onChangeText={setQuery} autoFocus />
          {query ? <TouchableOpacity onPress={() => setQuery('')}><Text style={{ fontSize: 16, color: '#94A3B8' }}>✕</Text></TouchableOpacity> : null}
        </View>
        <TouchableOpacity><Text style={{ fontSize: 20 }}>🎤</Text></TouchableOpacity>
      </View>

      <FlatList
        data={[]}
        ListHeaderComponent={() => (
          <View style={{ padding: 16 }}>
            {/* Popular searches */}
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Popular Searches</Text>
              <TouchableOpacity><Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>View All</Text></TouchableOpacity>
            </View>
            <View style={s.chipsWrap}>
              {POPULAR.map((p, i) => (
                <TouchableOpacity key={i} style={s.chip} onPress={() => setQuery(p)}>
                  <Text style={{ fontSize: 12 }}>↗</Text>
                  <Text style={s.chipText}>{p}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={s.divider} />

            {/* Recent searches */}
            <View style={s.sectionHeader}>
              <Text style={s.sectionTitle}>Recent Searches</Text>
              <TouchableOpacity><Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>Clear All</Text></TouchableOpacity>
            </View>
            {RECENT.map((r, i) => (
              <TouchableOpacity key={i} style={s.recentRow} onPress={() => setQuery(r)}>
                <Text style={{ fontSize: 16 }}>🕐</Text>
                <Text style={s.recentText}>{r}</Text>
                <TouchableOpacity><Text style={{ fontSize: 16, color: '#94A3B8' }}>✕</Text></TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
        )}
        keyExtractor={(_, i) => String(i)}
        renderItem={() => null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 10, gap: 10, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F8FAFF', borderRadius: 12, paddingHorizontal: 12, paddingVertical: 10, gap: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  input: { flex: 1, fontSize: 13, color: '#0F172A', padding: 0 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
  chipText: { fontSize: 12, color: '#0F172A', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#F1F5F9', marginVertical: 16 },
  recentRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, gap: 12, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  recentText: { flex: 1, fontSize: 14, color: '#0F172A' },
});
