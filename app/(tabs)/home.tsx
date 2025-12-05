import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Color';

const concerns = [
  { id: '1', title: 'Hypertension', color: '#FF6B6B', image: require('@/assets/images/Hypertionsion.png') },
  { id: '2', title: 'Anxiety', color: '#4ECDC4', image: require('@/assets/images/Anxiety.png') },
  { id: '3', title: 'Obesity', color: '#FFD166', image: require('@/assets/images/Obesity.png') },
  { id: '4', title: 'Diabetes', color: '#06D6A0', image: require('@/assets/images/diabities.png') },
  { id: '5', title: 'Rubella', color: '#118AB2', image: require('@/assets/images/Rubella.png') },
  { id: '6', title: 'Hypothermia', color: '#073B4C', image: require('@/assets/images/Hypothermia.png') },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        {/* Greeting Section */}
        <View style={styles.greetingSection}>
          <View style={styles.greetingHeader}>
            <View>
              <Text style={styles.greeting}>Hello, John!</Text>
              <Text style={styles.subtitle}>How can we help you today?</Text>
            </View>
          </View>
        </View>

        {/* Wallet Balance */}
        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹ 660</Text>
          </View>
          <TouchableOpacity style={styles.addMoneyButton} onPress={() => router.push('/payment' as any)}>
            <Text style={styles.addMoneyText}>+ Add Money</Text>
          </TouchableOpacity>
        </View>

        {/* Top Concerns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Concerns</Text>
          <View style={styles.concernsGrid}>
            {concerns.map((concern) => (
              <TouchableOpacity
                key={concern.id}
                style={styles.concernCard}
                onPress={() => router.push(`/doctor/${concern.id}?concern=${concern.title}` as any)}>
                <View style={styles.concernImageContainer}>
                  {concern.image && <Image source={concern.image} style={styles.concernImage} />}
                </View>
                <Text style={styles.concernText}>{concern.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.gridActionButton} onPress={() => router.push('/(tabs)/consult')}>
              <Ionicons name="calendar-outline" size={32} color={Colors.primary} />
              <Text style={styles.gridActionText}>Book Appointment</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridActionButton} onPress={() => router.push('/consultation?concern=General' as any)}>
              <Ionicons name="videocam-outline" size={32} color={Colors.primary} />
              <Text style={styles.gridActionText}>Video Consult</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridActionButton} onPress={() => router.push('/chat' as any)}>
              <Ionicons name="chatbubble-outline" size={32} color={Colors.primary} />
              <Text style={styles.gridActionText}>Chat with Doctor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.gridActionButton} onPress={() => router.push('/booking/my-bookings' as any)}>
              <Ionicons name="document-text-outline" size={32} color={Colors.primary} />
              <Text style={styles.gridActionText}>My Orders</Text>
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
  greetingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 12,
    padding: 4,
  },
  greetingSection: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.black,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.darkGray,
    marginTop: 2,
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    marginHorizontal: 16,
    marginVertical: 12,
    padding: 18,
    borderRadius: 12,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
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
    marginTop: 20,
    paddingHorizontal: 16,
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
  },
  concernCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#E8F5E9',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  concernImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  concernImage: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  },
  concernText: {
    color: Colors.black,
    fontWeight: '500',
    fontSize: 11,
    textAlign: 'center',
    paddingHorizontal: 4,
    marginTop: 6,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridActionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    width: '48%',
    aspectRatio: 1,
    marginBottom: 12,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridActionText: {
    marginTop: 8,
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
    fontWeight: '500',
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
