import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { useAppointments } from '@/contexts/AppointmentContext';

export default function AppointmentDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { getAppointment } = useAppointments();
  
  const appointment = getAppointment(id as string);

  if (!appointment) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Appointment not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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
          <Text style={styles.headerTitle}>Appointment Details</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Appointment Details Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="calendar" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Type</Text>
              <Text style={styles.detailValue}>
                {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)} Consultation
              </Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>ID</Text>
              <Text style={styles.detailValue}>{appointment.id}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fee</Text>
              <Text style={styles.detailValue}>₹{appointment.amount}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration</Text>
              <Text style={styles.detailValue}>{appointment.duration || 30} minutes</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>{formatDate(appointment.date)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>{appointment.time}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={[styles.detailValue, { color: getStatusColor(appointment.status) }]}>
                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
              </Text>
            </View>
          </View>
        </View>

        {/* Symptoms Details Section */}
        {appointment.symptoms && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="medical" size={20} color={Colors.primary} />
              <Text style={styles.sectionTitle}>Symptoms Details</Text>
              <TouchableOpacity>
                <Ionicons name="chevron-down" size={20} color={Colors.darkGray} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.detailsCard}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Symptoms</Text>
                <Text style={styles.detailValue}>{appointment.symptoms}</Text>
              </View>
              {appointment.severity && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Severity</Text>
                  <Text style={styles.detailValue}>
                    {appointment.severity.charAt(0).toUpperCase() + appointment.severity.slice(1)}
                  </Text>
                </View>
              )}
              {appointment.duration && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Duration</Text>
                  <Text style={styles.detailValue}>{appointment.duration} days</Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Booking Details Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="receipt" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Booking Details</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.detailsCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booked by</Text>
              <Text style={styles.detailValue}>John Doe</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Status</Text>
              <Text style={[styles.detailValue, { color: Colors.success }]}>Paid</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Booking Time</Text>
              <Text style={styles.detailValue}>Today, 2:30 PM</Text>
            </View>
          </View>
        </View>

        {/* Medical Report Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="document-text" size={20} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Medical Report</Text>
            <TouchableOpacity>
              <Ionicons name="chevron-down" size={20} color={Colors.darkGray} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.uploadCard}>
            <Ionicons name="cloud-upload" size={48} color={Colors.mediumGray} />
            <Text style={styles.uploadText}>Upload your medical reports</Text>
            <Text style={styles.uploadSubtext}>PDF, JPG, PNG files supported</Text>
            <TouchableOpacity style={styles.uploadButton}>
              <Text style={styles.uploadButtonText}>Choose Files</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {appointment.status === 'upcoming' && (
            <>
              <TouchableOpacity 
                style={styles.startCallButton}
                onPress={() => router.push(`/call?appointmentId=${appointment.id}`)}
              >
                <Ionicons name="videocam" size={20} color={Colors.white} />
                <Text style={styles.startCallText}>Start Call</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.rescheduleButton}>
                <Text style={styles.rescheduleText}>Reschedule</Text>
              </TouchableOpacity>
            </>
          )}
          
          {appointment.status === 'completed' && (
            <TouchableOpacity style={styles.prescriptionButton}>
              <Ionicons name="document-text" size={20} color={Colors.white} />
              <Text style={styles.prescriptionText}>View Prescription</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'upcoming': return Colors.success;
    case 'completed': return Colors.info;
    case 'cancelled': return Colors.danger;
    default: return Colors.darkGray;
  }
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
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginLeft: 12,
    flex: 1,
  },
  detailsCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  uploadCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.mediumGray,
    borderStyle: 'dashed',
  },
  uploadText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginTop: 16,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 20,
  },
  uploadButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
  actionButtons: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
  startCallButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startCallText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  rescheduleButton: {
    backgroundColor: Colors.transparent,
    borderWidth: 1,
    borderColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  rescheduleText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  prescriptionButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  prescriptionText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: Colors.darkGray,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: Colors.white,
    fontWeight: '600',
  },
});