import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';
import { useAppointments } from '@/contexts/AppointmentContext';
import AppointmentCard from '@/components/cards/AppointmentCard';

const filters = ['All', 'Upcoming', 'Completed', 'Cancelled'];

export default function MyBookingsScreen() {
  const { appointments } = useAppointments();
  const [activeTab, setActiveTab] = useState('Appointments');
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredAppointments = appointments.filter((appt) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Upcoming') return appt.status === 'upcoming';
    if (selectedFilter === 'Completed') return appt.status === 'completed';
    if (selectedFilter === 'Cancelled') return appt.status === 'cancelled';
    return true;
  });

  const handleStartCall = (appointmentId: string) => {
    // Show disclaimer modal first
    router.push({
      pathname: '/booking/disclaimer',
      params: { appointmentId },
    });
  };

  const handleViewDetails = (appointmentId: string) => {
    router.push(`/booking/details/${appointmentId}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.black} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Appointments' && styles.activeTab]}
          onPress={() => setActiveTab('Appointments')}>
          <Text style={[styles.tabText, activeTab === 'Appointments' && styles.activeTabText]}>
            Appointments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Orders' && styles.activeTab]}
          onPress={() => setActiveTab('Orders')}>
          <Text style={[styles.tabText, activeTab === 'Orders' && styles.activeTabText]}>
            Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* Filter */}
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filter Appointments</Text>
        <TouchableOpacity style={styles.filterDropdown}>
          <Text style={styles.filterText}>{selectedFilter}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.darkGray} />
        </TouchableOpacity>
        <View style={styles.filterOptions}>
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterOption,
                selectedFilter === filter && styles.filterOptionSelected,
              ]}
              onPress={() => setSelectedFilter(filter)}>
              <Text
                style={[
                  styles.filterOptionText,
                  selectedFilter === filter && styles.filterOptionTextSelected,
                ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Content */}
      {activeTab === 'Appointments' ? (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppointmentCard
              appointment={item}
              onStartCall={() => handleStartCall(item.id)}
              onViewDetails={() => handleViewDetails(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="calendar" size={64} color={Colors.mediumGray} />
              <Text style={styles.emptyText}>No appointments found</Text>
              <Text style={styles.emptySubtext}>
                Book your first consultation to get started
              </Text>
              <TouchableOpacity
                style={styles.bookButton}
                onPress={() => router.push('/(tabs)/consult')}>
                <Text style={styles.bookButtonText}>Book Appointment</Text>
              </TouchableOpacity>
            </View>
          }
        />
      ) : (
        <View style={styles.ordersContainer}>
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt" size={64} color={Colors.mediumGray} />
            <Text style={styles.emptyText}>No orders found</Text>
            <Text style={styles.emptySubtext}>
              Your prescriptions and medical orders will appear here
            </Text>
          </View>
        </View>
      )}

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.quickActionButton}
          onPress={() => router.push('/(tabs)/consult')}>
          <Ionicons name="add" size={24} color={Colors.white} />
          <Text style={styles.quickActionText}>New Booking</Text>
        </TouchableOpacity>
      </View>
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
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: Colors.darkGray,
    fontWeight: '500',
  },
  activeTabText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  filterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  filterLabel: {
    fontSize: 14,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  filterDropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  filterText: {
    fontSize: 14,
    color: Colors.black,
  },
  filterOptions: {
    flexDirection: 'row',
    marginTop: 12,
    flexWrap: 'wrap',
  },
  filterOption: {
    backgroundColor: Colors.lightGray,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterOptionSelected: {
    backgroundColor: Colors.primary,
  },
  filterOptionText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  filterOptionTextSelected: {
    color: Colors.white,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.mediumGray,
    textAlign: 'center',
    marginBottom: 24,
  },
  bookButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bookButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  quickActions: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  quickActionButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  quickActionText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  ordersContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
});