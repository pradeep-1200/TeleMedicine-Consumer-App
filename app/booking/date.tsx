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

const days = [
  { date: '06 Feb', day: 'Friday', fullDate: '2024-02-06' },
  { date: '07 Feb', day: 'Saturday', fullDate: '2024-02-07' },
  { date: '08 Feb', day: 'Sunday', fullDate: '2024-02-08' },
  { date: '09 Feb', day: 'Monday', fullDate: '2024-02-09' },
  { date: '10 Feb', day: 'Tuesday', fullDate: '2024-02-10' },
  { date: '11 Feb', day: 'Wednesday', fullDate: '2024-02-11' },
  { date: '12 Feb', day: 'Thursday', fullDate: '2024-02-12' },
  { date: '13 Feb', day: 'Friday', fullDate: '2024-02-13' },
  { date: '14 Feb', day: 'Saturday', fullDate: '2024-02-14' },
  { date: '15 Feb', day: 'Sunday', fullDate: '2024-02-15' },
  { date: '16 Feb', day: 'Monday', fullDate: '2024-02-16' },
  { date: '17 Feb', day: 'Tuesday', fullDate: '2024-02-17' },
];

export default function DateSelectionScreen() {
  const params = useLocalSearchParams();
  const doctorId = params.doctorId as string;
  const consultationType = params.type as string;
  
  const [selectedDate, setSelectedDate] = useState('2024-02-06');

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleConfirm = () => {
    router.push(`/booking/time?type=${consultationType}&doctorId=${doctorId}&date=${selectedDate}` as any);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Choose Date</Text>
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
          </View>
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pick Appointment Date</Text>
          
          <View style={styles.calendarGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={day.fullDate}
                style={[
                  styles.dayCard,
                  selectedDate === day.fullDate && styles.dayCardSelected,
                ]}
                onPress={() => handleDateSelect(day.fullDate)}>
                <Text
                  style={[
                    styles.dayDate,
                    selectedDate === day.fullDate && styles.dayDateSelected,
                  ]}>
                  {day.date}
                </Text>
                <Text
                  style={[
                    styles.dayName,
                    selectedDate === day.fullDate && styles.dayNameSelected,
                  ]}>
                  {day.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Selected Date Display */}
        <View style={styles.selectedDateContainer}>
          <Ionicons name="calendar" size={24} color={Colors.primary} />
          <Text style={styles.selectedDateText}>
            {days.find(d => d.fullDate === selectedDate)?.date}{' '}
            {new Date(selectedDate).getFullYear()}
          </Text>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Ionicons name="time" size={24} color={Colors.warning} />
          <View style={styles.notesContent}>
            <Text style={styles.notesTitle}>Availability Notice</Text>
            <Text style={styles.notesText}>
              • Doctor&apos;s availability may change{'\n'}
              • Weekends may have longer wait times{'\n'}
              • Public holidays might affect scheduling
            </Text>
          </View>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm Date</Text>
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
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCard: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    padding: 8,
  },
  dayCardSelected: {
    backgroundColor: Colors.primary,
  },
  dayDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  dayDateSelected: {
    color: Colors.white,
  },
  dayName: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  dayNameSelected: {
    color: Colors.white,
  },
  selectedDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: Colors.accent,
    marginHorizontal: 20,
    borderRadius: 12,
    marginTop: 20,
  },
  selectedDateText: {
    fontSize: 18,
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
    color: Colors.warning,
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
  confirmButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});