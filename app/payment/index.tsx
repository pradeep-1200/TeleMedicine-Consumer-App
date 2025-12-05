import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '@/constants/Color';
import { useAuth } from '@/contexts/AuthContext';

const quickAmounts = [100, 200, 500, 1000, 2000, 5000];

const paymentMethods = [
  { id: 'upi', name: 'UPI', icon: 'card-outline' },
  { id: 'card', name: 'Credit/Debit Card', icon: 'card' },
  { id: 'netbanking', name: 'Net Banking', icon: 'business-outline' },
  { id: 'wallet', name: 'Digital Wallet', icon: 'wallet-outline' },
];

export default function PaymentScreen() {
  const [amount, setAmount] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const { user, updateUser } = useAuth();
  const currentBalance = user?.walletBalance || 0;

  const selectAmount = (value: number) => {
    setAmount(value.toString());
  };

  const processPayment = () => {
    if (!amount || parseInt(amount) < 10) {
      Alert.alert('Invalid Amount', 'Please enter amount of ₹10 or more');
      return;
    }

    Alert.alert(
      'Payment Confirmation',
      `Add ₹${amount} to your wallet using ${paymentMethods.find(m => m.id === selectedMethod)?.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm',
          onPress: async () => {
            const newBalance = currentBalance + parseInt(amount);
            await updateUser({ walletBalance: newBalance });
            Alert.alert('Success', `₹${amount} added to your wallet successfully!`);
            router.back();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>
          <Text style={styles.title}>Add Money</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Current Balance */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Current Wallet Balance</Text>
          <Text style={styles.balanceAmount}>₹ {currentBalance.toLocaleString()}</Text>
        </View>

        {/* Amount Input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Enter Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              placeholder="0"
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>

        {/* Quick Amount Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Select</Text>
          <View style={styles.quickAmountGrid}>
            {quickAmounts.map((value) => (
              <TouchableOpacity
                key={value}
                style={[
                  styles.quickAmountButton,
                  amount === value.toString() && styles.selectedQuickAmount,
                ]}
                onPress={() => selectAmount(value)}
              >
                <Text
                  style={[
                    styles.quickAmountText,
                    amount === value.toString() && styles.selectedQuickAmountText,
                  ]}
                >
                  ₹{value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Payment Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentMethodButton,
                selectedMethod === method.id && styles.selectedPaymentMethod,
              ]}
              onPress={() => setSelectedMethod(method.id)}
            >
              <View style={styles.paymentMethodContent}>
                <Ionicons
                  name={method.icon as any}
                  size={24}
                  color={selectedMethod === method.id ? Colors.primary : Colors.darkGray}
                />
                <Text
                  style={[
                    styles.paymentMethodText,
                    selectedMethod === method.id && styles.selectedPaymentMethodText,
                  ]}
                >
                  {method.name}
                </Text>
              </View>
              <View
                style={[
                  styles.radioButton,
                  selectedMethod === method.id && styles.selectedRadioButton,
                ]}
              >
                {selectedMethod === method.id && (
                  <View style={styles.radioButtonInner} />
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Security Note */}
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={20} color={Colors.success} />
          <Text style={styles.securityText}>
            Your payment is secured with 256-bit SSL encryption
          </Text>
        </View>
      </ScrollView>

      {/* Add Money Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.addMoneyButton,
            (!amount || parseInt(amount) < 10) && styles.disabledButton,
          ]}
          onPress={processPayment}
          disabled={!amount || parseInt(amount) < 10}
        >
          <Text style={styles.addMoneyButtonText}>
            Add ₹{amount || '0'} to Wallet
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: Colors.white,
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  placeholder: {
    width: 32,
  },
  balanceCard: {
    backgroundColor: Colors.primary,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white,
    marginTop: 4,
  },
  section: {
    marginHorizontal: 16,
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: Colors.lightGray,
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    paddingVertical: 16,
  },
  quickAmountGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAmountButton: {
    width: '31%',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedQuickAmount: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  quickAmountText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  selectedQuickAmountText: {
    color: Colors.white,
  },
  paymentMethodButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.lightGray,
  },
  selectedPaymentMethod: {
    borderColor: Colors.primary,
    backgroundColor: '#F0F8FF',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethodText: {
    fontSize: 16,
    color: Colors.black,
    marginLeft: 12,
  },
  selectedPaymentMethodText: {
    color: Colors.primary,
    fontWeight: '600',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    borderColor: Colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 12,
    backgroundColor: Colors.white,
    borderRadius: 8,
  },
  securityText: {
    fontSize: 12,
    color: Colors.darkGray,
    marginLeft: 8,
    flex: 1,
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.lightGray,
  },
  addMoneyButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: Colors.mediumGray,
  },
  addMoneyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
  },
});