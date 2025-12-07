import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Color';

export default function CallSummaryScreen() {
  const params = useLocalSearchParams();
  const { duration = '05:56', amount = '369', reason = 'ended', balance = '150' } = params;

  const isLowBalance = reason === 'lowBalance';

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg' }}
          style={styles.doctorImage}
        />
        
        <Text style={styles.doctorName}>Dr. Prem</Text>

        <View style={[styles.statusBadge, isLowBalance && styles.statusBadgeError]}>
          <Ionicons 
            name={isLowBalance ? 'alert-circle' : 'checkmark-circle'} 
            size={24} 
            color={Colors.white} 
          />
          <Text style={styles.statusText}>
            {isLowBalance ? 'Call Disconnected' : 'Call Ended'}
          </Text>
        </View>

        {isLowBalance && (
          <Text style={styles.balanceAmount}>₹ {balance}</Text>
        )}

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Consultation Duration</Text>
            <Text style={styles.detailValue}>{duration}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total Amount Deducted</Text>
            <Text style={styles.detailValue}>₹ {amount}</Text>
          </View>
        </View>

        {isLowBalance ? (
          <>
            <View style={styles.lowBalanceWarning}>
              <Ionicons name="warning" size={20} color={Colors.danger} />
              <Text style={styles.warningText}>Low Balance</Text>
            </View>
            
            <Text style={styles.warningMessage}>
              Your call ended due to low balance. Add at least ₹25 to continue speaking with Dr. Prem.
            </Text>

            <TouchableOpacity 
              style={styles.rechargeButton}
              onPress={() => router.push('/payment')}
            >
              <Text style={styles.rechargeButtonText}>Recharge now</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.doneButton}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity 
          style={styles.callAgainButton}
          onPress={() => router.back()}
        >
          <Ionicons name="call" size={20} color={Colors.primary} />
          <Text style={styles.callAgainText}>Call Again</Text>
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  doctorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  doctorName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.success,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 12,
    gap: 8,
  },
  statusBadgeError: {
    backgroundColor: Colors.danger,
  },
  statusText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 20,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: Colors.lightGray,
    borderRadius: 12,
    padding: 20,
    marginVertical: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.mediumGray,
    marginVertical: 12,
  },
  lowBalanceWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.danger,
  },
  warningMessage: {
    fontSize: 14,
    color: Colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  rechargeButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 48,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
  },
  rechargeButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  doneButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 64,
    paddingVertical: 14,
    borderRadius: 25,
    marginBottom: 16,
  },
  doneButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  callAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
  },
  callAgainText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
});
