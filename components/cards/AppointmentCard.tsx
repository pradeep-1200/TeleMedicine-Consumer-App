import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';
import { Appointment } from '@/types';

interface AppointmentCardProps {
  appointment: Appointment;
  onStartCall: () => void;
  onViewDetails: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onStartCall,
  onViewDetails,
}) => {
  const getStatusColor = () => {
    switch (appointment.status) {
      case 'upcoming': return Colors.success;
      case 'completed': return Colors.info;
      case 'cancelled': return Colors.danger;
      default: return Colors.darkGray;
    }
  };

  const getStatusText = () => {
    switch (appointment.status) {
      case 'upcoming': return 'Upcoming';
      case 'completed': return 'Completed';
      case 'cancelled': return 'Cancelled';
      default: return '';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.card}>
      {/* Doctor Info */}
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{appointment.doctorName}</Text>
        <Text style={styles.doctorSpecialty}>Orthodontist</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor() }]}>
            {getStatusText()}
          </Text>
        </View>
      </View>

      {/* Appointment Details */}
      <View style={styles.details}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color={Colors.darkGray} />
          <Text style={styles.detailText}>
            {formatDate(appointment.date)}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="time" size={16} color={Colors.darkGray} />
          <Text style={styles.detailText}>{appointment.time}</Text>
        </View>
        <View style={styles.detailRow}>
          <Ionicons name="medical" size={16} color={Colors.darkGray} />
          <Text style={styles.detailText}>
            {appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)} Consultation
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.viewDetailsButton} onPress={onViewDetails}>
          <Text style={styles.viewDetailsText}>View Details</Text>
        </TouchableOpacity>

        {appointment.status === 'upcoming' && (
          <TouchableOpacity style={styles.startCallButton} onPress={onStartCall}>
            <Ionicons name="call" size={16} color={Colors.white} />
            <Text style={styles.startCallText}>Start Call</Text>
          </TouchableOpacity>
        )}

        {appointment.status === 'completed' && (
          <TouchableOpacity style={styles.prescriptionButton}>
            <Ionicons name="document-text" size={16} color={Colors.white} />
            <Text style={styles.prescriptionText}>Check Prescription</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Prescription Note for Completed Appointments */}
      {appointment.status === 'completed' && (
        <Text style={styles.prescriptionNote}>
          Dr. Deepa has suggested some solution
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
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
  doctorInfo: {
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 8,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  details: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  viewDetailsButton: {
    flex: 1,
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewDetailsText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  startCallButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  startCallText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  prescriptionButton: {
    flex: 1,
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  prescriptionText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  prescriptionNote: {
    fontSize: 11,
    color: Colors.darkGray,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.mediumGray,
  },
});

export default AppointmentCard;