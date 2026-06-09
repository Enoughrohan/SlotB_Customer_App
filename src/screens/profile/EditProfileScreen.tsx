import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const BLUE = '#1A47E8';

export default function EditProfileScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [name, setName] = useState('Rohan Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('rohan.kumar@gmail.com');
  const [dob, setDob] = useState('15 Jan 1998');
  const [gender, setGender] = useState('Male');

  return (
    <View style={[s.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <View style={s.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}><Text style={{ fontSize: 18, color: '#0F172A' }}>←</Text></TouchableOpacity>
        <Text style={s.headerTitle}>Edit Profile</Text>
        <TouchableOpacity><Text style={{ fontSize: 14, color: BLUE, fontWeight: '700' }}>Save</Text></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 40 }}>
        {/* Avatar */}
        <View style={s.avatarSection}>
          <View style={s.avatar}><Text style={{ fontSize: 40 }}>👤</Text></View>
          <TouchableOpacity style={s.changePhotoBtn}><Text style={{ fontSize: 13, color: BLUE, fontWeight: '600' }}>Change Photo</Text></TouchableOpacity>
        </View>

        {/* Fields */}
        {[
          { label: 'Full Name', value: name, setter: setName, icon: '👤', keyboard: 'default' },
          { label: 'Phone Number', value: phone, setter: setPhone, icon: '📞', keyboard: 'phone-pad' },
          { label: 'Email Address', value: email, setter: setEmail, icon: '✉️', keyboard: 'email-address' },
          { label: 'Date of Birth', value: dob, setter: setDob, icon: '📅', keyboard: 'default' },
        ].map((field, i) => (
          <View key={i} style={s.fieldGroup}>
            <Text style={s.fieldLabel}>{field.label}</Text>
            <View style={s.inputRow}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>{field.icon}</Text>
              <TextInput style={s.input} value={field.value} onChangeText={field.setter}
                keyboardType={field.keyboard as any} placeholderTextColor="#94A3B8" />
            </View>
          </View>
        ))}

        {/* Gender */}
        <View style={s.fieldGroup}>
          <Text style={s.fieldLabel}>Gender</Text>
          <View style={s.genderRow}>
            {['Male', 'Female', 'Other'].map(g => (
              <TouchableOpacity key={g} style={[s.genderBtn, gender === g && s.genderBtnActive]} onPress={() => setGender(g)}>
                <Text style={[s.genderText, gender === g && s.genderTextActive]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Save button */}
        <TouchableOpacity style={s.saveBtn} onPress={() => navigation.goBack()}>
          <Text style={s.saveBtnText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  headerTitle: { fontSize: 17, fontWeight: '700', color: '#0F172A' },
  avatarSection: { alignItems: 'center', paddingVertical: 24 },
  avatar: { width: 88, height: 88, borderRadius: 44, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 3, borderColor: BLUE },
  changePhotoBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1.5, borderColor: BLUE },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  inputRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1.5, borderColor: '#E2E8F0' },
  input: { flex: 1, fontSize: 14, color: '#0F172A', padding: 0 },
  genderRow: { flexDirection: 'row', gap: 10 },
  genderBtn: { flex: 1, paddingVertical: 12, borderRadius: 12, borderWidth: 1.5, borderColor: '#E2E8F0', alignItems: 'center', backgroundColor: '#fff' },
  genderBtnActive: { borderColor: BLUE, backgroundColor: '#EEF2FF' },
  genderText: { fontSize: 13, fontWeight: '600', color: '#64748B' },
  genderTextActive: { color: BLUE },
  saveBtn: { backgroundColor: BLUE, borderRadius: 14, paddingVertical: 15, alignItems: 'center', marginTop: 8, elevation: 6 },
  saveBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
});
