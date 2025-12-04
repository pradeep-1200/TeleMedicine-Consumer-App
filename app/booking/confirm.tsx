import React from 'react';
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
import { useAuth } from '@/contexts/AuthContext';
import { useAppointments } from '@/contexts/AppointmentContext';

export default function ConfirmationScreen() {
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const { addAppointment } = useAppointments();

  const doctorId = params.doctorId as string;
  const consultationType = params.type as string;
  const selectedDate = params.date as string;
  const selectedTime = params.time as string;
  const concern = params.concern as string;
  const severity = params.severity as string;
  const duration = params.duration as string;
  const durationUnit = params.durationUnit as string;

  const getConsultationFee = () => {
    switch (consultationType) {
      case 'phone': return 15;
      case 'video': return 35;
      case 'chat': return 50;
      default: return 0;
    }
  };

  const handleConfirm = () => {
    // Create appointment object
    const appointment = {
      id: `APP_${Date.now()}`,
      doctorId,
      doctorName: 'Dr. Prem',
      date: selectedDate,
      time: selectedTime,
      type: consultationType as 'phone' | 'video' | 'chat',
      status: 'upcoming' as const,
      symptoms: concern,
      severity: severity as 'mild' | 'moderate' | 'severe',
      duration: parseInt(duration),
      amount: getConsultationFee(),
    };

    addAppointment(appointment);
    router.push('/booking/payment');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getConsultationTypeText = () => {
    switch (consultationType) {
      case 'phone': return 'Phone Consultation';
      case 'video': return 'Video Consultation';
      case 'chat': return 'Chat Consultation';
      default: return 'Consultation';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Basic Info</Text>
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
              {getConsultationTypeText()} - ₹ {getConsultationFee()}
            </Text>
          </View>
        </View>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Please confirm your basic information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{user?.gender || 'Prefer not to say'}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{user?.age || '28'} years</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{user?.height || '171'} cms</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{user?.weight || '63'} kg</Text>
          </View>

          {/* Appointment Details */}
          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>Appointment Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>{formatDate(selectedDate)}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time:</Text>
              <Text style={styles.detailValue}>{selectedTime}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Consultation Type:</Text>
              <Text style={styles.detailValue}>{getConsultationTypeText()}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Concern:</Text>
              <Text style={styles.detailValue}>{concern}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Severity:</Text>
              <Text style={styles.detailValue}>{severity}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Duration:</Text>
              <Text style={styles.detailValue}>{duration} {durationUnit}</Text>
            </View>
          </View>

          {/* Wallet Balance */}
          <View style={styles.walletCard}>
            <Text style={styles.walletLabel}>Current Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹ {user?.walletBalance || 660}</Text>
            <TouchableOpacity style={styles.addMoneyButton}>
              <Text style={styles.addMoneyText}>+ Add Money</Text>
            </TouchableOpacity>
          </View>

          {/* Cost Summary */}
          <View style={styles.costCard}>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Consultation Fee</Text>
              <Text style={styles.costValue}>₹ {getConsultationFee()}</Text>
            </View>
            <View style={styles.costRow}>
              <Text style={styles.costLabel}>Service Charges</Text>
              <Text style={styles.costValue}>₹ 0</Text>
            </View>
            <View style={[styles.costRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalValue}>₹ {getConsultationFee()}</Text>
            </View>
          </View>
        </View>

        {/* Terms and Conditions */}
        <View style={styles.termsCard}>
          <TouchableOpacity style={styles.termsCheckbox}>
            <Ionicons name="checkbox" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            I agree to the Terms & Conditions and understand that consultation fees are non-refundable.
          </Text>
        </View>

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirm & Proceed to Payment</Text>
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
    marginBottom: 24,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.mediumGray,
  },
  infoLabel: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  detailsCard: {
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
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
  walletCard: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  walletLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  walletAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  addMoneyButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addMoneyText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: '600',
  },
  costCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  costRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  costLabel: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  costValue: {
    fontSize: 14,
    color: Colors.black,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: Colors.mediumGray,
    paddingTop: 12,
    marginTop: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  termsCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
  },
  termsCheckbox: {
    marginRight: 12,
  },
  termsText: {
    flex: 1,
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