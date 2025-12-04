import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Color';

const concerns = ['Diabetes', 'Hypertension', 'Anxiety', 'Obesity', 'Other'];
const severityLevels = ['Mild', 'Moderate', 'Severe'];
const durationUnits = ['Days', 'Weeks', 'Months', 'Year'];

export default function SymptomsScreen() {
  const params = useLocalSearchParams();
  const doctorId = params.doctorId as string;
  const consultationType = params.type as string;
  const selectedDate = params.date as string;
  const selectedTime = params.time as string;
  
  const [selectedConcern, setSelectedConcern] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [durationUnit, setDurationUnit] = useState('Days');
  const [description, setDescription] = useState('');

  const handleProceed = () => {
    if (!selectedConcern || !selectedSeverity || !duration) return;
    
    router.push({
      pathname: '/booking/confirm' as any,
      params: {
        doctorId,
        type: consultationType,
        date: selectedDate,
        time: selectedTime,
        concern: selectedConcern,
        severity: selectedSeverity,
        duration: duration,
        durationUnit: durationUnit,
        description: description,
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
          <Text style={styles.headerTitle}>Your Concern</Text>
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
            <Text style={styles.doctorSpecialty}>Gynecology + 2 others</Text>
            <Text style={styles.consultationType}>
              Instant Call - ₹ 15/min
            </Text>
          </View>
        </View>

        {/* Concern Selection */}
        <View style={styles.section}>
          <Text style={styles.label}>Please select a concern</Text>
          <View style={styles.concernGrid}>
            {concerns.map((concern) => (
              <TouchableOpacity
                key={concern}
                style={[
                  styles.concernButton,
                  selectedConcern === concern && styles.concernButtonSelected,
                ]}
                onPress={() => setSelectedConcern(concern)}>
                <Text
                  style={[
                    styles.concernButtonText,
                    selectedConcern === concern && styles.concernButtonTextSelected,
                  ]}>
                  {concern}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Severity Selection */}
          <Text style={styles.label}>Select severity of your concern</Text>
          <View style={styles.severityContainer}>
            {severityLevels.map((severity) => (
              <TouchableOpacity
                key={severity}
                style={[
                  styles.severityButton,
                  selectedSeverity === severity && styles.severityButtonSelected,
                ]}
                onPress={() => setSelectedSeverity(severity)}>
                <View style={styles.severityRadio}>
                  {selectedSeverity === severity && (
                    <View style={styles.severityRadioSelected} />
                  )}
                </View>
                <Text
                  style={[
                    styles.severityText,
                    selectedSeverity === severity && styles.severityTextSelected,
                  ]}>
                  {severity}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Duration */}
          <Text style={styles.label}>How long have you been facing?</Text>
          <View style={styles.durationContainer}>
            <TextInput
              style={styles.durationInput}
              placeholder="Enter duration"
              placeholderTextColor={Colors.darkGray}
              keyboardType="numeric"
              value={duration}
              onChangeText={setDuration}
            />
            <View style={styles.unitContainer}>
              {durationUnits.map((unit) => (
                <TouchableOpacity
                  key={unit}
                  style={[
                    styles.unitButton,
                    durationUnit === unit && styles.unitButtonSelected,
                  ]}
                  onPress={() => setDurationUnit(unit)}>
                  <Text
                    style={[
                      styles.unitText,
                      durationUnit === unit && styles.unitTextSelected,
                    ]}>
                    {unit}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Description */}
          <Text style={styles.label}>Additional details (optional)</Text>
          <TextInput
            style={styles.descriptionInput}
            placeholder="Describe your symptoms in detail..."
            placeholderTextColor={Colors.darkGray}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Ionicons name="alert-circle" size={24} color={Colors.warning} />
          <View style={styles.notesContent}>
            <Text style={styles.notesTitle}>Important</Text>
            <Text style={styles.notesText}>
              • Provide accurate information for better diagnosis{'\n'}
              • Mention all current medications{'\n'}
              • Share any previous medical history if relevant
            </Text>
          </View>
        </View>

        {/* Proceed Button */}
        <TouchableOpacity
          style={[
            styles.proceedButton,
            (!selectedConcern || !selectedSeverity || !duration) && styles.proceedButtonDisabled,
          ]}
          onPress={handleProceed}
          disabled={!selectedConcern || !selectedSeverity || !duration}>
          <Text style={styles.proceedButtonText}>
            {(!selectedConcern || !selectedSeverity || !duration)
              ? 'Fill all required fields'
              : 'Proceed'}
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
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  concernGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  concernButton: {
    width: '30%',
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  concernButtonSelected: {
    backgroundColor: Colors.primary,
  },
  concernButtonText: {
    fontSize: 12,
    color: Colors.black,
    fontWeight: '500',
  },
  concernButtonTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  severityButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  severityButtonSelected: {
    backgroundColor: Colors.accent,
  },
  severityRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  severityRadioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  severityText: {
    fontSize: 14,
    color: Colors.black,
  },
  severityTextSelected: {
    color: Colors.primary,
    fontWeight: '600',
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  durationInput: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    color: Colors.black,
    marginRight: 12,
  },
  unitContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'space-between',
  },
  unitButton: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    marginBottom: 8,
    width: '48%',
    alignItems: 'center',
  },
  unitButtonSelected: {
    backgroundColor: Colors.primary,
  },
  unitText: {
    fontSize: 12,
    color: Colors.black,
  },
  unitTextSelected: {
    color: Colors.white,
    fontWeight: '600',
  },
  descriptionInput: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 14,
    color: Colors.black,
    minHeight: 100,
    textAlignVertical: 'top',
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
  proceedButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginVertical: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  proceedButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  proceedButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});