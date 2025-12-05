import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { useAuth } from '@/contexts/AuthContext';

export default function SettingsScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: logout },
    ]);
  };

  const settingsOptions = [
    { id: '1', title: 'Edit Profile', icon: 'person-outline', onPress: () => router.push('/(auth)/profile' as any) },
    { id: '2', title: 'My Bookings', icon: 'calendar-outline', onPress: () => router.push('/booking/my-bookings' as any) },
    { id: '3', title: 'Wallet', icon: 'wallet-outline', onPress: () => router.push('/(auth)/profile' as any) },
    { id: '4', title: 'Notifications', icon: 'notifications-outline', onPress: () => {} },
    { id: '5', title: 'Privacy Policy', icon: 'shield-outline', onPress: () => {} },
    { id: '6', title: 'Terms & Conditions', icon: 'document-text-outline', onPress: () => {} },
    { id: '7', title: 'Help & Support', icon: 'help-circle-outline', onPress: () => {} },
    { id: '8', title: 'About', icon: 'information-circle-outline', onPress: () => {} },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>


      <ScrollView style={styles.content}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={Colors.white} />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{user?.name || 'User'}</Text>
              <Text style={styles.userPhone}>{user?.phone || '+91XXXXXXXXXX'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => router.push('/(auth)/profile' as any)}>
            <Ionicons name="chevron-forward" size={24} color={Colors.darkGray} />
          </TouchableOpacity>
        </View>

        {/* Settings Options */}
        <View style={styles.settingsSection}>
          {settingsOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.settingItem} onPress={option.onPress}>
              <View style={styles.settingLeft}>
                <Ionicons name={option.icon as any} size={22} color={Colors.primary} />
                <Text style={styles.settingTitle}>{option.title}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={Colors.danger} />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E7D32',
    paddingHorizontal: 16,
    paddingVertical: 14,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  appBarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appBarTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  settingsSection: {
    backgroundColor: Colors.white,
    marginBottom: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingTitle: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    paddingVertical: 14,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  logoutText: {
    fontSize: 16,
    color: Colors.danger,
    marginLeft: 8,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
});
