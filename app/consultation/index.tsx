import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

const doctors = [
  {
    id: '1',
    name: 'Dr. Prem',
    specialty: 'Gynecology + 2 others',
    languages: ['English', 'Hindi'],
    experience: 8,
    rating: 4.8,
    pricePerMin: 15,
    freeMinutes: 5,
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialty: 'Internal Medicine',
    languages: ['English'],
    experience: 12,
    rating: 4.9,
    pricePerMin: 20,
    freeMinutes: 3,
  },
];

export default function ConsultationScreen() {
  const { concern } = useLocalSearchParams();

  const handleFreeCall = (doctorId: string) => {
    router.push(`/call?doctorId=${doctorId}&type=free`);
  };

  const handleSchedule = (doctorId: string) => {
    router.push(`/booking/schedule?doctorId=${doctorId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Doctors for {concern}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content}>
        {doctors.map((doctor) => (
          <View key={doctor.id} style={styles.doctorCard}>
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.specialty}>{doctor.specialty}</Text>
              <Text style={styles.languages}>
                Languages: {doctor.languages.join(', ')}
              </Text>
              <Text style={styles.experience}>
                {doctor.experience} years experience
              </Text>
              <View style={styles.ratingRow}>
                <Ionicons name="star" size={16} color={Colors.warning} />
                <Text style={styles.rating}>{doctor.rating}</Text>
              </View>
              <Text style={styles.price}>
                ₹{doctor.pricePerMin}/min + {doctor.freeMinutes} mins free
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={styles.freeCallButton}
                onPress={() => handleFreeCall(doctor.id)}
              >
                <Text style={styles.freeCallText}>Free Call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.scheduleButton}
                onPress={() => handleSchedule(doctor.id)}
              >
                <Text style={styles.scheduleText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  doctorCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  doctorInfo: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  languages: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  experience: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.darkGray,
    marginLeft: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  freeCallButton: {
    flex: 1,
    backgroundColor: Colors.success,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  freeCallText: {
    color: Colors.white,
    fontWeight: '600',
  },
  scheduleButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  scheduleText: {
    color: Colors.white,
    fontWeight: '600',
  },
});