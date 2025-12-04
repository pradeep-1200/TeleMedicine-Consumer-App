import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Color';

const timeSlots = {
  morning: ['09:00 AM', '09:35 AM', '10:05 AM', '10:35 AM', '11:05 AM'],
  afternoon: ['12:00 PM', '12:35 PM', '01:05 PM', '01:35 PM', '02:05 PM'],
  evening: ['06:00 PM', '06:35 PM', '07:05 PM', '07:35 PM', '08:05 PM'],
};

export default function TimeSelectionScreen() {
  const params = useLocalSearchParams();
  const doctorId = params.doctorId as string;
  const consultationType = params.type as string;
  const selectedDate = params.date as string;
  
  const [selectedTime, setSelectedTime] = useState('');

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirm = () => {
    if (!selectedTime) return;
    
    router.push({
      pathname: '/booking/symptoms' as any,
      params: {
        doctorId,
        type: consultationType,
        date: selectedDate,
        time: selectedTime,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Time Slot</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Doctor Info */}
        <View style={styles.doctorInfo}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.doctorImage}
          />
          <View style={styles.doctorDetails}>
            <Text style={styles.doctorName}>Dr. Prem</Text>
            <Text style={styles.doctorSpecialty}>Male-Female Infertility</Text>
            <Text style={styles.consultationType}>
              {consultationType === 'phone' && 'Phone Consultation - Free'}
              {consultationType === 'video' && 'Video Consultation'}
              {consultationType === 'chat' && 'Chat Consultation - Free'}
            </Text>
          </View>
        </View>

        {/* Time Slots */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick a time slot</Text>

          {/* Morning Slots */}
          <Text style={styles.timeSlotTitle}>Morning</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.morning.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlotButton,
                  selectedTime === time && styles.timeSlotButtonSelected,
                ]}
                onPress={() => handleTimeSelect(time)}>
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Afternoon Slots */}
          <Text style={styles.timeSlotTitle}>Afternoon</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.afternoon.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlotButton,
                  selectedTime === time && styles.timeSlotButtonSelected,
                ]}
                onPress={() => handleTimeSelect(time)}>
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Evening Slots */}
          <Text style={styles.timeSlotTitle}>Evening</Text>
          <View style={styles.timeSlotGrid}>
            {timeSlots.evening.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlotButton,
                  selectedTime === time && styles.timeSlotButtonSelected,
                ]}
                onPress={() => handleTimeSelect(time)}>
                <Text
                  style={[
                    styles.timeSlotText,
                    selectedTime === time && styles.timeSlotTextSelected,
                  ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Time Display */}
        {selectedTime && (
          <View style={styles.selectedTimeContainer}>
            <Ionicons name="time" size={24} color={Colors.primary} />
            <Text style={styles.selectedTimeText}>
              Selected Time: {selectedTime}
            </Text>
          </View>
        )}

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Ionicons name="information-circle" size={24} color={Colors.info} />
          <View style={styles.notesContent}>
            <Text style={styles.notesTitle}>Time Slot Information</Text>
            <Text style={styles.notesText}>
              • Each slot is 30-35 minutes{'\n'}
              • Please join 5 minutes before your scheduled time{'\n'}
              • Late arrivals may result in appointment cancellation
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity
          style={[styles.confirmButton, !selectedTime && styles.confirmButtonDisabled]}
          onPress={handleConfirm}
          disabled={!selectedTime}>
          <Text style={styles.confirmButtonText}>
            {selectedTime ? 'Confirm Appointment' : 'Select a Time Slot'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
  },
  doctorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: Colors.lightGray,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  doctorDetails: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  consultationType: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
  },
  timeSlotTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
    marginTop: 16,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlotButton: {
    width: '30%',
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  timeSlotButtonSelected: {
    backgroundColor: Colors.primary,
  },
  timeSlotText: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: '500',
  },
  timeSlotTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.accent,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  selectedTimeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginLeft: 8,
  },
  notesCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  notesContent: {
    flex: 1,
    marginLeft: 12,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.info,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 12,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  confirmButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginVertical: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});