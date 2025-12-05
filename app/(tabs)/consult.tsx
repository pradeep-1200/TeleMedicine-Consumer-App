import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';

const concerns = [
  { id: '1', title: 'Hypertension', color: '#FF6B6B', image: require('@/assets/images/Hypertionsion.png') },
  { id: '2', title: 'Anxiety', color: '#4ECDC4', image: require('@/assets/images/Anxiety.png') },
  { id: '3', title: 'Obesity', color: '#FFD166', image: require('@/assets/images/Obesity.png') },
  { id: '4', title: 'Diabetes', color: '#06D6A0', image: require('@/assets/images/diabities.png') },
  { id: '5', title: 'Hypertension', color: '#118AB2', image: require('@/assets/images/Hypertionsion.png') },
  { id: '6', title: 'Diabetes', color: '#073B4C', image: require('@/assets/images/diabities.png') },
  { id: '7', title: 'Rubella', color: '#7209B7', image: require('@/assets/images/Rubella.png') },
  { id: '8', title: 'Hypothermia', color: '#F72585', image: require('@/assets/images/Hypothermia.png') },
  { id: '9', title: 'Frostbite', color: '#3A0CA3', image: require('@/assets/images/Frostbite.png') },
];

export default function ConsultScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>

      <ScrollView>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color={Colors.darkGray} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for doctors, specialties, or concerns"
            placeholderTextColor={Colors.darkGray}
          />
        </View>

        {/* Popular Concerns */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Concern</Text>
          <View style={styles.concernsGrid}>
            {concerns.map((concern) => (
              <TouchableOpacity
                key={concern.id}
                style={styles.concernCard}
                onPress={() => router.push(`/doctor/${concern.id}?concern=${concern.title}`)}>
                <View style={styles.concernImageContainer}>
                  {concern.image && <Image source={concern.image} style={styles.concernImage} />}
                </View>
                <Text style={styles.concernText}>{concern.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Top Doctors */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Doctors</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.doctorCard}>
                <View style={styles.doctorImagePlaceholder}>
                  <Ionicons name="person" size={40} color={Colors.white} />
                </View>
                <Text style={styles.doctorName}>Dr. Prem</Text>
                <Text style={styles.doctorSpecialty}>Gynecology</Text>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFD700" />
                  <Text style={styles.ratingText}>4.5</Text>
                </View>
                <TouchableOpacity style={styles.consultButton}>
                  <Text style={styles.consultButtonText}>Consult</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Quick Consultation */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Consultation</Text>
          <View style={styles.quickConsultContainer}>
            <TouchableOpacity style={styles.quickConsultCard}>
              <View style={styles.quickConsultIcon}>
                <Ionicons name="videocam" size={30} color={Colors.primary} />
              </View>
              <Text style={styles.quickConsultTitle}>Video Call</Text>
              <Text style={styles.quickConsultDesc}>Connect instantly</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickConsultCard}>
              <View style={styles.quickConsultIcon}>
                <Ionicons name="call" size={30} color={Colors.primary} />
              </View>
              <Text style={styles.quickConsultTitle}>Audio Call</Text>
              <Text style={styles.quickConsultDesc}>Quick & easy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickConsultCard}>
              <View style={styles.quickConsultIcon}>
                <Ionicons name="chatbubble" size={30} color={Colors.primary} />
              </View>
              <Text style={styles.quickConsultTitle}>Chat</Text>
              <Text style={styles.quickConsultDesc}>24/7 available</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Emergency */}
        <View style={styles.section}>
          <View style={styles.emergencyCard}>
            <Ionicons name="alert-circle" size={40} color={Colors.danger} />
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Emergency Assistance</Text>
              <Text style={styles.emergencyDesc}>Need immediate help? Connect with emergency services</Text>
            </View>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={styles.emergencyButtonText}>Call Now</Text>
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
    backgroundColor: Colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: Colors.black,
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
  doctorCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    width: 150,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  doctorImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  consultButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    width: '100%',
    alignItems: 'center',
  },
  consultButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  quickConsultContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickConsultCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  quickConsultIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickConsultTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  quickConsultDesc: {
    fontSize: 12,
    color: Colors.darkGray,
    textAlign: 'center',
  },
  emergencyCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.danger,
    elevation: 3,
    shadowColor: Colors.danger,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  emergencyContent: {
    flex: 1,
    marginHorizontal: 16,
  },
  emergencyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.danger,
    marginBottom: 4,
  },
  emergencyDesc: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  emergencyButton: {
    backgroundColor: Colors.danger,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  emergencyButtonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 12,
  },
});
