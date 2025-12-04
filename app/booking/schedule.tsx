import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

const consultationTypes = [
  {
    id: 'phone',
    title: 'Phone Consultation',
    price: 15,
    duration: 20,
    icon: 'call-outline',
  },
  {
    id: 'video',
    title: 'Video Consultation',
    price: 35,
    duration: 30,
    icon: 'videocam-outline',
  },
  {
    id: 'chat',
    title: 'Chat Consultation',
    price: 50,
    duration: 72,
    icon: 'chatbubble-outline',
    description: 'Valid for 30 texts • Valid for 72 hours',
  },
];

export default function ScheduleScreen() {
  const { doctorId } = useLocalSearchParams();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleProceed = () => {
    if (selectedType) {
      router.push(`/booking/date?doctorId=${doctorId}&type=${selectedType}` as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Choose Consultation Type</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.doctorInfo}>
          <Text style={styles.doctorName}>Dr. Prem</Text>
          <Text style={styles.specialty}>Gynecology + 2 others</Text>
        </View>

        <View style={styles.typesContainer}>
          {consultationTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeCard,
                selectedType === type.id && styles.selectedCard,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <View style={styles.typeHeader}>
                <Ionicons 
                  name={type.icon as any} 
                  size={24} 
                  color={selectedType === type.id ? Colors.primary : Colors.darkGray} 
                />
                <Text style={[
                  styles.typeTitle,
                  selectedType === type.id && styles.selectedText,
                ]}>
                  {type.title}
                </Text>
              </View>
              
              <Text style={[
                styles.typePrice,
                selectedType === type.id && styles.selectedText,
              ]}>
                ₹{type.price}{type.id === 'chat' ? ' total' : '/min'}
              </Text>
              
              <Text style={styles.typeDuration}>
                {type.id === 'chat' 
                  ? type.description 
                  : `Duration: ${type.duration} mins`
                }
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[
            styles.proceedButton,
            !selectedType && styles.disabledButton,
          ]}
          onPress={handleProceed}
          disabled={!selectedType}
        >
          <Text style={[
            styles.proceedText,
            !selectedType && styles.disabledText,
          ]}>
            Proceed
          </Text>
        </TouchableOpacity>
      </View>
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
  doctorInfo: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
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
  },
  typesContainer: {
    gap: 16,
    marginBottom: 32,
  },
  typeCard: {
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.mediumGray,
  },
  selectedCard: {
    borderColor: Colors.primary,
    backgroundColor: Colors.accent,
  },
  typeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginLeft: 12,
  },
  selectedText: {
    color: Colors.primary,
  },
  typePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  typeDuration: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  proceedButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.mediumGray,
  },
  proceedText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  disabledText: {
    color: Colors.darkGray,
  },
});