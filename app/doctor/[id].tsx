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
  },
  // Add more doctors...
];

const filters = ['All', 'Hair', 'Diabetes', 'Dental'];

export default function DoctorListScreen() {
  const params = useLocalSearchParams();
  const concern = params.concern as string;
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [priceFilter, setPriceFilter] = useState<number | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Select Doctor</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Concern Banner */}
      {concern && (
        <View style={styles.concernBanner}>
          <Text style={styles.concernText}>Concern: {concern}</Text>
        </View>
      )}

      {/* Filters */}
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
        <TouchableOpacity style={styles.priceFilterButton}>
          <Text style={styles.priceFilterText}>₹ 150</Text>
          <Ionicons name="filter-outline" size={16} color={Colors.primary} />
        </TouchableOpacity>
      </ScrollView>

      {/* Doctor List */}
      <FlatList
        data={doctors}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.doctorCard}>
            <Image source={{ uri: item.image }} style={styles.doctorImage} />
            <View style={styles.doctorInfo}>
              <Text style={styles.doctorName}>{item.name}</Text>
              <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
              <View style={styles.languageContainer}>
                {item.languages.map((lang, index) => (
                  <Text key={lang} style={styles.languageText}>
                    {lang}
                    {index < item.languages.length - 1 ? ', ' : ''}
                  </Text>
                ))}
              </View>
              <Text style={styles.doctorExperience}>
                Exp: {item.experience} years
              </Text>
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>₹ {item.pricePerMin}/min</Text>
                <Text style={styles.freeText}>Free ({item.freeMinutes}min)</Text>
              </View>
            </View>
            <View style={styles.actionsContainer}>
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>
              <TouchableOpacity
                style={styles.freeCallButton}
                onPress={() => router.push(`/call?doctorId=${item.id}` as any)}>
                <Text style={styles.freeCallText}>Free Call</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.scheduleButton}
                onPress={() => router.push(`/booking/schedule?doctorId=${item.id}` as any)}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  concernBanner: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  concernText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginRight: 8,
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    color: Colors.darkGray,
    fontSize: 14,
  },
  filterTextActive: {
    color: Colors.white,
  },
  priceFilterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    marginLeft: 8,
  },
  priceFilterText: {
    color: Colors.primary,
    marginRight: 4,
    fontSize: 14,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  doctorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 4,
  },
  languageText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  doctorExperience: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primary,
    marginRight: 8,
  },
  freeText: {
    fontSize: 12,
    color: Colors.success,
    backgroundColor: Colors.accent,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  actionsContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  freeCallButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    width: 80,
    alignItems: 'center',
  },
  freeCallText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  scheduleButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    width: 80,
    alignItems: 'center',
  },
  scheduleText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
});