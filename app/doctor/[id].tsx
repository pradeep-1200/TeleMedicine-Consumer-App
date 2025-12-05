import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, router } from 'expo-router';
import Colors from '@/constants/Color';

const doctors = [
  {
    id: '1',
    name: 'Dr. Prem',
    specialty: 'Gynecology + 2 others',
    languages: ['Hindi', 'English', 'Telugu'],
    experience: 7,
    rating: 4.5,
    pricePerMin: 15,
    freeMinutes: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Prem',
    specialty: 'Gynecology + 2 others',
    languages: ['Hindi', 'English', 'Telugu'],
    experience: 7,
    rating: 4.5,
    pricePerMin: 15,
    freeMinutes: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
  },
  {
    id: '3',
    name: 'Dr. Prem',
    specialty: 'Gynecology + 2 others',
    languages: ['Hindi', 'English', 'Telugu'],
    experience: 7,
    rating: 4.5,
    pricePerMin: 15,
    freeMinutes: 5,
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    isOnline: true,
  },
];

const filters = ['All', 'Hair', 'Diabetes', 'Dental'];

export default function DoctorListScreen() {
  const params = useLocalSearchParams();
  const concern = params.concern as string;
  const [selectedFilter, setSelectedFilter] = useState('All');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.push('/(tabs)/consult');
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* App Bar / Header */}
      <View style={styles.appBar}>
        <View style={styles.appBarContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.appBarTitle}>Select Doctor</Text>
          <View style={styles.walletBadge}>
            <Ionicons name="wallet-outline" size={16} color={Colors.primary} />
            <Text style={styles.walletText}>₹ 150</Text>
          </View>
        </View>
      </View>

      {/* Filters */}
      <View style={styles.filterSection}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.filterTextActive,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.filterIconButton}>
          <Ionicons name="options-outline" size={20} color={Colors.black} />
          <Text style={styles.filterLabel}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Doctor List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <View style={styles.doctorHeader}>
                <Text style={styles.doctorName}>{item.name}</Text>
                {item.isOnline && <View style={styles.onlineIndicator} />}
              </View>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <Text style={styles.languageText}>
                {item.languages.join(', ')}
              </Text>
              <Text style={styles.doctorExperience}>
                Exp : {item.experience}years
              </Text>
              <View style={styles.priceRow}>
                <Text style={styles.priceText}>
                  ₹ {item.pricePerMin}/min{' '}
                </Text>
                <Text style={styles.freeText}>Free ({item.freeMinutes}min)</Text>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <View style={styles.ratingBadge}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <TouchableOpacity
                style={styles.freeCallButton}
                onPress={() => router.push(`/call?doctorId=${item.id}` as any)}>
                <Text style={styles.freeCallText}>Free Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() =>
                  router.push(`/booking/schedule?doctorId=${item.id}` as any)
                }>
                <Text style={styles.scheduleText}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  appBar: {
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  appBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 4,
  },
  appBarTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 16,
  },
  walletBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  walletText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  filterContainer: {
    flex: 1,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.black,
  },
  filterText: {
    color: Colors.darkGray,
    fontSize: 14,
    fontWeight: '500',
  },
  filterTextActive: {
    color: Colors.white,
  },
  filterIconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  filterLabel: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.black,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    elevation: 1,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  doctorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginRight: 6,
  },
  onlineIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  doctorSpecialty: {
    fontSize: 13,
    color: Colors.darkGray,
    marginBottom: 2,
  },
  languageText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 2,
  },
  doctorExperience: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.black,
  },
  freeText: {
    fontSize: 11,
    color: '#D32F2F',
    fontWeight: '500',
  },
  actionsContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingLeft: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 2,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  freeCallButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },
  freeCallText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
    minWidth: 90,
    alignItems: 'center',
  },
  scheduleText: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '500',
  },
});
