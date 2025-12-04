import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import ConcernCard from '@/components/cards/ConcernCard';

const concerns = [
  { id: '1', title: 'Hypertension', color: '#FF6B6B' },
  { id: '2', title: 'Anxiety', color: '#4ECDC4' },
  { id: '3', title: 'Obesity', color: '#FFD166' },
  { id: '4', title: 'Diabetes', color: '#06D6A0' },
  { id: '5', title: 'Rubella', color: '#118AB2' },
  { id: '6', title: 'Hypothermia', color: '#073B4C' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, John!</Text>
            <Text style={styles.subtitle}>How can we help you today?</Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Ionicons name="person-circle-outline" size={32} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Wallet Balance */}
        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹ 660</Text>
          </View>
          <TouchableOpacity style={styles.addMoneyButton}>
            <Text style={styles.addMoneyText}>+ Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Top Concerns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Concerns</Text>
          <View style={styles.concernsGrid}>
            {concerns.map((concern) => (
              <ConcernCard key={concern.id} concern={concern} />
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/(tabs)/consult')}>
              <Ionicons name="calendar-outline" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/consultation?concern=General' as any)}>
              <Ionicons name="videocam-outline" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>Video Consult</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/booking/my-bookings' as any)}>
              <Ionicons name="document-text-outline" size={24} color={Colors.primary} />
              <Text style={styles.actionText}>My Bookings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Appointments */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Appointments</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.appointmentCard}>
            <View style={styles.appointmentHeader}>
              <Text style={styles.doctorName}>Dr. Prem</Text>
              <Text style={styles.appointmentStatus}>Completed</Text>
            </View>
            <Text style={styles.appointmentType}>Phone Consultation</Text>
            <Text style={styles.appointmentDate}>23 Nov 2023 • 17:28 PM</Text>
            <TouchableOpacity style={styles.viewDetailsButton} onPress={() => router.push('/booking/my-bookings' as any)}>
              <Text style={styles.viewDetailsText}>View Details</Text>
            </TouchableOpacity>
          </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginVertical: 16,
    padding: 20,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  walletLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  walletAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  addMoneyButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addMoneyText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  concernsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: -6,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 12,
    borderRadius: 12,
    flex: 1,
    minWidth: 100,
    marginHorizontal: 4,
    marginVertical: 4,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionText: {
    marginTop: 8,
    fontSize: 11,
    color: Colors.darkGray,
    textAlign: 'center',
    flexShrink: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  appointmentCard: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  appointmentStatus: {
    fontSize: 12,
    color: Colors.success,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  appointmentType: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  appointmentDate: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 12,
  },
  viewDetailsButton: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: Colors.primary,
    fontWeight: '600',
  },
});