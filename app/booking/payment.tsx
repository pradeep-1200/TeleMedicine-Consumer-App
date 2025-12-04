import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';
import { useAuth } from '@/contexts/AuthContext';

const paymentMethods = [
  {
    id: 'wallet',
    name: 'Wallet Balance',
    icon: 'wallet-outline',
    description: 'Pay using your wallet balance',
  },
  {
    id: 'upi',
    name: 'UPI',
    icon: 'phone-portrait',
    description: 'Google Pay, PhonePe, Paytm',
  },
  {
    id: 'card',
    name: 'Credit/Debit Card',
    icon: 'card-outline',
    description: 'Visa, MasterCard, Rupay',
  },
  {
    id: 'netbanking',
    name: 'Net Banking',
    icon: 'business-outline',
    description: 'All major banks',
  },
];

export default function PaymentScreen() {
  const { user, updateUser } = useAuth();
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [isProcessing, setIsProcessing] = useState(false);

  const consultationFee = 50; // Example fee
  const walletBalance = user?.walletBalance || 660;

  const handlePayment = () => {
    if (selectedMethod === 'wallet') {
      if (walletBalance >= consultationFee) {
        setIsProcessing(true);
        
        // Simulate payment processing
        setTimeout(() => {
          // Deduct from wallet
          updateUser({ walletBalance: walletBalance - consultationFee });
          setIsProcessing(false);
          router.push('/booking/success' as any);
        }, 2000);
      } else {
        Alert.alert('Insufficient Balance', 'Please add money or choose another payment method.');
      }
    } else {
      setIsProcessing(true);
      // For other payment methods, redirect to payment gateway
      setTimeout(() => {
        setIsProcessing(false);
        router.push('/booking/success' as any);
      }, 2000);
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
          <Text style={styles.headerTitle}>Make Payment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Appointment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Appointment Confirmed</Text>
          <Text style={styles.summaryText}>
            Thank you for choosing our Experts to help guide you
          </Text>

          <View style={styles.summaryDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Expert</Text>
              <Text style={styles.detailValue}>Dr. Prem</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Appointment Date</Text>
              <Text style={styles.detailValue}>23 November 2023</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Appointment Time</Text>
              <Text style={styles.detailValue}>17:28 PM</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Consultation Type</Text>
              <Text style={styles.detailValue}>Phone Consultation</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Current Wallet Balance</Text>
              <Text style={styles.detailValue}>₹ {walletBalance}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Consultation Fee</Text>
              <Text style={styles.detailValue}>₹ {consultationFee}</Text>
            </View>
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodCard,
                selectedMethod === method.id && styles.paymentMethodCardSelected,
              ]}
              onPress={() => setSelectedMethod(method.id)}>
              <View style={styles.paymentMethodIcon}>
                <Ionicons name={method.icon as any} size={24} color={Colors.primary} />
              </View>
              <View style={styles.paymentMethodInfo}>
                <Text style={styles.paymentMethodName}>{method.name}</Text>
                <Text style={styles.paymentMethodDesc}>{method.description}</Text>
              </View>
              <View style={styles.radioContainer}>
                {selectedMethod === method.id && (
                  <View style={styles.radioSelected} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Wallet Balance Warning */}
        {selectedMethod === 'wallet' && walletBalance < consultationFee && (
          <View style={styles.warningCard}>
            <Ionicons name="warning" size={24} color={Colors.warning} />
            <View style={styles.warningContent}>
              <Text style={styles.warningTitle}>Insufficient Balance</Text>
              <Text style={styles.warningText}>
                Add ₹ {consultationFee - walletBalance} to your wallet to continue
              </Text>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Add Money</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Payment Summary */}
        <View style={styles.paymentSummary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Consultation Fee</Text>
            <Text style={styles.summaryValue}>₹ {consultationFee}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Service Charges</Text>
            <Text style={styles.summaryValue}>₹ 0</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (18%)</Text>
            <Text style={styles.summaryValue}>₹ {Math.round(consultationFee * 0.18)}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹ {consultationFee + Math.round(consultationFee * 0.18)}
            </Text>
          </View>
        </View>

        {/* Secure Payment Info */}
        <View style={styles.secureCard}>
          <Ionicons name="shield-checkmark" size={24} color={Colors.success} />
          <View style={styles.secureContent}>
            <Text style={styles.secureTitle}>Secure Payment</Text>
            <Text style={styles.secureText}>
              Your payment is secured with 256-bit SSL encryption
            </Text>
          </View>
        </View>

        {/* Pay Button */}
        <TouchableOpacity
          style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
          onPress={handlePayment}
          disabled={isProcessing}>
          {isProcessing ? (
            <Text style={styles.payButtonText}>Processing...</Text>
          ) : (
            <Text style={styles.payButtonText}>
              Pay ₹ {consultationFee + Math.round(consultationFee * 0.18)}
            </Text>
          )}
        </TouchableOpacity>

        {/* Cancel Button */}
        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
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
  summaryCard: {
    backgroundColor: Colors.accent,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 20,
  },
  summaryDetails: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  detailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  paymentMethodCardSelected: {
    borderColor: Colors.primary,
    borderWidth: 2,
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 4,
  },
  paymentMethodDesc: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  radioContainer: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.lightGray,
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.warning,
  },
  warningContent: {
    flex: 1,
    marginHorizontal: 12,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.warning,
    marginBottom: 4,
  },
  warningText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  addButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '600',
  },
  paymentSummary: {
    backgroundColor: Colors.white,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  summaryValue: {
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
  secureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightGray,
    marginHorizontal: 20,
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
  },
  secureContent: {
    marginLeft: 12,
  },
  secureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.success,
    marginBottom: 4,
  },
  secureText: {
    fontSize: 12,
    color: Colors.darkGray,
  },
  payButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  payButtonDisabled: {
    backgroundColor: Colors.mediumGray,
  },
  payButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: Colors.transparent,
    marginHorizontal: 20,
    marginTop: 12,
    marginBottom: 32,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.mediumGray,
  },
  cancelButtonText: {
    color: Colors.darkGray,
    fontSize: 16,
    fontWeight: '600',
  },
});