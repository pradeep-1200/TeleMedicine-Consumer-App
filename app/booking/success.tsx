import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import Colors from '@/constants/Color';

export default function PaymentSuccessScreen() {
  useEffect(() => {
    // Auto navigate after 5 seconds
    const timer = setTimeout(() => {
      router.push('/booking/my-bookings');
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Animation */}
        <View style={styles.animationContainer}>
          {/* You'll need to add a Lottie animation file or use an image */}
          <View style={styles.successIcon}>
            <Ionicons name="checkmark-circle" size={120} color={Colors.success} />
          </View>
        </View>

        {/* Success Message */}
        <Text style={styles.successTitle}>Paid ₹50</Text>
        <Text style={styles.successSubtitle}>Chat Consultation Booked Successfully</Text>

        {/* Available Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹ 660</Text>
        </View>

        {/* Appointment Details */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={20} color={Colors.primary} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Appointment Date</Text>
              <Text style={styles.detailValue}>23 November 2023</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="time" size={20} color={Colors.primary} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Appointment Time</Text>
              <Text style={styles.detailValue}>17:28 PM</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="person" size={20} color={Colors.primary} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Doctor</Text>
              <Text style={styles.detailValue}>Dr. Prem</Text>
            </View>
          </View>
          
          <View style={styles.detailRow}>
            <Ionicons name="medical" size={20} color={Colors.primary} />
            <View style={styles.detailInfo}>
              <Text style={styles.detailLabel}>Consultation Type</Text>
              <Text style={styles.detailValue}>Phone Consultation</Text>
            </View>
          </View>
        </View>

        {/* Important Notes */}
        <View style={styles.notesCard}>
          <Ionicons name="information-circle" size={24} color={Colors.info} />
          <View style={styles.notesContent}>
            <Text style={styles.notesTitle}>What's Next?</Text>
            <Text style={styles.notesText}>
              • You will receive a confirmation email{'\n'}
              • Join 5 minutes before your scheduled time{'\n'}
              • Keep your reports handy for the consultation
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => router.push('/booking/my-bookings')}>
          <Text style={styles.primaryButtonText}>Check Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => router.push('/(tabs)/home')}>
          <Text style={styles.secondaryButtonText}>Back to Home</Text>
        </TouchableOpacity>

        {/* Auto Redirect Notice */}
        <Text style={styles.redirectText}>
          Redirecting to bookings page in 5 seconds...
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  successIcon: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 18,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 30,
  },
  balanceCard: {
    backgroundColor: Colors.accent,
    paddingHorizontal: 30,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.primary,
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  detailsCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '100%',
    elevation: 2,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  detailInfo: {
    flex: 1,
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.darkGray,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  notesCard: {
    flexDirection: 'row',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  notesContent: {
    flex: 1,
    marginLeft: 16,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.info,
    marginBottom: 8,
  },
  notesText: {
    fontSize: 12,
    color: Colors.darkGray,
    lineHeight: 18,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: Colors.transparent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  redirectText: {
    fontSize: 12,
    color: Colors.darkGray,
    fontStyle: 'italic',
  },
});